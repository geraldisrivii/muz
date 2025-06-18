import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { ProjectValidationPipe } from '~/pipes/pipes.validation';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const env = new ConfigService();

  const config = new DocumentBuilder()
    .setTitle('Testing API')
    .setDescription('API description')
    .setVersion(env.get('APP_VERSION')!)
    .build();

  app.useGlobalPipes(new ProjectValidationPipe());

  app.setGlobalPrefix('api');

   app.enableCors({
    origin: true, // Или конкретные домены ['http://localhost:3000']
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'Accept',
      'Origin',
      'Access-Control-Allow-Headers'
    ],
    credentials: true,
    preflightContinue: false,
    optionsSuccessStatus: 204
  });

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('/api/docs', app, document);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  await app.listen(3002);
}
bootstrap();
