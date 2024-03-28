import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ContentType, SwaggerTags } from 'src/common/enums';
import { AuthDTo } from './dto';
import { Response } from 'express';

@Controller('auth')
@ApiTags(SwaggerTags.AUTHORIZATION)
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({summary:" login and rehgister"})
  @HttpCode(HttpStatus.OK)
  @Post('user-existence')
  @ApiConsumes(ContentType.URL_ENCODED,ContentType.JSON)
  userExistence(@Body() AuthDTo:AuthDTo,@Res() res:Response){
    return this.authService.userExistence(AuthDTo,res);
  }
}
