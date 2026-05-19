import {z} from 'zod';

const citySchema = z
    .string()
    .min(1, "City is required")
    .trim();


export const currentWeatherSchema = {
    city: citySchema,
}