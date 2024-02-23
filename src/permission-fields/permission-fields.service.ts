import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreatePermissionFieldDto,
  UpdatePermissionFieldDto,
  PermissionFieldDto,
} from './dto';
import { PermissionFieldModel } from './model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class PermissionFieldsService {
  constructor(
    @InjectModel(PermissionFieldModel)
    private permissionFieldModel: typeof PermissionFieldModel,
  ) {}
  async create(createPermissionFieldDto: CreatePermissionFieldDto) {
    const permissionField = await this.permissionFieldModel.create({
      ...createPermissionFieldDto,
    });
    return new PermissionFieldDto(permissionField);
  }

  async findAll() {
    const permissionFields = await this.permissionFieldModel.findAll();
    return permissionFields.map(
      (permissionField) => new PermissionFieldDto(permissionField),
    );
  }

  async findOne(id: number) {
    const permissionField = await this.permissionFieldModel.findByPk(id);
    if (!permissionField) {
      throw new NotFoundException('Permission Field not found');
    }
    return new PermissionFieldDto(permissionField);
  }

  async update(id: number, updatePermissionFieldDto: UpdatePermissionFieldDto) {
    const permissionField = await this.permissionFieldModel.findByPk(id);
    if (!permissionField) {
      throw new NotFoundException('Permission Field not found');
    }
    const updatedPermissionField = await permissionField.update(
      updatePermissionFieldDto,
    );
    return new PermissionFieldDto(updatedPermissionField);
  }

  async remove(id: number) {
    const permissionField = await this.permissionFieldModel.findByPk(id);
    if (!permissionField) {
      throw new NotFoundException('Permission Field not found');
    }
    await permissionField.destroy();
    return new PermissionFieldDto(permissionField);
  }
}
