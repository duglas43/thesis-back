import { Column, Model, Table, HasMany, BelongsTo } from "sequelize-typescript";
import { PermissionConditionModel } from "src/permission-conditions/model";
import { PermissionFieldModel } from "src/permission-fields/model";
import { SubjectModel } from "src/subjects/model";
import { ACTIONS } from "src/casl/enum";
import { AppModel } from "src/common/sequelize/models";

@Table({
  tableName: "Permission",
})
export class PermissionModel extends AppModel<PermissionModel> {
  @Column
  subjectId: number;
  @BelongsTo(() => SubjectModel, "subjectId")
  subject: SubjectModel;

  @Column
  modality: boolean;

  @Column({
    type: "enum",
    values: Object.values(ACTIONS),
  })
  action: ACTIONS;

  @Column
  reason: string;

  @HasMany(() => PermissionFieldModel, "permissionId")
  fields: PermissionFieldModel[];

  @HasMany(() => PermissionConditionModel, "permissionId")
  conditions: PermissionConditionModel[];

  /**
   * @param conditions: [{key: "departmentId", value: "${id}"}, {key: "name", value: "admin"}]
   * @param variables: {"id: 1"}
   * @return condition after parse: {"departmentId": 1}
   */
  public static parseCondition(
    conditions: PermissionConditionModel[],
    variables: Record<string, any>
  ) {
    if (!conditions || !Array.isArray(conditions) || conditions.length === 0)
      return null;
    const parsedCondition = {};
    for (const condition of conditions) {
      const { key, value: rawValue } = condition;
      if (rawValue !== null && typeof rawValue === "object") {
        const value = this.parseCondition(rawValue, variables);
        parsedCondition[key] = value;
        continue;
      }
      if (typeof rawValue !== "string") {
        parsedCondition[key] = rawValue;
        continue;
      }
      // find placeholder "${}""
      const matches = /^\\${([a-zA-Z0-9]+)}$/.exec(rawValue);
      if (!matches) {
        parsedCondition[key] = rawValue;
        continue;
      }
      const value = variables[matches[1]];
      if (typeof value === "undefined") {
        throw new ReferenceError(`Variable ${name} is not defined`);
      }
      parsedCondition[key] = value;
    }
    return parsedCondition;
  }
}
