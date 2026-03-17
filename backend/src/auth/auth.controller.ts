import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Tokens } from './types';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto';
import { JwtAuthGuard } from './guards';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  getMe(@Request() req: { user: { userId: number } }) {
    return this.authService.getMe(req.user.userId);
  }

  @Post('login')
  signIn(@Body() dto: LoginDto): Promise<Tokens> {
    return this.authService.signIn(dto);
  }

  @Post('register')
  signUp(@Body() dto: RegisterDto): Promise<Tokens> {
    return this.authService.signUp(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  logout(@Request() req: { user: { userId: number } }) {
    return this.authService.logout(req.user.userId);
  }

  @Post('refresh')
  refreshTokens(@Body() body: { refresh_token: string }): Promise<Tokens> {
    return this.authService.refreshTokens(body.refresh_token);
  }
}
