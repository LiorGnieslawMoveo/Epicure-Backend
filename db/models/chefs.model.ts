import mongoose, { Schema, Document, Model } from "mongoose";

interface Chef extends Document {
    name: string;
    image: string,
    description: string,
    restaurants: Schema.Types.ObjectId[]
}

const ChefSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    restaurants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' }]
});

const ChefsModel: Model<Chef> = mongoose.model<Chef>('Chef', ChefSchema);
