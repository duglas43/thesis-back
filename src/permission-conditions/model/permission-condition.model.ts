import { Column, Model, Table, BelongsTo } from "sequelize-typescript";
import { PermissionModel } from "src/permissions/model";

@Table({
  tableName: "PermissionCondition",
})
export class PermissionConditionModel extends Model {
  @Column
  key: string;

  @Column
  value: string;

  @BelongsTo(() => PermissionModel, "permissionId")
  permission: PermissionModel;
}
