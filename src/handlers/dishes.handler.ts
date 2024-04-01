import { Error } from 'mongoose';
import { DishesModel } from '../../db/models/dishes.model';

export const addNewDish = async (dishData: any) => {
    try {
        const newDish = new DishesModel({ ...dishData, });
        await newDish.save();
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const getAllDishes = async () => {
    try {
        console.log('all dishes')
        const dishes = await DishesModel.find()
            .populate('description')
            .populate('restaurant')
            .exec();
        return dishes.filter(dish => !dish.deleted);
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const getDishById = async (id: string) => {
    try {
        console.log('dishes by id')
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
        console.log('deleting dish')
        const cleanedId = id.trim();
        await DishesModel.findByIdAndUpdate(
            cleanedId,
            { deleted: true }
        )
    } catch (error: any) {
        throw new Error(error.message);
    }
};
