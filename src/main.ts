import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const port = process.env.SERVER_PORT || 3000;
const isProd = process.env.STAGE === 'prod';
console.log('port', port, process.env.STAGE);
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  !isProd && app.setGlobalPrefix('api');
  app.enableVersioning();
  app.enableCors();
  await app.listen(port);
}
bootstrap();
