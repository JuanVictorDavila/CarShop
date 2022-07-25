import { Request, Response } from 'express';
import { carSchema } from '../interfaces/CarInterface';
import * as CarService from '../services/CarService';

const HEXADECIMAL_ERROR = 'Id must have 24 hexadecimal characters';

export const createCar = async (req:Request, res:Response) => {
  try {
    const car = req.body;
    const carCreated = await CarService.createCar(car);
    return res.status(201).json(carCreated);
  } catch (e) {
    res.status(400).json({ message: (e as Error).message });
  }
};

export const findCar = async (_req:Request, res:Response) => {
  try {
    const cars = await CarService.findCar();
    
    return res.status(200).json(cars);
  } catch (e) {
    res.status(400).json({ message: (e as Error).message });
  }
};

export const findByIdCar = async (req:Request, res:Response) => {
  const { id } = req.params;
  if (id.length !== 24) {
    return res.status(400)
      .json({ error: HEXADECIMAL_ERROR });
  }
  try {
    const car = await CarService.findByIdCar(id);
    return res.status(200).json(car);
  } catch (e) {
    return res.status(404).json({ error: (e as Error).message });
  }
};

export const updateCar = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  if (id.length !== 24) {
    return res.status(400)
      .json({ error: HEXADECIMAL_ERROR });
  }  
  try {
    carSchema.parse(body);
  } catch (e) {
    return res.status(400).json({ error: (e as Error).message });
  }
  try {
    const carUpdated = await CarService.updateCar(id, body);
    return res.status(200).json(carUpdated);
  } catch (e) {
    return res.status(404).json({ error: (e as Error).message,
    });
  }
};

export const deleteCar = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (id.length !== 24) {
    return res.status(400)
      .json({ error: HEXADECIMAL_ERROR });
  }  
  try {
    const car = await CarService.deleteCar(id);
    await car.remove();
    return res.status(204).json({ message: 'Car deleted' });
  } catch (error) {
    return res.status(404).json({ error: (error as Error).message,
    });
  }
};
