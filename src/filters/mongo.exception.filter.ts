import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { MongoServerError } from 'mongodb';

@Catch(MongoServerError)
export class MongooseExceptionFilter implements ExceptionFilter {
  catch(exception: MongoServerError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    let status = 500;
    let message = 'Internal Server Error';

    if (exception.code === 11000) {
      status = 400;

      const field = Object.keys(exception.keyPattern)[0];
      message = `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
    } else {
      console.log(exception.message);
    }
    response.status(status).json({
      path: request.url,
      message,
      statusCode: status,
      timestamp: new Date().toISOString(),
    });
  }
}
