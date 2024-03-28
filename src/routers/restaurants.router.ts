import express from 'express';
import * as restaurantController from '../controllers/restaurants.contorller';

const router = express.Router();

router.post('/restaurants', restaurantController.addNewRestaurant);
router.get('/restaurants', restaurantController.getAllRestaurants);
router.get('/restaurants/:id', restaurantController.getRestaurantById);
router.put('/restaurants/:id', restaurantController.updateRestaurantById);
router.delete('/restaurants/:id', restaurantController.deleteRestaurantById);

export { router as restaurantRouter };
