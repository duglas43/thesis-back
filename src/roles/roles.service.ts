import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateRoleDto, UpdateRoleDto, RoleDto, FindRoleDto } from "./dto";
import { RoleModel } from "./model/role.model";
import { InjectModel } from "@nestjs/sequelize";
import { Op } from "sequelize";
import { PermissionDto } from "src/permissions/dto";

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(RoleModel)
    private roleModel: typeof RoleModel
  ) {}

  async create(dto: CreateRoleDto) {
    const role = await this.roleModel.create({ ...dto });
    return new RoleDto(role);
  }

  async findAll(dto: FindRoleDto) {
    const roles = await this.roleModel.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${dto.query}%` } },
          { description: { [Op.like]: `%${dto.query}%` } },
        ],
      },
    });
    return roles.map((role) => new RoleDto(role));
  }

  async findOne(id: number) {
    const role = await this.roleModel.findByPkOrThrow(id);
    return new RoleDto(role);
  }

  async update(id: number, dto: UpdateRoleDto) {
    const role = await this.roleModel.findByPkOrThrow(id);
    await this.roleModel.update(dto, { where: { id } });
    return new RoleDto(role);
  }

  async remove(id: number) {
    const role = await this.roleModel.findByPkOrThrow(id);
    await role.destroy();
    return new RoleDto(role);
  }

  async findPermissions(id: number) {
    const role = await this.roleModel.findByPkOrThrow(id);
    if (!role) {
      throw new NotFoundException("Role not found");
    }
    const permissions = await role.$get("permissions");
    return permissions.map((permission) => new PermissionDto(permission));
  }

  async addPermissions(id: number, permissionsId: number[]) {
    const role = await this.roleModel.findByPkOrThrow(id);
    if (!role) {
      throw new NotFoundException("Role not found");
    }
    await role.$add("permissions", permissionsId);
    const permissions = await role.$get("permissions");
    return permissions.map((permission) => new PermissionDto(permission));
  }

  async removePermissions(id: number, permissionsId: number[]) {
    const role = await this.roleModel.findByPkOrThrow(id);
    await role.$remove("permissions", permissionsId);
    const permissions = await role.$get("permissions");
    return permissions.map((permission) => new PermissionDto(permission));
  }
}
