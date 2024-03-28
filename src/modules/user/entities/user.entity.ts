import { BaseEntity } from 'src/common/abstracts';
import { EntityName } from 'src/common/enums';
import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';
import { OtpEntity } from './otp.entity';

@Entity({ name: EntityName.User })
export class UserEntity extends BaseEntity {
  @Column({ unique: true, nullable: true })
  username: string;
  @Column({ unique: true, nullable: true })
  phone: string;
  @Column({ unique: true, nullable: true })
  email: string;
  @Column({ nullable: true })
  password: string;
  @Column({nullable: true})
  otpId: number;
  @OneToOne(() => OtpEntity, otp => otp.user, {nullable: true})
  @JoinColumn()
  otp: OtpEntity
}
