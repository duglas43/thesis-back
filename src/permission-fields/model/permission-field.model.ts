import { Column, Model, Table, BelongsTo } from "sequelize-typescript";
import { PermissionModel } from "src/permissions/model";

@Table({
  tableName: "PermissionField",
})
export class PermissionFieldModel extends Model {
  @Column
  name: string;

  @BelongsTo(() => PermissionModel, "permissionId")
  permission: PermissionModel;
}
