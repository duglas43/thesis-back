import { AddressModel } from "src/addresses/model";
import { DetailModel } from "src/details/model/detail.model";
import { DetailParamModel } from "src/details/model/detail-param.model";
import { MachineDetailModel } from "src/machines/model/machine-detail.model";
import { MachineModel } from "src/machines/model/machine.model";
import { OrderMachineModel } from "src/orders/model/order-machine.model";
import { OrderModel } from "src/orders/model/order.model";
import { ParamModel } from "src/params/model/param.model";
import { PermissionModel } from "src/permissions/model";
import { RoleModel } from "src/roles/model";
import { UserModel } from "src/users/model";
import { UserRoleModel } from "src/users/model/user-role.model";
import { UserPermissionModel } from "src/users/model/user-permission.model";
import { SubjectRawRule } from "@casl/ability";
import { ACTIONS } from "../enum";
import { MongoQuery } from "@casl/ability";
import { Subjects } from "../type";

export const STRING_CLASS_MAP = {
  User: UserModel,
  UserRole: UserRoleModel,
  Role: RoleModel,
  Address: AddressModel,
  Order: OrderModel,
  Detail: DetailModel,
  OrderMachine: OrderMachineModel,
  Machine: MachineModel,
  MachineDetail: MachineDetailModel,
  Param: ParamModel,
  DetailParam: DetailParamModel,
  Permission: PermissionModel,
  UserPermission: UserPermissionModel,
};

/**
 * Remap the subject to the correct class
 * @param subject The subject string to remap
 * @returns The remapped subject
 * @example
 * ```ts
 * mapStringClass('User') // UserModel
 * mapStringClass('all') // "all"
 * ```
 */
export const mapStringClass = (subject: any): any => {
  if (typeof subject === "string" && STRING_CLASS_MAP[subject])
    return STRING_CLASS_MAP[subject];
  return subject;
};
