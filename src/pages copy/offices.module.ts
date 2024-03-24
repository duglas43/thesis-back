import { Module } from "@nestjs/common";
import { OfficesService } from "./offices.service";
import { OfficesController } from "./offices.controller";
import { OfficeModel } from "./model";
import { SequelizeModule } from "@nestjs/sequelize";

@Module({
  imports: [SequelizeModule.forFeature([OfficeModel])],
  controllers: [OfficesController],
  providers: [OfficesService],
})
export class OfficesModule {}
