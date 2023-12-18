import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetAbility = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user.ability;
  },
);
