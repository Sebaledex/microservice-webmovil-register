import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IRegister } from './common/interfaces/register.interface';
import { REGISTER } from './common/models/models';

@Injectable()
export class CronService {
  private readonly logger = new Logger(CronService.name);

  constructor(
    @InjectModel(REGISTER.name)
    private readonly model: Model<IRegister>,
  ) {}

  //@Cron('0 23 * * *') // Ejecutar cada a las 23:00 horas 
  // @Cron('0 0 * * *') // Ejecutar cada 24 horas
  @Cron('*/30 * * * *')  // Ejecutar cada minuto 30  //ocupar para probar
  async handleCron() {
    console.log('Cron job running to update RegisterSchema records');

    try {
      const registerSchemas = await this.model.find().exec();
      
      for (const registerSchema of registerSchemas) {
        try {
          const existingRecord = await this.model.findById(registerSchema._id).exec();
          if (existingRecord) {
            const hoursWorked = this.calculateHoursWorked(registerSchema.checkIn, registerSchema.checkOut);
            registerSchema.workedHours = hoursWorked;
            await registerSchema.save();
            console.log(`Updated worked hours for register with ID ${registerSchema._id} with ${hoursWorked} hours.`);
          } else {
            console.warn(`Document with ID ${registerSchema._id} no longer exists, skipping update.`);
          }
        } catch (error) {
          console.error(`Error updating register with ID ${registerSchema._id}: ${error.message}`);
        }
      }
      console.log('RegisterSchema records updated');
    } catch (error) {
      console.error(`Error fetching register records: ${error.message}`);
    }
  }

  private calculateHoursWorked(checkInTime: Date, checkOutTime: Date): number {
    const diff = checkOutTime.getTime() - checkInTime.getTime();
    return diff / (1000 * 60 * 60); // Convertir de milisegundos a horas
  }
}