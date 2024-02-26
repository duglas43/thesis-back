import {
  Column,
  Model,
  Table,
  AllowNull,
  Unique,
  IsEmail,
  BelongsToMany,
} from "sequelize-typescript";
import { RoleModel } from "../../roles/model/role.model";
import { UserRoleModel } from "./user-role.model";
import { PermissionModel } from "src/permissions/model";
import { UserPermissionModel } from "./user-permission.model";
import { AppModel } from "src/common/sequelize/models";

@Table({
  tableName: "User",
})
export class UserModel extends AppModel<UserModel> {
  @AllowNull(false)
  @Unique
  @IsEmail
  @Column
  email: string;

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

  @BelongsToMany(() => RoleModel, () => UserRoleModel, "userId", "roleId")
  roles: RoleModel[];

  @BelongsToMany(
    () => PermissionModel,
    () => UserPermissionModel,
    "userId",
    "permissionId"
  )
  permissions: PermissionModel[];
}
