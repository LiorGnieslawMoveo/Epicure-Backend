import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from "mongoose";

dotenv.config();
const mongoURI: string = process.env.MONGODB_URI || "";

export const initDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("MongoDB connected");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
};