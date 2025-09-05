import { Body, Controller, Get, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { createUserDTO } from './DTOs/createUser.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('login')
  getHello() {
    return 'user logged in';
  }

  @Post('signup')
  createUser(@Body() createUserDTO: createUserDTO) {
    return this.authService.createUser(createUserDTO);
  }
}
