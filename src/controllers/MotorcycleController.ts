import { Request, Response } from 'express';
import { motorcycleSchema } from '../interfaces/MotorcycleInterface';
import * as MotorcycleService from '../services/MotorcycleService';

const HEXADECIMAL_ERROR = 'Id must have 24 hexadecimal characters';

export const createMotorcycle = async (req:Request, res:Response) => {
  try {
    const motorcycle = req.body;
    const motorcycleCreated = (
      await MotorcycleService.createMotorcycle(motorcycle)
    );
    return res.status(201).json(motorcycleCreated);
  } catch (e) {
    res.status(400).json({ message: (e as Error).message });
  }
};

export const findMotorcycle = async (req:Request, res:Response) => {
  try {
    const motorcycle = await MotorcycleService.findMotorcycle();
      
    return res.status(200).json(motorcycle);
  } catch (e) {
    res.status(400).json({ message: (e as Error).message });
  }
};

export const findIdMotorcycle = async (req:Request, res:Response) => {
  const { id } = req.params;
  if (id.length !== 24) {
    return res.status(400)
      .json({ error: HEXADECIMAL_ERROR });
  }
  try {
    const motorcycle = await MotorcycleService.findByIdMotorcycle(id);
    return res.status(200).json(motorcycle);
  } catch (e) {
    return res.status(404).json({ error: (e as Error).message });
  }
};
  
export const updateMotorcycle = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  if (id.length !== 24) {
    return res.status(400)
      .json({ error: HEXADECIMAL_ERROR });
  }
  try {
    motorcycleSchema.parse(body);
  } catch (e) {
    return res.status(400).json({ error: (e as Error).message });
  }
  try {
    const motorcycleUpdated = (
      await MotorcycleService.updateMotorcycle(id, body));
    return res.status(200).json(motorcycleUpdated);
  } catch (e) {
    return res.status(404).json({ error: (e as Error).message });
  }
};
  
export const deleteMotorcycle = async (req: Request, res: Response) => {
  const { id } = req.params;
  if (id.length !== 24) {
    return res.status(400)
      .json({ error: HEXADECIMAL_ERROR });
  }  
  try {
    const motorcycle = await MotorcycleService.deleteMotorcycle(id);
    await motorcycle.remove();
    return res.status(204).json({ message: 'Motorcycle deleted' });
  } catch (e) {
    return res.status(404).json({ error: (e as Error).message,
    });
  }
};
