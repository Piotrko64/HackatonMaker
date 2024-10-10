import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

type ResponseObj = {
  statusCode: number;
  timestamp: string;
  path: string;
  message: string | object;
};

@Catch(HttpException)
export class AllExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const responseObj: ResponseObj = {
      statusCode: response.statusCode,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: '',
    };

    if (exception instanceof HttpException) {
      responseObj.statusCode = exception.getStatus();
      responseObj.message = exception.message;
    } else {
      responseObj.statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
      responseObj.message = 'Internal Server Error';
    }

    response.status(responseObj.statusCode).json(responseObj);
  }
}
