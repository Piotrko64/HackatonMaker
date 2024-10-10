import { FileDto } from './dtos/file.dto';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  HttpStatus,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { CreateFileDto } from './dtos/create-file.dto';
import { DeleteFileDto } from './dtos/delete-file.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { FilesEndpointsDataSwagger } from 'src/swagger-data/FilesEndpointsDataSwagger';

@Controller('files')
@UseGuards(AuthGuard)
export class FilesController {
  constructor(private filesService: FilesService) {}
  @Post('upload')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseInterceptors(FileInterceptor('file'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation(FilesEndpointsDataSwagger.Post.ApiOperation)
  @ApiResponse(FilesEndpointsDataSwagger.Post.ApiResponse)
  @ApiBody(FilesEndpointsDataSwagger.Post.ApiBody)
  async uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: '.pdf',
        })
        .build({
          errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
        }),
    )
    file: Express.Multer.File,
    @Body(ValidationPipe) body: CreateFileDto,
  ) {
    return new FileDto(
      await this.filesService.uploadFile(file, +body.applicationId),
    );
  }

  @Delete('')
  @ApiOperation(FilesEndpointsDataSwagger.Delete.ApiOperation)
  @ApiResponse(FilesEndpointsDataSwagger.Delete.ApiResponse)
  async deleteApplication(@Body(ValidationPipe) body: DeleteFileDto) {
    return this.filesService.deleteFile(body.id);
  }
}
