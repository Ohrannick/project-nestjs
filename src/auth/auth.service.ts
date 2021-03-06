import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { compare } from 'src/utils/crypto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) { }

  async validateUser(email: string, pass: string): Promise<any | null> {
    const _user = await this.usersService.findByEmail(email);
    if (_user && (await compare(pass, _user.password))) {
      const { password, ...result } = _user;
      return result;
    }

    return null;
  }

  async login(user: any) {
    const payload = { email: user.username, id: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async verify(token: string) {
    return this.jwtService.verify(token);
  }
  
  async decode(token: string) {
    return this.jwtService.decode(token);
  }
}
