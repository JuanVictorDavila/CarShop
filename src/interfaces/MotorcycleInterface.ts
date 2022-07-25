import { z } from 'zod';
import { Vehicle } from './VehicleInterface';

export const motorcycleSchema = z.object({
  category: z.enum(['Street', 'Custom', 'Trail']),
  engineCapacity: z.number().min(1).max(2500),
});

export type Motorcycle = z.infer<typeof motorcycleSchema> & Vehicle;