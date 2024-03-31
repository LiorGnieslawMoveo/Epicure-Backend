import mongoose, { Schema, Document, Model } from "mongoose";
import { IDish } from "./dishes.model";
import { IChef } from "./chefs.model";

export interface IRestaurant extends Document {
    title: string;
    image: string;
    deleted: boolean;
    chef: IChef;
    rating: Number;
    dishes: IDish[];
}

const RestaurantSchema = new mongoose.Schema({
    title: String,
    image: String,
    deleted: { type: Boolean, default: false },
    chef: { type: Schema.Types.ObjectId, ref: 'Chef' },
    rating: Number,
    dishes: [{ type: Schema.Types.ObjectId, ref: 'Dish' }]
});

export const RestaurantsModel = mongoose.model<IRestaurant>('Restaurant', RestaurantSchema);
