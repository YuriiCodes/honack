import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ConfigModule, ConfigService} from "@nestjs/config";
import {SequelizeModule} from "@nestjs/sequelize";
import configValidationSchema from "../../config.schema";

@Module({
  imports: [  ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: [`apps/backend/.env.stage.${process.env.STAGE}`],
    expandVariables: true,
    validationSchema: configValidationSchema,
  }),
    SequelizeModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        dialect: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        models: [
        ],
        autoLoadModels: true,
        synchronize: true,
      }),
    }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
