import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<string[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();

    if (!user || !user.userId) {
        return false;
    }

    const userRecord = await this.prisma.user.findUnique({
      where: { id: user.userId },
      include: { role: true },
    });

    if (!userRecord || !userRecord.role) {
      return false;
    }

    return requiredRoles.includes(userRecord.role.name);
  }
}
