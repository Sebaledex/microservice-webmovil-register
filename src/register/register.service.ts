import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { IRegister } from 'src/common/interfaces/register.interface';
import { REGISTER } from 'src/common/models/models';
import { RegisterDTO } from './dto/register.dto';


@Injectable()@Injectable()
export class RegisterService {
  constructor(
    @InjectModel(REGISTER.name)
    private readonly model: Model<IRegister>,
  ) {}

  assign(
    { _id, name, city, users }: IRegister,
  ): IRegister {
    return Object.assign({
      _id,
      name,
      city,
      users,
    });
  }

  async create(registerDTO: RegisterDTO): Promise<IRegister> {
    const newRegister = new this.model(registerDTO);
    return await newRegister.save();
  }

  //  async findAll(): Promise<IRegister[]> {
  //    return await this.model.find().populate('users'); // Asegúrate de que el segundo parámetro de populate incluya los campos deseados
  //  }

  async findAll(): Promise<IRegister[]> {
    return this.model.find().populate('users').exec();
  }

  async findOne(id: string): Promise<IRegister> {
    const register = await this.model.findById(id).populate('users');
    return this.assign(register);
  }

  async update(id: string, registerDTO: RegisterDTO): Promise<IRegister> {
    return await this.model.findByIdAndUpdate(id, registerDTO, { new: true });
  }

  async delete(id: string) {
    await this.model.findByIdAndDelete(id);
    return {
      status: HttpStatus.OK,
      msg: 'Deleted',
    };
  }

  async addUser(registerId: string, userId: string): Promise<IRegister> {
    console.log(`Adding user ${userId} to register ${registerId}`);
    const register = await this.model.findById(registerId);
    if (!register) {
      console.error('Register not found');
      throw new HttpException('Register Not Found', HttpStatus.NOT_FOUND);
    }

    console.log('Register found:', register);

    try {
      const updatedRegister = await this.model.findByIdAndUpdate(
        registerId,
        { $addToSet: { users: userId } }, // Asegúrate de usar $addToSet para evitar duplicados
        { new: true }
      ).populate('users');

      console.log('Updated register:', updatedRegister);

      return updatedRegister;
    } catch (error) {
      console.error('Error updating register:', error);
      throw new HttpException('Error Updating Register', HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }





  
}