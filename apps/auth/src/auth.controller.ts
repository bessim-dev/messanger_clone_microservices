import { Controller } from '@nestjs/common';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }


  @MessagePattern({ cmd: 'get-user' })
  async getUser(@Ctx() ctx: RmqContext): Promise<string> {
    console.log('Received message from RabbitMQ');
    const channel = ctx.getChannelRef();
    const originalMsg = ctx.getMessage();
    channel.ack(originalMsg);
    return 'User: John Doe';
  }
}
