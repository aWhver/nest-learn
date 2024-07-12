import { HttpException, Injectable, Logger } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as crypto from 'crypto';

function md5(str): string {
  const hash = crypto.createHash('md5');
  hash.update(str);
  return hash.digest('hex');
}

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  private logger = new Logger();

  async sign(username: string, pwd: string) {
    const user = await this.userService.findOneBy(username);
    if (!user) {
      throw new HttpException('用户不存在', 200);
    }
    console.log('md5(pwd)', md5(pwd));
    console.log('user.password', user);
    if (user.password !== md5(pwd)) {
      throw new HttpException('密码错误', 200);
    }
    const payload = { sub: user.id, username: user.userName };
    const token = await this.jwtService.signAsync(payload);
    return {
      access_token: token,
    };
  }

  async register(username: string, pwd: string) {
    const res = await this.userService.findOneBy(username);
    if (res) {
      throw new HttpException('该用户已存在', 200);
    }
    try {
      await this.userService.create({
        userName: username,
        password: md5(pwd),
      });

      return '注册成功';
    } catch (error) {
      this.logger.error(error, this.userService);
      return '注册失败';
    }
  }
}
