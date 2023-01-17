import { Module } from '@nestjs/common';
import { IbgeService } from './ibge.service';
import { IbgeController } from './ibge.controller';

@Module({
  controllers: [IbgeController],
  providers: [IbgeService],
})
export class IbgeModule {}
