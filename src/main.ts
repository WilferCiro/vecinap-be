import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AnyExceptionFilter } from './common/exception/filters/any-exception.filter';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import fastifyCookie from '@fastify/cookie';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: false }),
    { bufferLogs: true },
  );
  const configService = app.get(ConfigService)

  // Prefix
  app.setGlobalPrefix('api/v1');

  // Pipes
  app.useGlobalPipes(new ValidationPipe());

  // Filters
  app.useGlobalFilters(new AnyExceptionFilter());

  // Cookies
  await app.register(fastifyCookie, {
    secret: configService.get<string>('COOKIE_SECRET'),
  });

  // Cors
  app.enableCors({
    origin: [
      'http://localhost:3000',
    ],
    credentials: true,
  })

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Vecinapp doc')
    .setVersion('1')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(configService.get<number>('APP_PORT', 3000), '0.0.0.0');
}
bootstrap();
