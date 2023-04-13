import { Controller, Get, Post, Body, Request, UseGuards, HttpCode } from "@nestjs/common";
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { ForgotPasswordDto } from "./dto/forgot-password.dto";

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/register')
  create(@Body() createAuthDto: CreateUserDto) {
    return this.authService.create(createAuthDto);
  }


  @UseGuards(AuthGuard('jwt'))
  @Get('/me')
  getMe(@Request() req) {
    return req.user;
  }


  @Post('/password/forgot')
  forgotPassword(@Body() forgotPasswordDto: ForgotPasswordDto) {
    return this.authService.forgotPassword(forgotPasswordDto);
  }


  @UseGuards(AuthGuard('local'))
  @Post('/login')
  @HttpCode(200)
  login(@Request() req) {
    return this.authService.login(req.user);
  }
}
