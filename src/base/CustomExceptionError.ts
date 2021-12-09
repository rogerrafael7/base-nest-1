import { TypeErrorException } from './TypeErrorException'
import { HttpException, HttpStatus } from '@nestjs/common'

export class CustomExceptionError extends Error {
  type: TypeErrorException
  constructor(message: string, type?: TypeErrorException) {
    super(message)
    this.type = type
  }
}

export class CustomHttpException extends HttpException {
  httpCode: HttpStatus
  constructor(message: string, httpCode: HttpStatus = HttpStatus.BAD_REQUEST) {
    super(message, httpCode)
    this.httpCode = httpCode
  }
}
