import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './.env',
    }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: "AUTH_SERVICE", useFactory(configService: ConfigService) {
        const USER = configService.get('RABBITMQ_DEFAULT_USER');
        const PASSWORD = configService.get('RABBITMQ_DEFAULT_PASS');
        const HOST = configService.get('RABBITMQ_HOST');
        const QUEUE = configService.get('RABBITMQ_AUTH_QUEUE');
        return ClientProxyFactory.create({
          transport: Transport.RMQ,
          options: {
            urls: [`amqp://${USER}:${PASSWORD}@${HOST}`],
            queue: QUEUE,
            noAck: false,
            queueOptions: {
              durable: true,
            },
          },
        });

      },
      inject: [ConfigService],
    }],
})
export class AppModule { }
