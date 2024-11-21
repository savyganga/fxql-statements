import { Test, TestingModule } from '@nestjs/testing';
import { FxqlServiceController } from './fxql-service.controller';
import { FxqlServiceService } from './fxql-service.service';

describe('FxqlServiceController', () => {
  let controller: FxqlServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FxqlServiceController],
      providers: [FxqlServiceService],
    }).compile();

    controller = module.get<FxqlServiceController>(FxqlServiceController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
