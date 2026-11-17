import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module.js';
import { ConfigService } from '@nestjs/config';
import { clerkMiddleware } from '@clerk/express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  const frontendUrl = config.get<string>(
    'FRONTEND_URL',
    'http://localhost:5173',
  );

  app.use(
    clerkMiddleware({
      publishableKey: config.getOrThrow<string>('CLERK_PUBLISHABLE_KEY'),
      secretKey: config.getOrThrow<string>('CLERK_SECRET_KEY'),
      authorizedParties: [frontendUrl],
    }),
  );
  app.enableCors({ origin: frontendUrl });
  await app.listen(config.get<string>('PORT', '3000'));
}
await bootstrap();
