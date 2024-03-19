import { InferSubjects } from "@casl/ability";
import { UserModel } from "src/users/model/user.model";
import { RoleModel } from "src/roles/model/role.model";
import { UserRoleModel } from "src/users/model";
import { AddressModel } from "src/addresses/model";
import { OrderModel } from "src/orders/model/order.model";
import { DetailModel } from "src/details/model/detail.model";
import { OrderMachineModel } from "src/orders/model/order-machine.model";
import { MachineModel } from "src/machines/model/machine.model";
import { MachineDetailModel } from "src/machines/model/machine-detail.model";
import { ParamModel } from "src/params/model/param.model";
import { DetailParamModel } from "src/details/model/detail-param.model";
import { PermissionModel } from "src/permissions/model";
import { PermissionConditionModel } from "src/permission-conditions/model";
import { UserPermissionModel } from "src/users/model";
import { RolePermissionModel } from "src/roles/model";
import { PermissionFieldModel } from "src/permission-fields/model";
import { SubjectModel } from "src/subjects/model";
import { SUBJECTS } from "../enum";

export type AppSubjects =
  | InferSubjects<
      | typeof UserModel
      | typeof RoleModel
      | typeof UserRoleModel
      | typeof AddressModel
      | typeof OrderModel
      | typeof DetailModel
      | typeof OrderMachineModel
      | typeof MachineModel
      | typeof MachineDetailModel
      | typeof ParamModel
      | typeof DetailParamModel
      | typeof PermissionModel
      | typeof PermissionConditionModel
      | typeof UserPermissionModel
      | typeof RolePermissionModel
      | typeof PermissionFieldModel
      | typeof SubjectModel
    >
  | SUBJECTS;
