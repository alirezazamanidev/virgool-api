import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { CookiePayload } from "./types";


@Injectable()
export class TokenService {

    constructor(private JwtService:JwtService){}

    createOtpToken(payload:CookiePayload){
        const otpToken=this.JwtService.sign(payload,{
            secret:process.env.OTP_TOKEN_SECRET,
            expiresIn: 60 * 2,
            
        });
        return otpToken;
    }

}