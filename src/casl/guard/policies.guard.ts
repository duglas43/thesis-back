import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AppAbility } from "../casl-ability.factory/casl-ability.factory";
import {
  PolicyHandler,
  CHECK_POLICIES_KEY,
} from "../decorator/check-policies.decorator";
import { IS_PUBLIC_KEY } from "src/auth/decorator";

@Injectable()
export class PoliciesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    const policyHandlers =
      this.reflector.get<PolicyHandler[]>(
        CHECK_POLICIES_KEY,
        context.getHandler()
      ) || [];

    if (policyHandlers.length === 0) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    const ability = user.ability as AppAbility;

    return policyHandlers.every((handler) =>
      this.execPolicyHandler(handler, ability)
    );
  }

  private execPolicyHandler(handler: PolicyHandler, ability: AppAbility) {
    if (typeof handler === "function") {
      return handler(ability);
    }
    return handler.handle(ability);
  }
}
