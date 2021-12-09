import { HttpStatus } from '@nestjs/common'
import { TypeErrorException } from '../base/TypeErrorException'
import { CustomExceptionError, CustomHttpException } from '../base/CustomExceptionError'

export enum REQUEST_TYPE_ERROR {
  MUST_BE_JSON_STRING = 'The value for this param must be a string with JSON format',
  MUST_BE_ARRAY_JSON_STRING = 'The value for this param must be a string with Array JSON format',
  MUST_BE_NUMBER = 'The value for this param must be a number',
  MUST_BE_STRING = 'The value for this param must be a string',
  FORMAT_INVALID = 'The value in this param is no valid format',
  NO_MESSAGE = '-',
}

export const throwExceptionRequired = (paramName: string): never => {
  throw new CustomHttpException(`The param: "${paramName}" is required`, HttpStatus.BAD_REQUEST)
}
export const throwExceptionParam = (paramName: string, typeError?: REQUEST_TYPE_ERROR): never => {
  throw new CustomHttpException(`Error on param: "${paramName}". Details: ${typeError || '-'}`, HttpStatus.BAD_REQUEST)
}
export const throwHttpExceptionUnauthenticated = (): never => {
  throw new CustomHttpException('Only authenticated users has that privileges', HttpStatus.FORBIDDEN)
}
export const throwOktaTokenAccessException = (): never => {
  throw new CustomHttpException('Token access', HttpStatus.UNAUTHORIZED)
}
export const throwHttpExceptionUnauthorized = (): never => {
  throw new CustomHttpException('You need have privileges for this', HttpStatus.UNAUTHORIZED)
}
export const throwCustomHttpException = (message: string, statusCode: HttpStatus): never => {
  throw new CustomHttpException(`Error message: ${message}`, statusCode)
}
export const throwRegistryNotFound = (registryIdentifier?: string): never => {
  throw new CustomHttpException(`Error message: registry ${registryIdentifier} not found`, HttpStatus.NOT_FOUND)
}
export const throwRegistryAlreadyExists = (): never => {
  throw new CustomHttpException('Error message: registry already exists', HttpStatus.CONFLICT)
}
export const throwCustomException = (message: string, type: TypeErrorException): never => {
  throw new CustomExceptionError(`Error message: ${message}`, type)
}
