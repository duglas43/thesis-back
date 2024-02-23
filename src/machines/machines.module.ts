import { Module } from "@nestjs/common";
import { MachinesService } from "./machines.service";
import { MachinesController } from "./machines.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { MachineModel } from "./model/machine.model";
import { CaslModule } from "src/casl/casl.module";

@Module({
  imports: [SequelizeModule.forFeature([MachineModel]), CaslModule],
  controllers: [MachinesController],
  providers: [MachinesService],
})
export class MachinesModule {}
