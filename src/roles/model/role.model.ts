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
import { AppModel } from "src/common/sequelize/models";

@Table({
  tableName: "Role",
})
export class RoleModel extends AppModel<RoleModel> {
  @Column
  name: string;

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
