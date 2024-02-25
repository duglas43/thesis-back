import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt";
import { ConfigService } from "@nestjs/config";
import { UserModel } from "src/users/model/user.model";
import { InjectModel } from "@nestjs/sequelize";
import { CaslAbilityFactory } from "src/casl/casl-ability.factory/casl-ability.factory";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(
    @InjectModel(UserModel)
    private userEntity: typeof UserModel,
    configService: ConfigService,
    private caslAbilityFactory: CaslAbilityFactory
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get("JWT_ACCESS_TOKEN_SECRET"),
    });
  }
  async validate(payload: { sub: number; email: string }) {
    const user = await this.userEntity.findOne({
      where: { id: payload.sub },
      include: ["roles"],
    });
    const ability = this.caslAbilityFactory.createForUser(user);
    user["ability"] = ability;
    return user;
  }
}
