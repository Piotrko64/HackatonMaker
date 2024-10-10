import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  Post,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { CreateApplicationDto } from './dtos/create-application.dto';
import { ApplicationService } from './application.service';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { DeleteApplicationDto } from './dtos/delete-application.dto';
import { EditApplicationDto } from './dtos/edit-application.dto';
import { AuthGuard } from './../guards/auth.guard';
import { ApplicationsEndpointsDataSwagger } from 'src/swagger-data/ApplicationsEndpointsDataSwagger';

@Controller('applications')
@UseGuards(AuthGuard)
export class ApplicationController {
  constructor(private applicationService: ApplicationService) {}

  @Post('')
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation(ApplicationsEndpointsDataSwagger.Post.ApiOperation)
  @ApiResponse(ApplicationsEndpointsDataSwagger.Post.ApiResponse)
  @ApiBody(ApplicationsEndpointsDataSwagger.Post.ApiBody)
  @UseInterceptors(ClassSerializerInterceptor)
  async addApplication(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: '.pdf',
        })
        .build({
          errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
        }),
    )
    file,
    @Body(ValidationPipe) application: CreateApplicationDto,
  ) {
    return this.applicationService.createApplication(application, file);
  }

  @Get('')
  @ApiOperation(ApplicationsEndpointsDataSwagger.Get.ApiOperation)
  @ApiResponse(ApplicationsEndpointsDataSwagger.Get.ApiResponse)
  async getAllAplications() {
    return this.applicationService.getAllApplications();
  }
  @Delete('')
  @ApiOperation(ApplicationsEndpointsDataSwagger.Delete.ApiOperation)
  @ApiResponse(ApplicationsEndpointsDataSwagger.Delete.ApiResponse)
  async deleteApplication(@Body(ValidationPipe) body: DeleteApplicationDto) {
    return this.applicationService.deleteApplication(body.id);
  }

  @Put(':id')
  @ApiOperation(ApplicationsEndpointsDataSwagger.Put.ApiOperation)
  @ApiResponse(ApplicationsEndpointsDataSwagger.Put.ApiResponse)
  async editApplication(
    @Param('id') id: number,
    @Body() body: EditApplicationDto,
  ) {
    return this.applicationService.editApplication(id, body);
  }
}
