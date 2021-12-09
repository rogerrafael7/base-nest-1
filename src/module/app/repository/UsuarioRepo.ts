import { EntityRepository } from 'typeorm'
import { UsuarioEntity } from './database-entity/UsuarioEntity'
import { RepoBase } from '../../../base/RepoBase'

@EntityRepository(UsuarioEntity)
export class UsuarioRepo extends RepoBase<UsuarioEntity> {
  static readonly repoName = 'USUARIO_REPO'
}
