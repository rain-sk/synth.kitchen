import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SupertokensExceptionFilter } from './auth/auth.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new SupertokensExceptionFilter());
  await app.listen(8000);
}
bootstrap();
