import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import * as cookieParser from 'cookie-parser';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  app.enableCors({
    origin: '*',
    credentials: true,
  });
  app.use(helmet());
  app.use(cookieParser());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('ERP RBAC API')
    .addBearerAuth({
      description: `
        Admin: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6ImFkbWluIiwic3ViIjoxLCJpYXQiOjE3MDE5NTg2ODYsImV4cCI6MTczMzQ5NDY4Nn0.lM3nU7pjnCo9_FRt1--QxkY-RRUMN1vGQ5DXMAUtLww
        Engineer: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6IkVOR0lORUVSIiwic3ViIjoyLCJpYXQiOjE3MDIzMDg5NDYsImV4cCI6MTczMzg0NDk0Nn0.94YUdCvXJS9CLgy5rdHhDF_pYvJIDf_oHxeffbpg5Lk
        Client: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6IkNMSUVOVCIsInN1YiI6MywiaWF0IjoxNzAyMzA4OTgxLCJleHAiOjE3MzM4NDQ5ODF9.LKUFAJd9X-imnDPZQByYS9V8VOU0aZgCoKEOk0_e2BI
        HR: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6IkhSIiwic3ViIjo0LCJpYXQiOjE3MDIzMDkwMDcsImV4cCI6MTczMzg0NTAwN30.TGvNV0jONasxE4-8zHV_Cw_QQEkN3ykRDCRtMCrBvAk
        Manager: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dpbiI6Ik1BTkFHRVIiLCJzdWIiOjUsImlhdCI6MTcwMjMwOTAzNywiZXhwIjoxNzMzODQ1MDM3fQ.R2us6kp97tFKPJnSjzCDmGRLk7ZEXfF5A4P-l63cdVk
        `,
      type: 'http',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(configService.get('APP_PORT'));
}
bootstrap();
