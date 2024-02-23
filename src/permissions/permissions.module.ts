import { Module } from "@nestjs/common";
import { PermissionsService } from "./permissions.service";
import { PermissionsController } from "./permissions.controller";
import { PermissionModel } from "./model";
import { SequelizeModule } from "@nestjs/sequelize";
import { PermissionConditionsModule } from "src/permission-conditions/permission-conditions.module";
import { PermissionFieldsModule } from "src/permission-fields/permission-fields.module";

@Module({
  imports: [
    SequelizeModule.forFeature([PermissionModel]),
    PermissionConditionsModule,
    PermissionFieldsModule,
  ],
  controllers: [PermissionsController],
  providers: [PermissionsService],
})
export class PermissionsModule {}
