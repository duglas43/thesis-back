import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { UserModel } from "./model/user.model";
import { CaslModule } from "src/casl/casl.module";

@Module({
  imports: [SequelizeModule.forFeature([UserModel]), CaslModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, SequelizeModule],
})
export class UsersModule {}
