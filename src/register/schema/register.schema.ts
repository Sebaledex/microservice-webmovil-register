import * as mongoose from 'mongoose';
import { boolean } from 'yup';

export const RegisterSchema = new mongoose.Schema(
  {
    name: { type: String, required: false },
    city: { type: String, required: false },
    checkIn: { type: Date, required: true },
    checkOut: { type: Date, required: false },
    userId: { type: String, required: true },
    coordinates: {
      latitude: { type: Number, default: 0 },
      longitude: { type: Number, default: 0 },
    },
    coordinatesOut: {
      latitude: { type: Number, default: 0 },
      longitude: { type: Number, default: 0 },
    },
    edited: { type: Boolean, default: false },
    editedBy: { type: String, default: ''},
    workedHours: { type: Number, default: 0},

  },
  { timestamps: true },
);
