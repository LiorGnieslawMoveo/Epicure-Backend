import mongoose, { Schema, Document, model } from "mongoose";
import { IRestaurant } from './restaurants.model';
import { IconMeaning } from "../../src/shared/enums";

export interface IDish extends Document {
    title: string;
    image: string;
    price: string;
    deleted: boolean;
    iconMeaning: IconMeaning,
    description: string[];
    restaurant: IRestaurant;
}

const DishSchema = new Schema({
    title: String,
    image: String,
    price: String,
    deleted: { type: Boolean, default: false },
    iconMeaning: { type: String, enum: Object.values(IconMeaning) },
    description: [String],
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' }
});

export const DishesModel = mongoose.model<IDish>('Dish', DishSchema);
