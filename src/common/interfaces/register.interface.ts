import { IUser } from "./user.interface";

export interface IRegister extends Document {
  _id?: string;
  name: string;
  city: string;
  //registerDate: Date;
  users: IUser[];
  //users?: string; // ID del usuario
}