import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AppAbility } from "../casl-ability.factory/casl-ability.factory";
import {
  PolicyHandler,
  CHECK_POLICIES_KEY,
} from "../decorator/check-policies.decorator";
import { IS_PUBLIC_KEY } from "src/auth/decorator";
import { CaslAbilityFactory } from "../casl-ability.factory/casl-ability.factory";

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private caslAbilityFactory: CaslAbilityFactory
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    const ability = await this.caslAbilityFactory.createForUser(user);
    console.log("rules", ability.rules);
    context.switchToHttp().getRequest().ability = ability;

    const policyHandlers =
      this.reflector.get<PolicyHandler[]>(
        CHECK_POLICIES_KEY,
        context.getHandler()
      ) || [];

    if (policyHandlers.length === 0) {
      return true;
    }

    policyHandlers.forEach((handler) => {
      const can = this.execPolicyHandler(handler, ability);
      if (!can) {
        throw new ForbiddenException(
          "You don't have permission to perform this action"
        );
      }
    });
    return true;
  }

  private execPolicyHandler(handler: PolicyHandler, ability: AppAbility) {
    if (typeof handler === "function") {
      return handler(ability);
    }
    return handler.handle(ability);
  }
}
