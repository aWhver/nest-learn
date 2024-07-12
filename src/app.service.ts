import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World! tong1';
  }

  getViewName(): string {
    return 'user';
  }
}
