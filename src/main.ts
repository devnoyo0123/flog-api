import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = app.get<Logger>(Logger);
  const configService = app.get<ConfigService>(ConfigService);

  const port = configService.get('APP_PORT') || 4000;

  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );
  await app.listen(port, () => {
    logger.log(`Server is listening on port : ${port}`);
  });
}
bootstrap();
