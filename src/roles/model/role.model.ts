import {
  Column,
  Model,
  Table,
  BelongsToMany,
  DataType,
} from "sequelize-typescript";
import { UserModel, UserRoleModel } from "src/users/model";
import { ROLES } from "../enum";
import { PermissionModel } from "src/permissions/model";
import { RolePermissionModel } from "./role-permission.model";

@Table({
  tableName: "Role",
})
export class RoleModel extends Model {
  @Column({
    type: DataType.ENUM,
    values: Object.values(ROLES),
  })
  name: ROLES;

  @Column
  description: string;

  @BelongsToMany(() => UserModel, () => UserRoleModel, "roleId", "userId")
  users: UserModel[];

  @BelongsToMany(
    () => PermissionModel,
    () => RolePermissionModel,
    "roleId",
    "permissionId"
  )
  permissions: PermissionModel[];
}
