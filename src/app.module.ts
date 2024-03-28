import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmDbConfig } from './config';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmDbConfig,
      inject: [TypeOrmDbConfig],
    }),
    UserModule,
    AuthModule,
  ],
  providers: [TypeOrmDbConfig],
})
export class AppModule {}
