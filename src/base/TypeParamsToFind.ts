import { TypeKeysOf } from './TypeGeneric'
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions'

interface B<T> extends FindManyOptions<T> {
  where: TypeKeysOf<T>
  skip: number
  take: number
}

export type TypeParamsToFind<T> = Partial<B<T>>
