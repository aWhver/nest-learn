import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module, Global } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [`.env.stage.${process.env.STAGE}`, '.env.stage.default'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (ConfigService: ConfigService) => ({
        type: 'mysql',
        host: ConfigService.get('HOST'),
        port: ConfigService.get('DB_PORT'),
        password: ConfigService.get('DB_PASSWORD'),
        username: ConfigService.get('DB_USERNAME'),
        database: ConfigService.get('DB_DATABASE'),
        synchronize: ConfigService.get('DB_SYNC'),
        autoLoadEntities: true,
      }),
    }),
  ],
})
export class DbModule {}
