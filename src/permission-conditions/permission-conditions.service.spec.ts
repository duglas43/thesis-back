import { Test, TestingModule } from '@nestjs/testing';
import { PermissionConditionsService } from './permission-conditions.service';

describe('PermissionConditionsService', () => {
  let service: PermissionConditionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PermissionConditionsService],
    }).compile();

    service = module.get<PermissionConditionsService>(PermissionConditionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
