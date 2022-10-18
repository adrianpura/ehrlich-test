import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
const aes256 = require('aes256');
@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}
  async validateUser(email: string, pass: string): Promise<any> {
    const cipher = aes256.createCipher(process.env.APP_KEY);
    const user = await this.usersService.findOne(email);

    const password = cipher.decrypt(user.password.toString());

    if (user && password === pass) {
      const { ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.userId, roles: user.roles };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
