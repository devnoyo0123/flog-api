import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { CryptoModule } from './common/crypto/crypto.module';
import { PostsModule } from './modules/posts.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpResponseInterceptor } from './common/interceptor/http-response.interceptor';
import { AllExceptionsFilter } from './common/exception/exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        namingStrategy: new SnakeNamingStrategy(),
        synchronize: true,
        logging: ['query', 'log', 'info', 'error'],
        host: configService.get<string>('POSTGRES_HOST_MASTER') || 'localhost',
        port:
          parseInt(configService.get<string>('POSTGRES_PORT_MASTER'), 10) ||
          5432,
        username:
          configService.get<string>('POSTGRES_USER_MASTER') || 'postgres',
        password: configService.get<string>('POSTGRES_PASSWORD_MASTER') || '',
        database:
          configService.get<string>('POSTGRES_DATABASE_NAME') || 'graphql',
      }),
      inject: [ConfigService],
    }),
    PostsModule,
    CryptoModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    Logger,
    ConfigService,
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
