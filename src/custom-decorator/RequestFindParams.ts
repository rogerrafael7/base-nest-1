import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { REQUEST_TYPE_ERROR, throwExceptionParam } from '../helper/exception'
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions'
import { TypeParamsToFind } from '../base/TypeParamsToFind'
import { isNumber } from '../helper/util'

export interface IQueryParams {
  validate?: boolean
}

export interface IPaginationParams<E> extends FindManyOptions<E> {
  where: Partial<E>
}

export const RequestFindParams = createParamDecorator(
  ({ validate = true }: IQueryParams = {}, ctx: ExecutionContext): TypeParamsToFind<any> => {
    const request = ctx.switchToHttp().getRequest()
    // eslint-disable-next-line prefer-const
    let { where, skip = 0, take = 50, order }: any = request.query // só está validando para GET

    if (validate) {
      if (skip && !isNumber(skip)) {
        throwExceptionParam('skip', REQUEST_TYPE_ERROR.MUST_BE_NUMBER)
      }
      if (take && !isNumber(take)) {
        throwExceptionParam('take', REQUEST_TYPE_ERROR.MUST_BE_NUMBER)
      }
      if (where) {
        try {
          // if (typeof where !== 'string' || !/^[\[{].*[\]}]$/m.test(where)) {
          //   throwExceptionParam('where', REQUEST_TYPE_ERROR.MUST_BE_JSON_STRING)
          // }
          where = JSON.parse(where)
        } catch (error) {
          throwExceptionParam('where', REQUEST_TYPE_ERROR.MUST_BE_JSON_STRING)
        }
      }
    }

    return {
      order,
      where: where || {},
      take,
      skip,
    }
  },
)
