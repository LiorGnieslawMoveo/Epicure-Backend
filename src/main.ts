import { initDB } from '../db/epicureDB/initDB'
import express, { Express, Request, Response, Application } from 'express';
import dotenv from 'dotenv';
import mongoose, { Schema, Document, Model } from "mongoose";
import cors from "cors";
import bodyParser from 'body-parser';
import { restaurantRouter } from './routers/restaurants.router';
import { chefRouter } from './routers/chefs.routers';
import { dishRouter } from './routers/dishes.router';
import { loadData } from '../db/epicureDB/loadData';


const PORT = process.env.PORT || 4000;
const app: Express = express();
app.use(bodyParser.json());

app.use('/api/restaurants', restaurantRouter);
app.use('/api/chefs', chefRouter);
app.use('/api/dishes', dishRouter);


app.get("/", (req: Request, res: Response) => {
    res.send("Express + TypeScript Server");
});

startServer();

async function startServer() {
    await initDB();
    // await loadData();
    app.listen(PORT, () => console.log(`Server is up at ${PORT}`));
}