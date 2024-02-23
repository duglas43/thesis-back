import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDto, UpdateUserDto, UserDto, FindUserDto } from "./dto";
import { InjectModel } from "@nestjs/sequelize";
import { UserModel } from "./model/user.model";
import { Op } from "sequelize";
import * as bcrypt from "bcrypt";
import { AppAbility } from "src/casl/casl-ability.factory/casl-ability.factory";
import { ACTIONS } from "src/casl/enum";
import { RoleDto } from "src/roles/dto";
import { PermissionDto } from "src/permissions/dto";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserModel)
    private userModel: typeof UserModel
  ) {}

  async create(dto: CreateUserDto) {
    const passwordHash = await bcrypt.hash(dto.password, 5);
    const createdUser = await this.userModel.create({
      ...dto,
      passwordHash,
    });
    if (dto.roleIds) {
      await createdUser.$set("roles", dto.roleIds);
    }
    const user = await this.userModel.findByPk(createdUser.id, {});
    return new UserDto(user);
  }

  async findAll(dto: FindUserDto) {
    const users = await this.userModel.findAll({
      where: {
        [Op.and]: [
          dto.query && {
            [Op.or]: [
              { firstName: { [Op.like]: `%${dto.query}%` } },
              { lastName: { [Op.like]: `%${dto.query}%` } },
              { patronymic: { [Op.like]: `%${dto.query}%` } },
            ],
          },
        ].filter(Boolean),
      },
    });
    return users.map((user) => new UserDto(user));
  }

  async findOne(id: number) {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return new UserDto(user);
  }

  async update(id: number, dto: UpdateUserDto) {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException("User not found");
    }

    if (dto.roleIds) {
      await user.$set("roles", dto.roleIds);
    }
    await this.userModel.update(dto, { where: { id } });
    return new UserDto(user);
  }

  async remove(id: number) {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    await user.destroy();
    return new UserDto(user);
  }

  async getMe(id: number) {
    const user = await this.userModel.findByPk(id, {});
    return new UserDto(user);
  }
  async addRoles(id: number, roleIds: number[]) {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException("User not found");
    }

    await user.$set("roles", roleIds);
    return new UserDto(user);
  }

  async removeRoles(id: number, roleIds: number[]) {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException("User not found");
    }

    await user.$remove("roles", roleIds);
    return new UserDto(user);
  }

  async findRoles(id: number) {
    const user = await this.userModel.findByPk(id, {
      include: ["roles"],
    });
    if (!user) {
      throw new NotFoundException("User not found");
    }
    return user.roles.map((role) => new RoleDto(role));
  }

  async findPermissions(id: number) {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    const permissions = await user.$get("permissions");
    return permissions.map((permission) => new PermissionDto(permission));
  }

  async addPermissions(id: number, permissionsId: number[]) {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    await user.$add("permissions", permissionsId);
    const permissions = await user.$get("permissions");
    return permissions.map((permission) => new PermissionDto(permission));
  }

  async removePermissions(id: number, permissionsId: number[]) {
    const user = await this.userModel.findByPk(id);
    if (!user) {
      throw new NotFoundException("User not found");
    }
    await user.$remove("permissions", permissionsId);
    const permissions = await user.$get("permissions");
    return permissions.map((permission) => new PermissionDto(permission));
  }
}
