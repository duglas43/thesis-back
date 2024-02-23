import { Module } from "@nestjs/common";
import { ParamsService } from "./params.service";
import { ParamsController } from "./params.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { ParamModel } from "./model/param.model";

@Module({
  imports: [SequelizeModule.forFeature([ParamModel])],
  controllers: [ParamsController],
  providers: [ParamsService],
})
export class ParamsModule {}
