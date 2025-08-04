import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(username: string, password: string) {
    if (username === 'admin' && password === 'admin@123') {
      const payload = { username, role: 'admin' };
      return {
        access_token: this.jwtService.sign(payload),
        user: { username, role: 'admin' },
      };
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async validateToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }
}