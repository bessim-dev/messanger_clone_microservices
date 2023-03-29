import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    @Inject("AUTH_SERVICE") private readonly authService: ClientProxy,
  ) { }

  @Get("user")
  async getUser(): Promise<any> {
    console.log("Sending message to RabbitMQ")
    return this.authService.send({ cmd: 'get-user' }, {})
  }

}
