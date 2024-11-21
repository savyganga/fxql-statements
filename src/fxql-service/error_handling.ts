import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { Response } from 'express';
  import * as responseHelper from './responses';
  
  @Catch()
  export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const status =
        exception instanceof HttpException
          ? exception.getStatus()
          : HttpStatus.INTERNAL_SERVER_ERROR;
  
      const message =
        exception instanceof HttpException
          ? exception.getResponse()
          : 'Internal server error';
  
      const errorMessage =
        typeof message === 'string'
          ? message
          : (message as { message: string }).message || 'Unknown error';
  
      // Use the response helper to structure the error response
      const errorResponse =
        status === HttpStatus.BAD_REQUEST
          ? responseHelper.badRequestErrorNoData(errorMessage)
          : responseHelper.serverError('Server error occurred', errorMessage);
  
      response.status(status).json(errorResponse);
    }
  }
  