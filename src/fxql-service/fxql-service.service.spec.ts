import { Test, TestingModule } from '@nestjs/testing';
import { FxqlServiceService } from './fxql-service.service';

describe('FxqlServiceService', () => {
  let service: FxqlServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FxqlServiceService],
    }).compile();

    service = module.get<FxqlServiceService>(FxqlServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
