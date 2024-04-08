import { Error } from 'mongoose';
import { DishesModel } from '../../db/models/dishes.model';
import { RestaurantsModel } from '../../db/models/restaurants.model';

export const addNewDish = async (dishData: any) => {
    try {
        const newDish = new DishesModel({ ...dishData, });
        const savedDish = await newDish.save();
        await RestaurantsModel.findByIdAndUpdate(savedDish.restaurant, { $push: { dishes: savedDish._id } }, { new: true, useFindAndModify: false });
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const getAllDishes = async () => {
    try {
        const dishes = await DishesModel.find()
            .populate('description')
            .populate('restaurant')
            .exec();
        return dishes.filter(dish => !dish.deleted);
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const getAllDishesAdmin = async () => {
    try {
        const dishes = await DishesModel.find()
            .populate('description')
            .populate('restaurant')
            .exec();
        return dishes;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const getDishById = async (id: string) => {
    try {
        const cleanedId = id.trim();
        const dish = await DishesModel.findById(cleanedId)
            .populate('description')
            .exec();
        if (!dish) {
            return null;
        }
        if (dish.deleted) {
            return null;
        }
        return dish;
    } catch (error: any) {
        throw new Error(error.message);
    }
};


export const updateDishById = async (dishData: any, id: string) => {
    try {
        const cleanedId = id.trim();
        await DishesModel.findByIdAndUpdate(
            cleanedId,
            dishData,
            { new: true }
        )
            .populate('description')
            .exec();
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const deleteDishById = async (id: string) => {
    try {
        const cleanedId = id.trim();
        await DishesModel.findByIdAndUpdate(
            cleanedId,
            { deleted: true }
        )
    } catch (error: any) {
        throw new Error(error.message);
    }
};
