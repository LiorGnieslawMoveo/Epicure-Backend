import mongoose, { Schema, Document, Model } from "mongoose";

interface Dish extends Document {
    name: string;
    image: string,
    price: string,
    Ingredients: string[],
    restaurant: Schema.Types.ObjectId
}

const DishSchema = new mongoose.Schema({
    name: String,
    image: String,
    price: String,
    Ingredients: [String],
    restaurant: Schema.Types.ObjectId
});

const DishesModel: Model<Dish> = mongoose.model<Dish>('Dish', DishSchema);
