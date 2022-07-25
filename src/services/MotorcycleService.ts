import MotorcycleModel from '../models/MotorcycleModel';
import {
  Motorcycle,
  motorcycleSchema,
} from '../interfaces/MotorcycleInterface';

const NOT_FOUND = 'Object not found';

export const createMotorcycle = (motorcycle: Motorcycle) => {
  motorcycleSchema.parse(motorcycle);
  return MotorcycleModel.create(motorcycle);
};

export const findMotorcycle = () => MotorcycleModel.find();

export const findByIdMotorcycle = async (id: string) => {
  const motorcycle = await MotorcycleModel.findById(id);
  if (!motorcycle) throw new Error(NOT_FOUND);
  return motorcycle;
};
  
export const updateMotorcycle = async (id:string, motorcycle:Motorcycle) => {
  const motorcycleUp = await MotorcycleModel.findByIdAndUpdate(id, motorcycle);
  if (!motorcycleUp) throw new Error(NOT_FOUND);
  return motorcycleUp;
};

export const deleteMotorcycle = async (id: string) => {
  const motorcycle = await MotorcycleModel.findByIdAndDelete(id);
  if (!motorcycle) throw new Error(NOT_FOUND);
  return motorcycle.remove();
};
