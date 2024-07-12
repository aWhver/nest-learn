import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from 'libs/db/src';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guard';
import { FileModule } from './file/file.module';
import IndexModule from './template-engine/index.module';
import IndexController from './template-engine/index.controller';
import { AaaController } from './aaa.controller';
const AuthProvider = {
  provide: APP_GUARD,
  useClass: AuthGuard,
};
@Module({
  imports: [DbModule, UserModule, AuthModule, FileModule],
  controllers: [AppController, IndexController, AaaController],
  providers: [AppService, AuthProvider],
  // exports: [AppService],
})
export class AppModule {}
