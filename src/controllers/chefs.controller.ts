import { Request, Response } from 'express';
import * as chefHandler from '../handlers/chefs.handlers';

export const addNewChef = async (req: Request, res: Response) => {
    try {
        const newChef = await chefHandler.addNewChef(req.body);
        res.status(201).json(newChef);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllChefs = async (req: Request, res: Response) => {
    try {
        let chefs = await chefHandler.getAllChefs();
        res.json(chefs);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getChefById = async (req: Request, res: Response) => {
    try {
        let chef = await chefHandler.getChefById(req.params.id);
        if (!chef) {
            return res.status(404).json({ message: 'Chef not found' });
        }
        res.json(chef);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const updateChefById = async (req: Request, res: Response) => {
    try {
        const updatedChef = await chefHandler.updateChefById(req.body, req.params.id);
        res.json(updatedChef);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteChefById = async (req: Request, res: Response) => {
    try {
        await chefHandler.deleteChefById(req.params.id);
        res.json({ message: 'Chef deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export const getChefOfTheWeek = async (req: Request, res: Response) => {
    try {
        const chefOfTheWeek = await chefHandler.getChefOfTheWeek();
        res.json(chefOfTheWeek);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};