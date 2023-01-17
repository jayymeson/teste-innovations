import { Test, TestingModule } from '@nestjs/testing';
import { IbgeService } from './ibge.service';

describe('IbgeService', () => {
  let service: IbgeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IbgeService],
    }).compile();

    service = module.get<IbgeService>(IbgeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
