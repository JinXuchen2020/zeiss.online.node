import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { TokenDto } from './dto/token.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async signIn(username: string, pass: string): Promise<TokenDto> {
      const user = await this.usersService.findOneByPhoneNumber(username);
      if (user?.password !== pass) {
        throw new UnauthorizedException();
      }
     
      const payload = { sub: user.id, username: user.phoneNumber };
      return {
        access_token: await this.jwtService.signAsync(payload),
      };
    }
}
