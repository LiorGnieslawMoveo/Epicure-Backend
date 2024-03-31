import mongoose, { Schema, Document, model } from "mongoose";
import { IRestaurant } from './restaurants.model';
import { IconMeaning } from "../../src/shared/enums";

export interface IDish extends Document {
    name: string;
    image: string;
    price: string;
    deleted: boolean;
    iconMeaning: IconMeaning,
    ingredients: string[];
    restaurant: IRestaurant;
}

const DishSchema = new Schema({
    name: String,
    image: String,
    price: String,
    deleted: { type: Boolean, default: false },
    iconMeaning: { type: String, enum: Object.values(IconMeaning) },
    ingredients: [String],
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' }
});

export const DishesModel = mongoose.model<IDish>('Dish', DishSchema);
