import { Module } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { OrdersController } from "./orders.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { OrderModel } from "./model/order.model";

@Module({
  imports: [SequelizeModule.forFeature([OrderModel])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
