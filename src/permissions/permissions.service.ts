import { Injectable, NotFoundException } from "@nestjs/common";
import { CreatePermissionDto, UpdatePermissionDto, PermissionDto } from "./dto";
import { PermissionModel } from "./model";
import { InjectModel } from "@nestjs/sequelize";
import { PermissionFieldsService } from "src/permission-fields/permission-fields.service";

@Injectable()
export class PermissionsService {
  constructor(
    @InjectModel(PermissionModel)
    private permissionModel: typeof PermissionModel,
    private permissionFieldsService: PermissionFieldsService
  ) {}
  async create(createPermissionDto: CreatePermissionDto) {
    const createdPermission = await this.permissionModel.create({
      subjectId: createPermissionDto.subjectId,
      modality: createPermissionDto.modality,
      action: createPermissionDto.action,
      condition: createPermissionDto.condition,
    });

    if (createPermissionDto.fields) {
      createPermissionDto.fields.forEach(async (field) => {
        await this.permissionFieldsService.create({
          ...field,
          permissionId: createdPermission.id,
        });
      });
    }
    const permission = await this.permissionModel.findByPkOrThrow(
      createdPermission.id,
      {
        include: ["fields"],
      }
    );
    return new PermissionDto(permission);
  }

  async findAll() {
    const permissions = await this.permissionModel.findAll({
      include: ["fields"],
    });
    return permissions.map((permission) => new PermissionDto(permission));
  }

  async findOne(id: number) {
    const permission = await this.permissionModel.findByPkOrThrow(id, {
      include: ["fields"],
    });
    return new PermissionDto(permission);
  }

  async update(id: number, updatePermissionDto: UpdatePermissionDto) {
    const permission = await this.permissionModel.findByPkOrThrow(id, {
      include: ["fields"],
    });
    const updatedPermission = await permission.update(updatePermissionDto);
    return new PermissionDto(updatedPermission);
  }

  async remove(id: number) {
    const permission = await this.permissionModel.findByPkOrThrow(id, {
      include: ["fields"],
    });
    await permission.destroy();
    return new PermissionDto(permission);
  }
}
