import { JwtService } from '@nestjs/jwt';
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { jwtConstants } from 'src/auth/constant';
import { Reflector } from '@nestjs/core';
import { PUBLIC_KEY } from 'src/global';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext) {
    /** 全局守卫下的指定路由跳过验证 start */
    const isSKipAuth = this.reflector.getAllAndOverride(PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isSKipAuth) {
      return true;
    }
    /** 全局守卫下的指定路由跳过验证 end */
    const http = context.switchToHttp();
    const req = http.getRequest();
    const token = this.getToken(req);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      // req['user'] = payload;
    } catch {
      throw new UnauthorizedException('token失效，请重新登录');
    }
    return true;
  }

  getToken(req: Request): string {
    // console.log('req.headers', req.headers);
    const [type, token] = req.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
