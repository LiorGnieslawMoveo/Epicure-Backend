import mongoose, { Schema, Document, Model } from "mongoose";
import { IRestaurant } from "./restaurants.model";

export interface IChef extends Document {
    name: string;
    image: string,
    description: string,
    deleted: boolean;
    chefOfTheWeek: Boolean,
    restaurants: IRestaurant[]
}

const ChefSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    deleted: { type: Boolean, default: false },
    chefOfTheWeek: Boolean,
    restaurants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' }]

});

export const ChefsModel = mongoose.model<IChef>('Chef', ChefSchema);
