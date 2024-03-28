import mongoose, { Schema, Document, Model } from "mongoose";
import { IDish } from "./dishes.model";
import { IChef } from "./chefs.model";

export interface IRestaurant extends Document {
    name: string;
    image: string;
    deleted: boolean;
    chef: IChef;
    dishes: IDish[];
}

const RestaurantSchema = new mongoose.Schema({
    name: String,
    image: String,
    deleted: { type: Boolean, default: false },
    chef: { type: Schema.Types.ObjectId, ref: 'Chef' },
    dishes: [{ type: Schema.Types.ObjectId, ref: 'Dish' }]
});

export const RestaurantsModel = mongoose.model<IRestaurant>('Restaurant', RestaurantSchema);
