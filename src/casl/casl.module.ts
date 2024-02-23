import { Module } from "@nestjs/common";
import { CaslAbilityFactory } from "./casl-ability.factory/casl-ability.factory";
import { PoliciesGuard } from "./guard";
import { UserModel } from "src/users/model";
import { SequelizeModule } from "@nestjs/sequelize";

@Module({
  imports: [SequelizeModule.forFeature([UserModel])],
  providers: [CaslAbilityFactory, PoliciesGuard],
  exports: [CaslAbilityFactory, PoliciesGuard],
})
export class CaslModule {}
