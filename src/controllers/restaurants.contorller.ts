import { Request, Response } from 'express';
import * as restaurantHandler from '../handlers/restaurants.handler';

export const addNewRestaurant = async (req: Request, res: Response) => {
    try {
        const newRestaurant = await restaurantHandler.addNewRestaurant(req.body);
        res.status(201).json(newRestaurant);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllRestaurants = async (req: Request, res: Response) => {
    try {
        const restaurants = await restaurantHandler.getAllRestaurants();
        res.json(restaurants);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getRestaurantById = async (req: Request, res: Response) => {
    try {
        const restaurant = await restaurantHandler.getRestaurantById(req.params.id);
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }
        res.json(restaurant);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateRestaurantById = async (req: Request, res: Response) => {
    try {
        const updatedRestaurant = await restaurantHandler.updateRestaurantById(req.body, req.params.id);
        res.json(updatedRestaurant);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteRestaurantById = async (req: Request, res: Response) => {
    try {
        await restaurantHandler.deleteRestaurantById(req.params.id);
        res.json({ message: 'Restaurant deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};
