import { Controller, Get, Request, UseGuards, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './modules/auth/auth.service';
import { ApiBody, ApiOkResponse, ApiUnauthorizedResponse, ApiTags } from '@nestjs/swagger';

import { LoginUserDto } from './modules/users/dto/login.dto';
import { HasRoles } from './modules/auth/decorators/has-roles.decorator';
import { Role } from './modules/users/role.enum';
import { RolesGuard } from './modules/auth/guards/roles.guard';
import { LocalAuthGuard } from './modules/auth/guards/local-auth.guard';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
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

  @HasRoles(Role.Admin)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('admin')
  onlyAdmin(@Request() req) {
    return req.user;
  }

  @HasRoles(Role.User)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Get('user')
  onlyUser(@Request() req) {
    return req.user;
  }
}
