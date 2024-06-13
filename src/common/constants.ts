export enum RabbitMQ {
  RegisterQueue = "registers",
}


export enum RegisterMSG {
  CREATE = 'CREATE_REGISTER',
  FIND_ALL = 'FIND_REGISTERS',
  FIND_ONE = 'FIND_REGISTER',
  UPDATE = 'UPDATE_REGISTER',
  DELETE = 'DELETE_REGISTER',
  ADD_USER = 'ADD_REGISTER_USER',
}
