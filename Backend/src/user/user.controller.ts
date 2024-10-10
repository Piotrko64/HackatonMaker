import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ParseIntPipe, ValidationPipe } from '@nestjs/common/pipes';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserDto } from './dtos/user.dto';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserEndpointsSwaggerData } from 'src/swagger-data/UserEndpointsSwaggerData';

@UseInterceptors(ClassSerializerInterceptor)
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('/list')
  @ApiOperation(UserEndpointsSwaggerData.List.ApiOperation)
  @ApiResponse(UserEndpointsSwaggerData.List.ApiResponse)
  getAllUser() {
    return this.userService.getAllUser();
  }

  @Get('/list/:id')
  @ApiOperation(UserEndpointsSwaggerData.UserById.ApiOperation)
  @ApiResponse(UserEndpointsSwaggerData.UserById.ApiResponse)
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    return new UserDto(await this.userService.getUser(id));
  }

  @Post('/addUser')
  @ApiOperation(UserEndpointsSwaggerData.AddUser.ApiOperation)
  @ApiResponse(UserEndpointsSwaggerData.AddUser.ApiResponse)
  async addUser(@Body(ValidationPipe) user: CreateUserDto) {
    return new UserDto(await this.userService.addUser(user));
  }
}
