import { Error } from 'mongoose';
import { ChefsModel } from '../../db/models/chefs.model';

export const addNewChef = async (chefData: any) => {
    try {
        const newChef = new ChefsModel({ ...chefData, });
        await newChef.save();
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const getAllChefs = async () => {
    try {
        const chefs = await ChefsModel.find()
            .populate('restaurants')
            .exec();
        return chefs.filter(chef => !chef.deleted);
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const getAllChefsAdmin = async () => {
    try {
        const chefs = await ChefsModel.find()
            .populate('restaurants')
            .exec();
        return chefs;
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const getChefById = async (id: string) => {
    try {
        const cleanedId = id.trim();
        const chef = await ChefsModel.findById(cleanedId)
            .populate('restaurants')
            .exec();

        if (!chef) {
            return null;
        }
        if (chef.deleted) {
            return null;
        }
        return chef;
    } catch (error: any) {
        throw new Error(error.message);
    }
};


export const updateChefById = async (chefData: any, id: string) => {
    try {
        const cleanedId = id.trim();
        await ChefsModel.findByIdAndUpdate(
            cleanedId,
            chefData,
            { new: true }
        )
            .populate('restaurants')
            .exec();
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const deleteChefById = async (id: string) => {
    try {
        const cleanedId = id.trim();
        await ChefsModel.findByIdAndUpdate(
            cleanedId,
            { deleted: true }
        )
    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const getChefOfTheWeek = async () => {
    try {
        const chefOfTheWeek = await ChefsModel.findOne({ chefOfTheWeek: true }).populate('restaurants').exec();
        return chefOfTheWeek;
    } catch (error: any) {
        throw new Error(error.message);
    }
};
