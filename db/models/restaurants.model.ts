import mongoose, { Schema, Document, Model } from "mongoose";

interface Restaurant extends Document {
    name: string,
    image: string,
    chef: Schema.Types.ObjectId,
    dishes: Schema.Types.ObjectId[]
}

const RestaurantSchema = new mongoose.Schema({
    name: String,
    image: String,
    chef: { type: mongoose.Schema.Types.ObjectId, ref: 'Chef' },
    dishes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Dish' }]
});

const RestaurantsModel: Model<Restaurant> = mongoose.model<Restaurant>('Restaurant', RestaurantSchema);
