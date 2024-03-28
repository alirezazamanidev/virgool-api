import {
  BadRequestException,
  ConflictException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthDTo } from './dto';
import { AuthMethod, AuthType } from './enums';
import { isEmail, isMobilePhone } from 'class-validator';
import { OtpEntity, UserEntity } from '../user/entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Code, Repository } from 'typeorm';
import {
  AuthMessage,
  BadRequestMessage,
  CookieKeys,
  PublicMessage,
} from 'src/common/enums';
import { randomInt } from 'crypto';
import { TokenService } from './token.service';
import { AuthResponse } from './types';
import { Response } from 'express';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(OtpEntity) private otpRepoistory: Repository<OtpEntity>,
    private TokenServive: TokenService,
  ) {}
  async userExistence(AuthDTo: AuthDTo, res: Response) {
    const { method, type, username } = AuthDTo;
    let result: AuthResponse;
    switch (type) {
      case AuthType.Login:
        return this.login(method, username);
      case AuthType.Register:
        result = await this.register(method, username);
        return this.sendResponse(res, result);
      default:
        throw new UnauthorizedException();
    }
  }
  async login(method: AuthMethod, username: string) {}
  async register(method: AuthMethod, username: string) {
    const validUsername = this.usernameValidator(method, username);
    let user: UserEntity = await this.checkExistUser(method, validUsername);
    if (user) throw new ConflictException(AuthMessage.AlreadyExistAccount);
    if (method === AuthMethod.Username)
      throw new BadRequestException(BadRequestMessage.InValidRegisterData);
    user = this.userRepository.create({
      [method]: username,
    });
    user = await this.userRepository.save(user);
    user.username = `m_${user.id}`;
    await this.userRepository.save(user);
    const otp = await this.saveOtp(user.id);
    const token = this.TokenServive.createOtpToken({ userId: user.id });
    return {
      token,
      code: otp.code,
    };
  }

  // private method
  private async sendResponse(res: Response, result: AuthResponse) {
    const { token, code } = result;
    res.cookie(CookieKeys.Otp, token, {
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 60 * 2),
    });
    res.status(200).json({
      statusCode: HttpStatus.OK,
      message: PublicMessage.SentOtp,
      data: {
        code,
      },
    });
  }
  private async saveOtp(userId: number) {
    const code = randomInt(10000, 99999).toString();
    const expiresIn = new Date(Date.now() + 1000 * 60 * 2);
    let otp = await this.otpRepoistory.findOneBy({ userId });
    let existOtp = false;
    if (otp) {
      existOtp = true;
      otp.code = code;
      otp.expiresIn = expiresIn;
    } else {
      existOtp = false;
      otp = this.otpRepoistory.create({
        code,
        expiresIn,
        userId,
      });
    }
    otp = await this.otpRepoistory.save(otp);
    if (!existOtp) {
      await this.userRepository.update(
        { id: userId },
        {
          otpId: otp.id,
        },
      );
    }
    return otp;
  }
  private async checkExistUser(method: AuthMethod, username: string) {
    let user: UserEntity;
    if (method === AuthMethod.Phone) {
      user = await this.userRepository.findOneBy({ phone: username });
    } else if (method === AuthMethod.Email) {
      user = await this.userRepository.findOneBy({ email: username });
    } else if (method === AuthMethod.Username) {
      user = await this.userRepository.findOneBy({ username });
    } else {
      throw new BadRequestException(BadRequestMessage.InValidLoginData);
    }
    return user;
  }
  private usernameValidator(method: AuthMethod, username: string) {
    switch (method) {
      case AuthMethod.Email:
        if (isEmail(username)) return username;
        throw new BadRequestException('Email format is incorrect');
      case AuthMethod.Phone:
        if (isMobilePhone(username, 'fa-IR')) return username;
        throw new BadRequestException('mobile number incorrect');
      case AuthMethod.Username:
        return username;
      default:
        throw new UnauthorizedException('username data is not valid');
    }
  }
}
