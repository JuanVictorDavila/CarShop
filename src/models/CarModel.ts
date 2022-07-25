import { Schema, model } from 'mongoose';
import { Car } from '../interfaces/CarInterface';

const carSchema = new Schema<Car>({
  doorsQty: {
    type: Number,
    required: true,
  },
  seatsQty: {
    type: Number,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: false,
  },
  buyValue: {
    type: Number,
    required: true,
  },
}, { versionKey: false });

export default model<Car>('Car', carSchema);
