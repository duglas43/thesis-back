import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from "@nestjs/common";
import { CreateRoleDto, UpdateRoleDto, RoleDto, FindRoleDto } from "./dto";
import { RoleModel } from "./model/role.model";
import { InjectModel } from "@nestjs/sequelize";
import { Op } from "sequelize";
import { AppAbility } from "src/casl/casl-ability.factory/casl-ability.factory";
import { ACTIONS } from "src/casl/enum";
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

  async findAll(dto: FindRoleDto, ability: AppAbility) {
    const roles = await this.roleModel.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${dto.query}%` } },
          { description: { [Op.like]: `%${dto.query}%` } },
        ],
      },
    });
    return roles.reduce((acc, role) => {
      if (ability.can(ACTIONS.READ, role)) {
        acc.push(new RoleDto(role));
      }
      return acc;
    }, []);
  }

  async findOne(id: number, ability: AppAbility) {
    const role = await this.roleModel.findByPk(id);
    if (!ability.can(ACTIONS.READ, role)) {
      throw new ForbiddenException();
    }
    return new RoleDto(role);
  }

  async update(id: number, dto: UpdateRoleDto, ability: AppAbility) {
    const role = await this.roleModel.findByPk(id);
    if (!role) {
      throw new NotFoundException();
    }
    if (!ability.can(ACTIONS.UPDATE, role)) {
      throw new ForbiddenException();
    }
    Object.keys(dto).forEach((key) => {
      if (!ability.can(ACTIONS.UPDATE, role, key)) {
        delete dto[key];
      }
    });
    await this.roleModel.update(dto, { where: { id } });
    return new RoleDto(role);
  }

  async remove(id: number, ability: AppAbility) {
    const role = await this.roleModel.findByPk(id);
    if (!role) {
      throw new NotFoundException();
    }
    if (!ability.can(ACTIONS.DELETE, role)) {
      throw new ForbiddenException();
    }
    await role.destroy();
    return new RoleDto(role);
  }

  async findPermissions(id: number) {
    const role = await this.roleModel.findByPk(id);
    if (!role) {
      throw new NotFoundException("Role not found");
    }
    const permissions = await role.$get("permissions");
    return permissions.map((permission) => new PermissionDto(permission));
  }

  async addPermissions(id: number, permissionsId: number[]) {
    const role = await this.roleModel.findByPk(id);
    if (!role) {
      throw new NotFoundException("Role not found");
    }
    await role.$add("permissions", permissionsId);
    const permissions = await role.$get("permissions");
    return permissions.map((permission) => new PermissionDto(permission));
  }

  async removePermissions(id: number, permissionsId: number[]) {
    const role = await this.roleModel.findByPk(id);
    if (!role) {
      throw new NotFoundException("Role not found");
    }
    await role.$remove("permissions", permissionsId);
    const permissions = await role.$get("permissions");
    return permissions.map((permission) => new PermissionDto(permission));
  }
}
