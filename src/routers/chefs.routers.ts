import express from 'express';
import * as chefController from '../controllers/chefs.controller';

const router = express.Router();

router.get('/', chefController.getAllChefs);
router.post('/', chefController.addNewChef);
router.get('/chef-of-the-week', chefController.getChefOfTheWeek);
router.get('/:id', chefController.getChefById);
router.put('/:id', chefController.updateChefById);
router.delete('/:id', chefController.deleteChefById);

export { router as chefRouter };