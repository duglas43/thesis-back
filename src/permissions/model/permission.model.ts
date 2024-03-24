import { Column, Model, Table, HasMany, BelongsTo } from "sequelize-typescript";
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

  @Column
  condition: string;

  @HasMany(() => PermissionFieldModel, "permissionId")
  fields: PermissionFieldModel[];

  /**
   * @param condition: {"departmentId": "${id}"}
   * @param variables: {"id: 1"}
   * @return condition after parse: {"departmentId": 1}
   */
  public static parseCondition(
    condition: Record<string, any>,
    variables: Record<string, any>
  ): any {
    console.log("CONDITION", condition);
    if (!condition) return null;
    const parsedCondition = {};
    for (const [key, rawValue] of Object.entries(condition)) {
      if (rawValue !== null && typeof rawValue === "object") {
        const value = this.parseCondition(rawValue, variables);
        parsedCondition[key] = value;
        continue;
      }
      if (typeof rawValue !== "string") {
        parsedCondition[key] = rawValue;
        continue;
      }
      // find placeholder "${}"
      const matches = rawValue.match(/\${(.*?)}/);
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
