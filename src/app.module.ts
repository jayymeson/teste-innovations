import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderModule } from './order/order.module';
import { IbgeModule } from './ibge/ibge.module';

@Module({
  imports: [OrderModule, IbgeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
