import { InferSubjects } from "@casl/ability";
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

export type Subjects =
  | InferSubjects<
      | typeof UserModel
      | typeof UserRoleModel
      | typeof RoleModel
      | typeof AddressModel
      | typeof OrderModel
      | typeof DetailModel
      | typeof OrderMachineModel
      | typeof MachineModel
      | typeof MachineDetailModel
      | typeof ParamModel
      | typeof DetailParamModel
      | typeof PermissionModel
      | typeof UserPermissionModel
    >
  | "all";
