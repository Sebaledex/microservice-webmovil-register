import { Controller, HttpStatus } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { RegisterDTO } from "./dto/register.dto";
import { RegisterMSG } from "src/common/constants";
import { RegisterService } from "./register.service";
import { IRegister } from "src/common/interfaces/register.interface";

@Controller()
export class RegisterController {
  constructor(private readonly registerService: RegisterService) {}

  @MessagePattern(RegisterMSG.CREATE)
  create(@Payload() registerDTO: RegisterDTO) {
    return this.registerService.create(registerDTO);
  }

  @MessagePattern(RegisterMSG.FIND_ALL)
  findAll() {
    return this.registerService.findAll();
  }

  @MessagePattern(RegisterMSG.FIND_ONE)
  findOne(@Payload() id: string) {
    return this.registerService.findOne(id);
  }

  @MessagePattern(RegisterMSG.UPDATE)
  update(@Payload() payload) {
    return this.registerService.update(payload.id, payload.registerDTO);
  }

  @MessagePattern(RegisterMSG.DELETE)
  delete(@Payload() id: string) {
    return this.registerService.delete(id);
  }

  @MessagePattern(RegisterMSG.ADD_USER)
  addUser(@Payload() payload) {
    return this.registerService.addUser(
      payload.registerId,
      payload.userId,
    );
  }

  @MessagePattern(RegisterMSG.UPDATE_PARTIAL)
  async updatePartial(payload: { id: string; updateRegisterDto: { checkOut: Date } }): Promise<IRegister> {
    console.log('Recibiendo solicitud de actualización parcial:', payload);
    const { id, updateRegisterDto } = payload;
    return this.registerService.updatePartial(id, updateRegisterDto);
  }
  
  @MessagePattern(RegisterMSG.FIND_SCHEDULE)
  findSchedule(payload: { start: string; end: string }): Promise<IRegister[]> {
    const start = new Date(payload.start);
    const end = new Date(payload.end);
    console.log('Buscando horarios con start:', start, 'y end:', end);
    return this.registerService.findSchedule(start, end);
  }

  @MessagePattern(RegisterMSG.FIND_SCHEDULE_ID)
  findScheduleById(payload: { start: string; end: string; id: string }): Promise<IRegister[]> {
    const start = new Date(payload.start);
    const end = new Date(payload.end);
    console.log('Buscando horarios con start:', start, ', end:', end, 'y id:', payload.id);
    return this.registerService.findScheduleById(start, end, payload.id);
  }

}