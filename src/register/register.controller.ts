import { Controller, HttpStatus } from "@nestjs/common";
import { RegisterService } from "./register.service";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { RegisterDTO } from "./dto/register.dto";
import { RegisterMSG } from "src/common/constants";

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
}