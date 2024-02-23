import { Injectable, NotFoundException } from '@nestjs/common';
import {
  CreatePermissionConditionDto,
  UpdatePermissionConditionDto,
  PermissionConditionDto,
} from './dto';
import { PermissionConditionModel } from './model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class PermissionConditionsService {
  constructor(
    @InjectModel(PermissionConditionModel)
    private permissionConditionModel: typeof PermissionConditionModel,
  ) {}
  async create(createPermissionConditionDto: CreatePermissionConditionDto) {
    const permissionCondition = await this.permissionConditionModel.create({
      ...createPermissionConditionDto,
    });
    return new PermissionConditionDto(permissionCondition);
  }

  async findAll() {
    const permissionConditions = await this.permissionConditionModel.findAll();
    return permissionConditions.map(
      (permissionCondition) => new PermissionConditionDto(permissionCondition),
    );
  }

  async findOne(id: number) {
    const permissionCondition = await this.permissionConditionModel.findByPk(
      id,
    );
    if (!permissionCondition) {
      throw new NotFoundException('Permission Condition not found');
    }
    return new PermissionConditionDto(permissionCondition);
  }

  async update(
    id: number,
    updatePermissionConditionDto: UpdatePermissionConditionDto,
  ) {
    const permissionCondition = await this.permissionConditionModel.findByPk(
      id,
    );
    if (!permissionCondition) {
      throw new NotFoundException('Permission Condition not found');
    }
    const updatedPermissionCondition = await permissionCondition.update(
      updatePermissionConditionDto,
    );
    return new PermissionConditionDto(updatedPermissionCondition);
  }

  async remove(id: number) {
    const permissionCondition = await this.permissionConditionModel.findByPk(
      id,
    );
    if (!permissionCondition) {
      throw new NotFoundException('Permission Condition not found');
    }
    await permissionCondition.destroy();
    return new PermissionConditionDto(permissionCondition);
  }
}
