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
            .exec();
        return dishes;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const getDishById = async (id: string) => {
    try {
        console.log('dishes by id')
        const cleanedId = id.trim();
        const dishes = await DishesModel.findById(cleanedId)
            .populate('description')
            .exec();
        return dishes;
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
