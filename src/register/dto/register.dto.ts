import { IUser } from "src/common/interfaces/user.interface";

export class RegisterDTO {
  readonly name: string;
  readonly city: string;
  readonly checkIn: Date;
  readonly checkOut: Date;
  readonly userId: string;
  readonly coordinates: {
    latitude: Number;
    longitude: Number;
  };
  readonly coordinatesOut: {
    latitude: Number;
    longitude: Number;
  };
  readonly edited:boolean;
  readonly editedBy: string;
}
  