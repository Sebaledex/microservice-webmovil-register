import { Document } from 'mongoose';

export interface IRegister extends Document {
  _id?: string;
  name: string;
  city: string;
  checkIn: Date;
  checkOut: Date;
  userId: string; 
  coordinates: {
    latitude: number;
    longitude: number;
  };
  coordinatesOut:{
    latitude: number;
    longitude: number;
  };
  edited:boolean;
  editedBy:string;
  workedHours: number;
}