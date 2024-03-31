import { Request, Response } from 'express';
import * as dishHandler from '../handlers/dishes.handler';

export const addNewDish = async (req: Request, res: Response) => {
    try {
        const newDish = await dishHandler.addNewDish(req.body);
        res.status(201).json(newDish);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllDishes = async (req: Request, res: Response) => {
    try {
        const dishes = await dishHandler.getAllDishes();
        res.json(dishes);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getDishById = async (req: Request, res: Response) => {
    try {
        const dish = await dishHandler.getDishById(req.params.id);
        if (!dish) {
            return res.status(404).json({ message: 'Dish not found' });
        }
        res.json(dish);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateDishById = async (req: Request, res: Response) => {
    try {
        const updatedDish = await dishHandler.updateDishById(req.body, req.params.id);
        res.json(updatedDish);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteDishById = async (req: Request, res: Response) => {
    try {
        await dishHandler.deleteDishById(req.params.id);
        res.json({ message: 'Dish deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
