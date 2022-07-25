import { Router } from 'express';
import * as CarController from './controllers/CarController';
import * as MotorcycleController from './controllers/MotorcycleController';

const CAR_ID = '/cars/:id';
const MOTORCYCLES_ID = '/motorcycles/:id';

const router = Router();

router.post('/cars', CarController.createCar);
router.get('/cars', CarController.findCar);
router.get(CAR_ID, CarController.findByIdCar);
router.put(CAR_ID, CarController.updateCar);
router.delete(CAR_ID, CarController.deleteCar);

router.post('/motorcycles', MotorcycleController.createMotorcycle);
router.get('/motorcycles', MotorcycleController.findMotorcycle);
router.get(MOTORCYCLES_ID, MotorcycleController.findIdMotorcycle);
router.put(MOTORCYCLES_ID, MotorcycleController.updateMotorcycle);
router.delete(MOTORCYCLES_ID, MotorcycleController.deleteMotorcycle);

export default router;
