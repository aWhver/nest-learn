import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from 'libs/db/src';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './guard';
import { FileModule } from './file/file.module';
const AuthProvider = {
  provide: APP_GUARD,
  useClass: AuthGuard,
};
@Module({
  imports: [DbModule, UserModule, AuthModule, FileModule],
  controllers: [AppController],
  providers: [AppService, AuthProvider],
})
export class AppModule {}
