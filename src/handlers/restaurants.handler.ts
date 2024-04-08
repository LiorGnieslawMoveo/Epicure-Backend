import { Error } from 'mongoose';
import { RestaurantsModel } from '../../db/models/restaurants.model';
import { ChefsModel } from '../../db/models/chefs.model';

export const addNewRestaurant = async (restaurantData: any) => {
    try {
        const newRestaurant = new RestaurantsModel({ ...restaurantData, });
        const savedRestaurant = await newRestaurant.save();
        await ChefsModel.findByIdAndUpdate(savedRestaurant.chef, { $push: { restaurants: savedRestaurant._id } }, { new: true, useFindAndModify: false });
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const getAllRestaurants = async () => {
    try {
        console.log('all')
        const restaurants = await RestaurantsModel.find()
            .populate('chef')
            .populate('dishes')
            .exec();
        return restaurants.filter(restaurant => !restaurant.deleted);;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const getRestaurantById = async (id: string) => {
    try {
        console.log('by id')
        const cleanedId = id.trim();
        const restaurant = await RestaurantsModel.findById(cleanedId)
            .populate('chef')
            .exec();
        if (!restaurant) {
            return null;
        }
        if (restaurant.deleted) {
            return null;
        }
        return restaurant;
    } catch (error: any) {
        throw new Error(error.message);
    }
};


export const updateRestaurantById = async (restaurantData: any, id: string) => {
    try {
        const cleanedId = id.trim();
        await RestaurantsModel.findByIdAndUpdate(
            cleanedId,
            restaurantData,
            { new: true }
        )
            .populate('chef')
            .exec();
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const deleteRestaurantById = async (id: string) => {
    try {
        console.log('deleting')
        const cleanedId = id.trim();
        await RestaurantsModel.findByIdAndUpdate(
            cleanedId,
            { deleted: true }
        )
    } catch (error: any) {
        throw new Error(error.message);
    }
};
