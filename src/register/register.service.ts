import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
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
  assign(register: IRegister)
    : IRegister {
    return register;
  }

  async create(registerDTO: RegisterDTO): Promise<IRegister> {
    const currentDate = new Date();
    const checkInDate = new Date(currentDate.setHours(currentDate.getHours() - 4));
    
    const newRegister = new this.model({
      ...registerDTO,
      checkIn: checkInDate,
      checkOut: null,
    });
    
    return await newRegister.save();
  }

  async findAll(): Promise<IRegister[]> {
    return this.model.find().exec();
  }

  async findOne(id: string): Promise<IRegister> {
    const register = await this.model.findById(id).exec();
    if (!register) {
      throw new HttpException('Register Not Found', HttpStatus.NOT_FOUND);
    }
    return this.assign(register);
  }

  async update(id: string, registerDTO: RegisterDTO): Promise<IRegister> {
    const updatedRegister = await this.model.findByIdAndUpdate(id, registerDTO, { new: true }).exec();
    if (!updatedRegister) {
      throw new HttpException('Register Not Found', HttpStatus.NOT_FOUND);
    }
    return this.assign(updatedRegister);
  }

  async updatePartial(id: string, updateData: Partial<IRegister>): Promise<IRegister> {
    console.log('Actualizando registro con id:', id, 'y datos:', updateData);
    updateData.edited = true;
    return this.model.findByIdAndUpdate(id, updateData, { new: true }).exec();
  }

  async delete(id: string) {
    await this.model.findByIdAndDelete(id);
    return {
      status: HttpStatus.OK,
      msg: 'Deleted',
    };
  }

  async setCheckOut(id: string, checkOut: Date): Promise<IRegister> {
    const updatedRegister = await this.model.findByIdAndUpdate(
      id,
      checkOut
    ).exec();
    if (!updatedRegister) {
      throw new NotFoundException(`Register with ID ${id} not found`);
    }
    return updatedRegister;
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

  async findSchedule(start: Date, end: Date): Promise<IRegister[]> {
    try {
      console.log('Buscando horarios con start:', start, 'y end:', end);
      const schedules = await this.model.find({
        createdAt: { $gte: start, $lte: end },
      }).exec();
      return schedules;
    } catch (error) {
      // Manejar errores específicos
      if (error.name === 'CastError') {
        // Manejar error de conversión de tipos (por ejemplo, fecha no válida)
        throw new Error('Error de conversión de tipos');
      } else {
        // Otros errores no específicamente manejados
        throw new Error('Error al buscar horarios');
      }
    }
  }

  async findScheduleById(start: Date, end: Date, id: string): Promise<IRegister[]> {
    try {
      console.log('service Buscando horarios con start:', start, 'y end:', end,'del user:',id);
      const schedules = await this.model.find({
        createdAt: { $gte: start, $lte: end },
        userId: id
      }).exec();
      return schedules;
    } catch (error) {
      if (error.name === 'CastError') {
        throw new Error('Error de conversión de tipos');
      } else {
        throw new Error('Error al buscar horarios');
      }
    }
  }





  
}