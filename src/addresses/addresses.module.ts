import { Module } from "@nestjs/common";
import { AddressesService } from "./addresses.service";
import { AddressesController } from "./addresses.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { AddressModel } from "./model/address.model";

@Module({
  imports: [SequelizeModule.forFeature([AddressModel])],
  controllers: [AddressesController],
  providers: [AddressesService],
})
export class AddressesModule {}
