import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.setGlobalPrefix('api/v1');

  const config = new DocumentBuilder()
    .setTitle('Image API')
    .setDescription('24 Hour NestJS API Challenge / Project')
    .setVersion('1.0')
    .addTag('images')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.use(helmet());
  app.enableCors();
  app.useGlobalPipes(
    /**
     * Reference: https://docs.nestjs.com/techniques/validation#auto-validation
     */
    new ValidationPipe({
      // Make sure that there's no unexpected data
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,

      /**
       * Detailed error messages since this is 4xx
       */
      disableErrorMessages: false,

      validationError: {
        /**
         * WARNING: Avoid exposing the values in the error output (could leak sensitive information)
         */
        value: false,
      },

      /**
       * Transform the JSON into a class instance when possible.
       * Depends on the type of the data on the controllers
       */
      transform: true,
    }),
  );
  const port = configService.get('PORT');
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
