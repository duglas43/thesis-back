import { Model, Table } from "sequelize-typescript";
import { AppModel } from "src/common/sequelize/models";

@Table({
  tableName: "UserPermission",
})
export class UserPermissionModel extends AppModel<UserPermissionModel> {}
