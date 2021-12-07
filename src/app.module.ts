import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { FamiliesModule } from './modules/families/families.module';
import { PostsModule } from './modules/posts/posts.module';
import { PersonModule } from './modules/person/person.module';
import { CommentsModule } from './modules/comments/comments.module';
import { CryptoModule } from './common/crypto/crypto.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      subscriptions: {
        'subscriptions-transport-ws': true,
      },
      sortSchema: true,
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
    CryptoModule,
    FamiliesModule,
    PostsModule,
    PersonModule,
    CommentsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
