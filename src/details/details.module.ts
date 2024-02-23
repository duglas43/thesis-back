import { Module } from "@nestjs/common";
import { DetailsService } from "./details.service";
import { DetailsController } from "./details.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { DetailModel } from "./model/detail.model";
import { ParamModel } from "src/params/model/param.model";
import { CaslModule } from "src/casl/casl.module";

@Module({
  imports: [SequelizeModule.forFeature([DetailModel, ParamModel]), CaslModule],
  controllers: [DetailsController],
  providers: [DetailsService],
})
export class DetailsModule {}
