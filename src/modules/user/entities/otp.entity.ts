import { BaseEntity } from "src/common/abstracts";
import { Column, Entity, OneToOne } from "typeorm";
import { UserEntity } from "./user.entity";
import { EntityName } from "src/common/enums";

@Entity({name:EntityName.Otp})
export class OtpEntity extends BaseEntity{
    @Column()
    code:string
    @Column()
    expiresIn:Date
    @Column()
    userId:number
    @OneToOne(()=>UserEntity,user=>user.otp,{onDelete:'CASCADE'})
    user:UserEntity
}