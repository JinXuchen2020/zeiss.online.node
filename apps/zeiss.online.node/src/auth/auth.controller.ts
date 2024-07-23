import { Body, Controller, Get, HttpCode, HttpStatus, Post, UseGuards, Request, UseInterceptors, UseFilters } from '@nestjs/common';
import { AuthService } from './auth.service';
import { TokenDto } from './dto/token.dto';
import { AuthGuard } from './auth.guard';
import { MapInterceptor } from '@automapper/nestjs';
import { User } from '../users/entities/user.entity';
import { UserDto } from '../users/dto/user.dto';
import { SkipAuth } from './skipAuth.decorator';
import { SignInDto } from './dto/signIn.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiBearerAuth()
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @SkipAuth()
  signIn(@Body() signInDto: SignInDto) : Promise<TokenDto> {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  @UseInterceptors(MapInterceptor(User, UserDto))
  getProfile(@Request() req) : Promise<UserDto> {
    return req.user;
  }
}
