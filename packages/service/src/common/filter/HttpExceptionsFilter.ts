import { Catch, HttpException, ExceptionFilter, ArgumentsHost, Logger } from '@nestjs/common';
import { isArray, isEmpty, isString } from 'lodash';
import { ResultData } from '../utils/result';

@Catch(HttpException)
export class HttpExceptionsFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();
    let msg = 'Service Error';
    if (exception.message) {
      msg = exception.message;
    }
    if (exceptionResponse?.message) {
      if (isArray(exceptionResponse.message) && !isEmpty(exceptionResponse.message)) {
        msg = exceptionResponse.message[0];
      } else if (isString(exceptionResponse.message)) {
        msg = exceptionResponse.message;
      }
    }
    Logger.error(exceptionResponse, exception.stack, 'HttpExceptionsFilter');
    response.status(status).json(ResultData.fail(status, msg));
  }
}
