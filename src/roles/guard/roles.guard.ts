import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserEntity } from 'src/users/entities/user.entity';
import { RolesAllowed } from '../decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get(RolesAllowed, context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const user = request.user as UserEntity;
    if (!user) {
      return false;
    }
    const userRoles = await user.$get('roles');
    return userRoles.some((role) => roles.includes(role.name));
  }
}
