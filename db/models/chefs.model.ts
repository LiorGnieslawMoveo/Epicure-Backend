import mongoose, { Schema, Document, Model } from "mongoose";

interface Chef extends Document {
    name: string;
    image: string,
    description: string,
    chefOfTheWeek: Boolean,
    restaurants: Schema.Types.ObjectId[]
}

const ChefSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    chefOfTheWeek: Boolean,
    restaurants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' }]

});

export const ChefsModel: Model<Chef> = mongoose.model<Chef>('Chef', ChefSchema);
