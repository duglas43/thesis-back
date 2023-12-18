import {
  Column,
  Model,
  Table,
  AllowNull,
  Unique,
  IsEmail,
  BelongsToMany,
} from 'sequelize-typescript';
import { RoleEntity } from '../../roles/entities/role.entity';
import { LANGUAGES } from '../enums';
import { UserRoleEntity } from './user-role.entity';

@Table({
  tableName: 'User',
})
export class UserEntity extends Model {
  @AllowNull(false)
  @Unique
  @Column
  login: string;

  @Column
  passwordHash: string | null;

  @Column
  refreshToken: string | null;

  @Column
  firstName: string | null;

  @Column
  lastName: string | null;

  @Column
  patronymic: string | null;

  @Column
  language: LANGUAGES;

  @IsEmail
  @Column
  email: string | null;

  @Column
  phone: string | null;

  @Column
  lastVisit: boolean | null;

  @BelongsToMany(() => RoleEntity, () => UserRoleEntity, 'userId', 'roleId')
  roles: RoleEntity[];
}
