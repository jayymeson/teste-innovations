import { Controller, Get, Param } from '@nestjs/common';
import { IbgeService } from './ibge.service';

@Controller('ibge')
export class IbgeController {
  constructor(private readonly ibgeService: IbgeService) {}

  @Get()
  findAll() {
    return this.ibgeService.findAll();
  }

  @Get(':uf')
  findOne(@Param('uf') uf: string) {
    return this.ibgeService.findOne(uf);
  }
}
