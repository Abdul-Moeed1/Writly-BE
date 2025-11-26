import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { createUserDTO } from './DTOs/createUser.dto';
import { logInDTO } from './DTOs/logIn.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  createUser(@Body() createUserDTO: createUserDTO) {
    return this.authService.createUser(createUserDTO);
  }

  @Post('login')
  login(@Body() logInDTO: logInDTO) {
    return this.authService.logIn(logInDTO);
  }
}
