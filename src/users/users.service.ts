import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserDto, FindUserDto } from './dto';
import { InjectModel } from '@nestjs/sequelize';
import { UserEntity } from './entities/user.entity';
import { Op } from 'sequelize';
import * as bcrypt from 'bcrypt';
import { AppAbility } from 'src/casl/casl-ability.factory/casl-ability.factory';
import { ACTIONS } from 'src/casl/enums';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserEntity)
    private userEntity: typeof UserEntity,
  ) {}

  async create(dto: CreateUserDto) {
    const passwordHash = await bcrypt.hash(dto.password, 5);
    const createdUser = await this.userEntity.create({
      ...dto,
      passwordHash,
    });
    if (dto.roleIds) {
      await createdUser.$set('roles', dto.roleIds);
    }
    const user = await this.userEntity.findByPk(createdUser.id, {});
    return new UserDto(user);
  }

  async findAll(dto: FindUserDto, ability: AppAbility) {
    const users = await this.userEntity.findAll({
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
    return users.reduce((acc, user) => {
      if (ability.can(ACTIONS.READ, user)) {
        acc.push(new UserDto(user));
      }
      return acc;
    }, []);
  }

  async findOne(id: number, ability: AppAbility) {
    const user = await this.userEntity.findByPk(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (!ability.can(ACTIONS.READ, user)) {
      throw new NotFoundException('User not found');
    }
    Object.keys(user.dataValues).forEach((key) => {
      if (!ability.can(ACTIONS.READ, user, key)) {
        delete user.dataValues[key];
      }
    });
    return new UserDto(user);
  }

  async update(id: number, dto: UpdateUserDto, ability: AppAbility) {
    const user = await this.userEntity.findByPk(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (!ability.can(ACTIONS.UPDATE, user)) {
      throw new NotFoundException('User not found');
    }
    Object.keys(dto).forEach((key) => {
      if (!ability.can(ACTIONS.UPDATE, user, key)) {
        delete dto[key];
      }
    });
    if (dto.roleIds) {
      await user.$set('roles', dto.roleIds);
    }
    await this.userEntity.update(dto, { where: { id } });
    return new UserDto(user);
  }

  async remove(id: number, ability: AppAbility) {
    const user = await this.userEntity.findByPk(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (!ability.can(ACTIONS.DELETE, user)) {
      throw new NotFoundException('User not found');
    }
    await user.destroy();
    return new UserDto(user);
  }

  async getMe(id: number) {
    const user = await this.userEntity.findByPk(id, {});
    return new UserDto(user);
  }
  async addRoles(id: number, roleIds: number[], ability: AppAbility) {
    const user = await this.userEntity.findByPk(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (!ability.can(ACTIONS.UPDATE, user)) {
      throw new NotFoundException('User not found');
    }
    await user.$set('roles', roleIds);
    return new UserDto(user);
  }

  async removeRoles(id: number, roleIds: number[], ability: AppAbility) {
    const user = await this.userEntity.findByPk(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (!ability.can(ACTIONS.UPDATE, user)) {
      throw new NotFoundException('User not found');
    }
    await user.$remove('roles', roleIds);
    return new UserDto(user);
  }
}
