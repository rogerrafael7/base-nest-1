import { EntityRepository } from 'typeorm'
import { AreaEntity } from './database-entity/AreaEntity'
import { RepoBase } from '../../../base/RepoBase'

@EntityRepository(AreaEntity)
export class AreaRepo extends RepoBase<AreaEntity> {
  static readonly repoName = 'AREA_REPO'
}
