import mongoose, { Schema, Document, model } from "mongoose";
import { IRestaurant } from './restaurants.model';

export interface IDish extends Document {
    name: string;
    image: string;
    price: string;
    ingredients: string[];
    restaurant: IRestaurant;
}

const DishSchema = new Schema({
    name: String,
    image: String,
    price: String,
    ingredients: [String],
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' }
});

export const DishesModel = mongoose.model<IDish>('Dish', DishSchema);
