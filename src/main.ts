import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

const port = process.env.SERVER_PORT || 3000;
const isProd = process.env.STAGE === 'prod';
console.log('port', port, process.env.STAGE);
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  !isProd && app.setGlobalPrefix('api');
  app.enableVersioning();
  app.enableCors();
  app.use(
    session({
      secret: 'tong',
      cookie: {
        maxAge: 100000,
      },
    }),
  );
  // 设置模版引擎和其引用资源位置
  app.useStaticAssets(join(__dirname, '../..', 'public'));
  app.setBaseViewsDir(join(__dirname, '../..', 'views'));
  app.setViewEngine('hbs');
  await app.listen(port);
}
bootstrap();
