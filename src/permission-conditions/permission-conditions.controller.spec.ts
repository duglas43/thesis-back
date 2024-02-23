import { Test, TestingModule } from '@nestjs/testing';
import { PermissionConditionsController } from './permission-conditions.controller';
import { PermissionConditionsService } from './permission-conditions.service';

describe('PermissionConditionsController', () => {
  let controller: PermissionConditionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PermissionConditionsController],
      providers: [PermissionConditionsService],
    }).compile();

    controller = module.get<PermissionConditionsController>(PermissionConditionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
