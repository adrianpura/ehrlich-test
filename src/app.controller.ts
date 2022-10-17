import { Controller, Get, Request, UseGuards, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './modules/auth/auth.service';
import { ApiBody, ApiOkResponse, ApiUnauthorizedResponse, ApiTags } from '@nestjs/swagger';

import { LoginUserDto } from './modules/users/dto/login.dto';
import { LocalAuthGuard } from './modules/auth/local-auth.guard';
@ApiTags('Login')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @ApiOkResponse({ description: 'User Login' })
  @ApiBody({ type: LoginUserDto })
  @ApiUnauthorizedResponse({ description: 'Invalid Credentials' })
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
