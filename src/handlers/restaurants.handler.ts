import { Error } from 'mongoose';
import { RestaurantsModel } from '../../db/models/restaurants.model';

export const addNewRestaurant = async (restaurantData: any) => {
    try {
        const newRestaurant = new RestaurantsModel({ ...restaurantData, });
        await newRestaurant.save();
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const getAllRestaurants = async () => {
    try {
        console.log('all')
        const restaurants = await RestaurantsModel.find()
            .populate('chef')
            .exec();
        return restaurants;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const getRestaurantById = async (id: string) => {
    try {
        console.log('by id')
        const cleanedId = id.trim();
        const restaurants = await RestaurantsModel.findById(cleanedId)
            .populate('chef')
            .exec();
        return restaurants;
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
