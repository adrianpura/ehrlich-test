import { UseGuards } from '@nestjs/common';
import { Controller, Get, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './modules/auth/auth.service';
import { LocalAuthGuard } from './modules/auth/local-auth.guard';
import { ApiBody, ApiOkResponse, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { LoginUserDto } from './modules/users/dto/login.dto';
import { Post } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private authService: AuthService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @ApiOkResponse({ description: 'User Login' })
  @ApiBody({ type: LoginUserDto })
  @ApiUnauthorizedResponse({ description: 'Invalid Credentials' })
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }
}
