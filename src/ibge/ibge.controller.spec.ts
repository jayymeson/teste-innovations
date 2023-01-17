import { Test, TestingModule } from '@nestjs/testing';
import { IbgeController } from './ibge.controller';
import { IbgeService } from './ibge.service';

describe('IbgeController', () => {
  let controller: IbgeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IbgeController],
      providers: [IbgeService],
    }).compile();

    controller = module.get<IbgeController>(IbgeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
