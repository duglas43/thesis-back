import { Column, Model, Table, BelongsTo } from "sequelize-typescript";
import { PermissionModel } from "src/permissions/model";
import { AppModel } from "src/common/sequelize/models";

@Table({
  tableName: "PermissionCondition",
})
export class PermissionConditionModel extends AppModel<PermissionConditionModel> {
  @Column
  key: string;

  @Column
  value: string;

  @BelongsTo(() => PermissionModel, "permissionId")
  permission: PermissionModel;
}
