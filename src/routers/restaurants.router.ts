import express from 'express';
import * as restaurantController from '../controllers/restaurants.controller';

const router = express.Router();

router.get('/', restaurantController.getAllRestaurants);
router.post('/', restaurantController.addNewRestaurant);
router.get('/:id', restaurantController.getRestaurantById);
router.put('/:id', restaurantController.updateRestaurantById);
router.delete('/:id', restaurantController.deleteRestaurantById);

export { router as restaurantRouter };
