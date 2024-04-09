import express from 'express';
import * as dishController from '../controllers/dishes.controller';

const router = express.Router();

router.get('/', dishController.getAllDishes);
router.get('/admin', dishController.getAllDishesAdmin);
router.post('/', dishController.addNewDish);
router.get('/:id', dishController.getDishById);
router.put('/:id', dishController.updateDishById);
router.delete('/:id', dishController.deleteDishById);

export { router as dishRouter };