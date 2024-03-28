import { Error } from 'mongoose';
import { DishesModel } from '../../db/models/dishes.model';
import { RestaurantsModel } from '../../db/models/restaurants.model';

export const addNewRestaurant = async (restaurantData: any) => {
    try {
        const newRestaurant = new RestaurantsModel({ ...restaurantData, });
        await newRestaurant.save();
        return await RestaurantsModel.create(restaurantData);
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const getAllRestaurants = async () => {
    try {
        const restaurants = await RestaurantsModel.find({})
            .populate('chef')
            .populate('dishes')
            .exec();
        return restaurants;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const getRestaurantById = async (id: string) => {
    try {
        const restaurants = await RestaurantsModel.findById({})
            .populate('chef')
            .populate('dishes')
            .exec();
        return restaurants;
    } catch (error: any) {
        throw new Error(error.message);
    }
};


export const updateRestaurantById = async (restaurantData: any, id: string) => {
    try {
        await RestaurantsModel.findByIdAndUpdate(
            { _id: id },
            restaurantData,
            { new: true }
        )
            .populate('chef')
            .populate('dishes')
            .exec();
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const deleteRestaurantById = async (id: string) => {
    try {
        await RestaurantsModel.findByIdAndUpdate(
            { _id: id },
            { $set: { deleted: true } }
        )
    } catch (error: any) {
        throw new Error(error.message);
    }
};
