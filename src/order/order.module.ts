import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

import { OrderController } from './order.controller';
import { ORDER_SERVICE_NAME, ORDER_PACKAGE_NAME } from './order.pb';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: ORDER_SERVICE_NAME,
        transport: Transport.GRPC,
        options: {
          url: '0.0.0.0:50052',
          package: ORDER_PACKAGE_NAME,
          protoPath: 'node_modules/quickshop-shared-proto/proto/order.proto',
        },
      },
    ]),
  ],
  controllers: [OrderController],
})
export class OrderModule {}
