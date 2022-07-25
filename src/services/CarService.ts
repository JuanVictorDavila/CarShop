import CarModel from '../models/CarModel';
import { Car, carSchema } from '../interfaces/CarInterface';

const NOT_FOUND = 'Object not found';

export const createCar = (car: Car) => {
  carSchema.parse(car);
  return CarModel.create(car);
};

export const findCar = () => CarModel.find();

export const findByIdCar = async (id: string) => {
  const car = await CarModel.findById(id);
  if (!car) throw new Error(NOT_FOUND);
  return car;
};

export const updateCar = async (id: string, car: Car) => {
  const carUpdate = await CarModel.findByIdAndUpdate(id, car);
  if (!carUpdate) throw new Error(NOT_FOUND);
  return carUpdate;
};

export const deleteCar = async (id: string) => {
  const car = await CarModel.findByIdAndDelete(id);
  if (!car) throw new Error(NOT_FOUND);
  return car;
};
