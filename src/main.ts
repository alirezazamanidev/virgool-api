import './config/env.config'
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import SwaggerConfig from './config/swagger.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const {PORT}=process.env;

  app.setGlobalPrefix('api');
  SwaggerConfig(app);
  await app.listen(PORT,()=>{
    console.log(`run => http://localhost:${PORT}/api`);
    console.log(`run swagger => http://localhost:${PORT}/swagger`);
    
  });
}
bootstrap();
