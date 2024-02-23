import { Test, TestingModule } from '@nestjs/testing';
import { PermissionFieldsService } from './permission-fields.service';

describe('PermissionFieldsService', () => {
  let service: PermissionFieldsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PermissionFieldsService],
    }).compile();

    service = module.get<PermissionFieldsService>(PermissionFieldsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
