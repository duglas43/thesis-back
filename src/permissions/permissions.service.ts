import { Injectable, NotFoundException } from "@nestjs/common";
import { CreatePermissionDto, UpdatePermissionDto, PermissionDto } from "./dto";
import { PermissionModel } from "./model";
import { InjectModel } from "@nestjs/sequelize";
import { PermissionConditionsService } from "src/permission-conditions/permission-conditions.service";
import { PermissionFieldsService } from "src/permission-fields/permission-fields.service";

@Injectable()
export class PermissionsService {
  constructor(
    @InjectModel(PermissionModel)
    private permissionModel: typeof PermissionModel,
    private permissionConditionsService: PermissionConditionsService,
    private permissionFieldsService: PermissionFieldsService
  ) {}
  async create(createPermissionDto: CreatePermissionDto) {
    const createdPermission = await this.permissionModel.create({
      subjectId: createPermissionDto.subjectId,
      modality: createPermissionDto.modality,
      action: createPermissionDto.action,
    });
    if (createPermissionDto.conditions) {
      createPermissionDto.conditions.forEach(async (condition) => {
        await this.permissionConditionsService.create({
          ...condition,
          permissionId: createdPermission.id,
        });
      });
    }
    if (createPermissionDto.fields) {
      createPermissionDto.fields.forEach(async (field) => {
        await this.permissionFieldsService.create({
          ...field,
          permissionId: createdPermission.id,
        });
      });
    }
    const permission = await this.permissionModel.findByPk(
      createdPermission.id,
      {
        include: ["fields", "conditions"],
      }
    );
    return new PermissionDto(permission);
  }

  async findAll() {
    const permissions = await this.permissionModel.findAll({
      include: ["fields", "conditions"],
    });
    return permissions.map((permission) => new PermissionDto(permission));
  }

  async findOne(id: number) {
    const permission = await this.permissionModel.findByPk(id, {
      include: ["fields", "conditions"],
    });
    if (!permission) {
      throw new NotFoundException("Permission  not found");
    }
    return new PermissionDto(permission);
  }

  async update(id: number, updatePermissionDto: UpdatePermissionDto) {
    const permission = await this.permissionModel.findByPk(id, {
      include: ["fields", "conditions"],
    });
    if (!permission) {
      throw new NotFoundException("Permission not found");
    }
    const updatedPermission = await permission.update(updatePermissionDto);
    return new PermissionDto(updatedPermission);
  }

  async remove(id: number) {
    const permission = await this.permissionModel.findByPk(id, {
      include: ["fields", "conditions"],
    });
    if (!permission) {
      throw new NotFoundException("Permission not found");
    }
    await permission.destroy();
    return new PermissionDto(permission);
  }
}
