import { Test, TestingModule } from '@nestjs/testing';
import { PermissionFieldsController } from './permission-fields.controller';
import { PermissionFieldsService } from './permission-fields.service';

describe('PermissionFieldsController', () => {
  let controller: PermissionFieldsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PermissionFieldsController],
      providers: [PermissionFieldsService],
    }).compile();

    controller = module.get<PermissionFieldsController>(PermissionFieldsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
