import { RepoBase } from '../../../base/RepoBase'
import { ProjetoEntity } from './database-entity/ProjetoEntity'
import { EntityRepository } from 'typeorm'

@EntityRepository(ProjetoEntity)
export class ProjetoRepo extends RepoBase<ProjetoEntity> {
  static readonly repoName = 'PROJETO'
}
