import { Schema, model } from 'mongoose';
import { Motorcycle } from '../interfaces/MotorcycleInterface';

const motorcycleSchema = new Schema<Motorcycle>({
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
  engineCapacity: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
}, { versionKey: false });
  
export default model<Motorcycle>('Motorcycle', motorcycleSchema);
