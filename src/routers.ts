import { Router } from 'express';
import * as CarController from './controllers/CarController';

const router = Router();

router.post('/cars', CarController.createCar);
router.get('/cars', CarController.findCar);
router.get('/cars/:id', CarController.findByIdCar);
router.put('/cars/:id', CarController.updateCar);
router.delete('/cars/:id', CarController.deleteCar);

export default router;
