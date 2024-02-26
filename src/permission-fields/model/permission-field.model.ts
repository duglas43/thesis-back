import { Column, Model, Table, BelongsTo } from "sequelize-typescript";
import { PermissionModel } from "src/permissions/model";
import { AppModel } from "src/common/sequelize/models";

@Table({
  tableName: "PermissionField",
})
export class PermissionFieldModel extends AppModel<PermissionFieldModel> {
  @Column
  name: string;

  @BelongsTo(() => PermissionModel, "permissionId")
  permission: PermissionModel;
}
