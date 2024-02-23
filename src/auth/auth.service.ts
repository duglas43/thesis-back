import {
  Injectable,
  BadRequestException,
  ForbiddenException,
} from "@nestjs/common";
import { SignInDto, SignUpDto, AccessDto, RefreshDto } from "./dto";
import { InjectModel } from "@nestjs/sequelize";
import { UserModel } from "../users/model/user.model";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserModel)
    private userEntity: typeof UserModel,
    private jwtService: JwtService,
    private configService: ConfigService
  ) {}

  async signUp(dto: SignUpDto) {
    const candidate = await this.userEntity.findOne({
      where: { login: dto.login },
    });
    if (candidate) {
      throw new BadRequestException(
        `User with login ${dto.login} already exists`
      );
    }
    const hashPassword = await bcrypt.hash(dto.password, 5);
    const user = await this.userEntity.create({
      ...dto,
      passwordHash: hashPassword,
    });
    const refresh_token = await this.signRefreshToken({
      id: user.id,
      login: user.login,
    });
    await user.update({ refreshToken: refresh_token });
    const access_token = await this.signAccessToken({
      id: user.id,
      login: user.login,
    });
    return {
      access_token,
      refresh_token,
    };
  }

  async signIn(dto: SignInDto) {
    const user = await this.userEntity.findOne({
      where: { login: dto.login },
    });
    if (!user) {
      throw new ForbiddenException("Incorrect login or password");
    }
    const isCorrectPassword = bcrypt.compare(dto.password, user.passwordHash);
    if (!isCorrectPassword) {
      throw new ForbiddenException("Incorrect login or password");
    }
    const access_token = await this.signAccessToken({
      id: user.id,
      login: user.login,
    });
    const refresh_token = await this.signRefreshToken({
      id: user.id,
      login: user.login,
    });
    await user.update({ refreshToken: refresh_token });
    return {
      access_token,
      refresh_token,
    };
  }

  async refresh(dto: RefreshDto) {
    const user = await this.userEntity.findOne({
      where: { refreshToken: dto.refresh_token },
    });
    if (!user) {
      throw new ForbiddenException("Incorrect refresh token");
    }
    const access_token = await this.signAccessToken({
      id: user.id,
      login: user.login,
    });
    const refresh_token = await this.signRefreshToken({
      id: user.id,
      login: user.login,
    });
    await user.update({ refresh_token });
    return {
      access_token,
      refresh_token,
    };
  }

  async logout(userId: number) {
    const user = await this.userEntity.findByPk(userId);
    await user.update({ refreshToken: null });
    return new AccessDto(null);
  }

  async signAccessToken(dto: { id: number; login: string }) {
    const payload = { login: dto.login, sub: dto.id };
    const secret = this.configService.get("JWT_ACCESS_TOKEN_SECRET");
    return this.jwtService.sign(payload, {
      expiresIn: "365d",
      secret,
    });
  }

  async signRefreshToken(dto: { id: number; login: string }) {
    const payload = { login: dto.login, sub: dto.id };
    const secret = this.configService.get("JWT_REFRESH_TOKEN_SECRET");
    return this.jwtService.sign(payload, {
      expiresIn: "365d",
      secret,
    });
  }
}
