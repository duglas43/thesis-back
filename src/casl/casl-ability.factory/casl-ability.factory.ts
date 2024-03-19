import { Injectable } from "@nestjs/common";
import {
  MongoAbility,
  createMongoAbility,
  AbilityBuilder,
} from "@casl/ability";
import { ACTIONS } from "../enum";
import { ROLES } from "src/roles/enum";
import { InjectModel } from "@nestjs/sequelize";
import { UserModel } from "src/users/model";
import { PermissionModel } from "src/permissions/model";
import { Subjects } from "../type";
import { mapStringClass } from "../util";

export type AppAbility = MongoAbility<[ACTIONS, Subjects]>;
@Injectable()
export class CaslAbilityFactory {
  constructor(
    @InjectModel(UserModel)
    private readonly userModel: typeof UserModel
  ) {}

  async createForUser(user: UserModel) {
    const { can, cannot, build, rules } = new AbilityBuilder<AppAbility>(
      createMongoAbility
    );
    const extendedUser = await this.userModel.findByPk(user.id, {
      include: [
        {
          association: "roles",
          include: [
            {
              association: "permissions",
              include: ["fields", "conditions", "subject"],
            },
          ],
        },
        {
          association: "permissions",
          include: ["fields", "conditions", "subject"],
        },
      ],
    });
    const userPermissions = extendedUser.permissions;
    const userRoles = extendedUser.roles;
    const userRolesPermissions = [];
    for (const role of userRoles) {
      userRolesPermissions.push(...role.permissions);
    }
    const sortedUserRolesPermissions =
      this.sortPermissions(userRolesPermissions);
    const sortedUserPermissions = this.sortPermissions(userPermissions);

    cannot(ACTIONS.MANAGE, "all");
    sortedUserRolesPermissions.forEach((permission) => {
      const fields = permission.fields.map((field) => field.name);
      const subject = mapStringClass(permission.subject.name);
      rules.push({
        action: permission.action,
        subject,
        conditions: PermissionModel.parseCondition(permission.conditions, user),
        fields: fields.length > 0 ? fields : undefined,
        inverted: !permission.modality,
        reason: permission.reason,
      });
    });
    sortedUserPermissions.forEach((permission) => {
      const fields = permission.fields.map((field) => field.name);
      const subject = mapStringClass(permission.subject.name);
      rules.push({
        action: permission.action,
        subject,
        conditions: PermissionModel.parseCondition(permission.conditions, user),
        fields: fields.length > 0 ? fields : undefined,
        inverted: !permission.modality,
        reason: permission.reason,
      });
    });
    if (userRoles.some((role) => role.name === ROLES.ADMIN)) {
      can(ACTIONS.MANAGE, "all");
    }
    return build();
  }

  /**
   * @description
   * Sort permissions by modality and fields/conditions. Here is the priority of permissions:
   * 1. Permissions without conditions and fields and with modality = true (can permissions to db table)
   * 2. Permissions without conditions and fields and with modality = false (cannot permissions to db table)
   * 3. Permissions with conditions and with modality = true (can permissions to entries)
   * 4. Permissions with conditions and with modality = false (cannot permissions to entries)
   * 5. Permissions with fields and with modality = true (can permissions to fields)
   * 6. Permissions with fields and with modality = false (cannot permissions to fields)
   * The higher the permission in the list, the lower the priority
   *
   * You can think about it in this way:
   *
   * sortPermissions(permissions: PermissionModel[]) {
   *
   * const canDBTable = permissions.filter(
   *   (permission) =>
   *     permission.conditions.length === 0 &&
   *     permission.fields.length === 0 &&
   *     permission.modality,
   * );
   *
   * const cannotDBTable = permissions.filter(
   *   (permission) =>
   *     permission.conditions.length === 0 &&
   *     permission.fields.length === 0 &&
   *     !permission.modality,
   * );
   *
   * const canEntries = permissions.filter(
   *   (permission) => permission.conditions.length > 0 && permission.modality,
   * );
   *
   * const cannotEntries = permissions.filter(
   *   (permission) => permission.conditions.length > 0 && !permission.modality,
   * );
   *
   * const canField = permissions.filter(
   *   (permission) => permission.fields.length > 0 && permission.modality,
   * );
   *
   * const cannotField = permissions.filter(
   *   (permission) => permission.fields.length > 0 && !permission.modality,
   * );
   *
   * return [
   *   ...canDBTable,
   *   ...cannotDBTable,
   *   ...canEntries,
   *   ...cannotEntries,
   *   ...canField,
   *   ...cannotField,
   * ];
   *}
   * @param permissions: PermissionModel[]
   * @returns sortedPermissions: PermissionModel[]
   */

  private sortPermissions(permissions: PermissionModel[]): PermissionModel[] {
    const sortedPermissions = [];

    permissions.forEach((permission) => {
      if (
        permission.conditions.length === 0 &&
        permission.fields.length === 0
      ) {
        if (permission.modality) {
          sortedPermissions.unshift(permission);
        } else {
          sortedPermissions.push(permission);
        }
      } else if (permission.conditions.length > 0) {
        if (permission.modality) {
          sortedPermissions.unshift(permission);
        } else {
          sortedPermissions.push(permission);
        }
      } else {
        if (permission.modality) {
          sortedPermissions.unshift(permission);
        } else {
          sortedPermissions.push(permission);
        }
      }
    });

    return sortedPermissions;
  }
}
