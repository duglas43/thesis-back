import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { AppController } from "./app.controller";
import { ConfigModule } from "@nestjs/config";
import { AppService } from "./app.service";
import { UsersModule } from "./users/users.module";
import { RolesModule } from "./roles/roles.module";
import { DetailsModule } from "./details/details.module";
import { MachinesModule } from "./machines/machines.module";
import { ParamsModule } from "./params/params.module";
import { AuthModule } from "./auth/auth.module";
import { SequelizeModule } from "@nestjs/sequelize";
import { RolesGuard } from "src/auth/guard";
import { JwtAuthGuard } from "./auth/guard";
import { UserModel } from "./users/model/user.model";
import { RoleModel } from "./roles/model/role.model";
import { UserRoleModel } from "./users/model";
import { AddressModel } from "./addresses/model";
import { OrderModel } from "./orders/model/order.model";
import { DetailModel } from "./details/model/detail.model";
import { OrderMachineModel } from "./orders/model/order-machine.model";
import { MachineModel } from "./machines/model/machine.model";
import { MachineDetailModel } from "./machines/model/machine-detail.model";
import { ParamModel } from "./params/model/param.model";
import { DetailParamModel } from "./details/model/detail-param.model";
import { PermissionModel } from "./permissions/model";
import { UserPermissionModel } from "./users/model";
import { RolePermissionModel } from "./roles/model";
import { PermissionFieldModel } from "./permission-fields/model";
import { SubjectModel } from "./subjects/model";
import { OfficeModel } from "./offices/model";
import { AddressesModule } from "./addresses/addresses.module";
import { OrdersModule } from "./orders/orders.module";
import { PoliciesGuard } from "./casl/guard";
import { CaslModule } from "./casl/casl.module";
import { ExceptionFiltersModule } from "./common/exception-filters/exception-filters.module";
import { LoggerModule } from "./common/logger/logger.module";
import { MulterConfigModule } from "./common/multer-config/multer-config.module";
import { PipesModule } from "./common/pipes/pipes.module";
import { HealthModule } from "./health/health.module";
import { PermissionFieldsModule } from "./permission-fields/permission-fields.module";
import { PermissionsModule } from "./permissions/permissions.module";
import { SubjectsModule } from "./subjects/subjects.module";
import { PagesModule } from "./pages/pages.module";
import { OfficesModule } from "./offices/offices.module";
import { PageModel } from "./pages/model";

@Module({
  imports: [
    AuthModule,
    UsersModule,
    RolesModule,
    DetailsModule,
    MachinesModule,
    ParamsModule,
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      dialect: process.env.DB_DIALECT as any,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS || null,
      database: process.env.DB_NAME,
      define: {
        freezeTableName: true,
      },
      models: [
        UserModel,
        RoleModel,
        UserRoleModel,
        DetailModel,
        MachineModel,
        MachineDetailModel,
        ParamModel,
        DetailParamModel,
        AddressModel,
        OrderModel,
        OrderMachineModel,
        PermissionModel,
        PermissionFieldModel,
        SubjectModel,
        UserPermissionModel,
        RolePermissionModel,
        PageModel,
        OfficeModel,
      ],
    }),
    AddressesModule,
    OrdersModule,
    CaslModule,
    LoggerModule,
    MulterConfigModule,
    PipesModule,
    ExceptionFiltersModule,
    HealthModule,
    PermissionFieldsModule,
    PermissionsModule,
    SubjectsModule,
    PagesModule,
    OfficesModule,
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
    {
      provide: APP_GUARD,
      useClass: PoliciesGuard,
    },
    AppService,
  ],
})
export class AppModule {}
