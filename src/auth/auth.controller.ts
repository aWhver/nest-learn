import { Controller, Post, Param, Body, Get, Session } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { skipAuth } from 'src/global';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // 全局定义守卫时，使用自定义装饰器对单个路由放开守卫
  @skipAuth()
  @Post('login')
  signIn(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.sign(createAuthDto.username, createAuthDto.pwd);
  }

  @skipAuth()
  @Post('register')
  // register(@Param('username') username: string, @Param('pwd') pwd: string) {
  register(@Body() createAuthDto: CreateAuthDto) {
    return this.authService.register(createAuthDto.username, createAuthDto.pwd);
  }

  @skipAuth()
  @Get('session')
  session(@Session() session) {
    console.log('session', session);
    // return
    if (!session.count) {
      session.count = 0;
    }
    return ++session.count;
  }
}
