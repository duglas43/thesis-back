import { Module } from "@nestjs/common";
import { PermissionsService } from "./permissions.service";
import { PermissionsController } from "./permissions.controller";
import { PermissionModel } from "./model";
import { SequelizeModule } from "@nestjs/sequelize";
import { PermissionFieldsModule } from "src/permission-fields/permission-fields.module";

@Module({
  imports: [
    SequelizeModule.forFeature([PermissionModel]),
    PermissionFieldsModule,
  ],
  controllers: [PermissionsController],
  providers: [PermissionsService],
})
export class PermissionsModule {}
