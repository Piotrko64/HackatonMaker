import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Post,
  Session,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from '../user/dtos/create-user.dto';
import { AuthService } from './auth.service';
import { SignInDto } from './dtos/singin.dto';
import { UserDto } from 'src/user/dtos/user.dto';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { AuthEndpointsDataSwagger } from 'src/swagger-data/AuthEndpointsDataSwagger';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @ApiOperation(AuthEndpointsDataSwagger.SignUp.ApiOperation)
  @ApiResponse(AuthEndpointsDataSwagger.SignUp.ApiResponse)
  async signup(@Body() body: CreateUserDto): Promise<UserDto> {
    const user = await this.authService.signup(body);
    return new UserDto({ ...user });
  }

  @Post('signin')
  @ApiOperation(AuthEndpointsDataSwagger.SignIn.ApiOperation)
  @ApiResponse(AuthEndpointsDataSwagger.SignIn.ApiResponse)
  async signin(@Body() body: SignInDto, @Session() session: any) {
    const user = await this.authService.signin(body.email, body.password);
    session.email = user.email;

    return new UserDto(user);
  }

  @Get('/whoami')
  @UseGuards(AuthGuard)
  @ApiOperation(AuthEndpointsDataSwagger.Whoami.ApiOperation)
  @ApiResponse(AuthEndpointsDataSwagger.Whoami.ApiResponse)
  whoami(@CurrentUser() user: UserDto) {
    return new UserDto(user);
  }

  @Delete('/signout')
  @ApiOperation(AuthEndpointsDataSwagger.Logout.ApiOperation)
  @ApiResponse(AuthEndpointsDataSwagger.Logout.ApiResponse)
  signout(@Session() session: any) {
    session.email = null;
  }
}
