import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OtpEntity, UserEntity } from './entities';

@Module({
    imports:[TypeOrmModule.forFeature([UserEntity,OtpEntity])],
    exports:[TypeOrmModule]
})
export class UserModule {}
