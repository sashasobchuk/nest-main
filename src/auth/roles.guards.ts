import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles-auth.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();
    try {
      const requiredRoles = this.reflector.getAllAndOverride<string[]>(
        ROLES_KEY,
        [context.getHandler(), context.getClass()],
      );
      if (!requiredRoles) {
        return true;
      }
      const authorization = req.headers.authorization;
      const bearer = authorization.split(' ')[0];
      const token = authorization.split(' ')[1];
      if (bearer !== 'Bearer' || !token) {
        throw new UnauthorizedException({ message: 'user not authorized' });
      }

      const user = this.jwtService.verify(token, {
        secret: 'SECRET_KEY',
      });
      req.user = user;
      //todo це підівчити, зрозуміти
      return user.roles.some((role) => requiredRoles.includes(role.value));
    } catch (e) {
      console.log(e);
      throw new HttpException(`No access`, HttpStatus.FORBIDDEN);
    }
  }
}
