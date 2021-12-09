import { Inject, Injectable } from '@nestjs/common'
import { UsuarioRepo } from '../repository/UsuarioRepo'
import { IPaginationParams } from '../../../custom-decorator/RequestFindParams'
import { UsuarioEntity } from '../repository/database-entity/UsuarioEntity'

@Injectable()
export class UsuarioService {
  constructor(
    @Inject(UsuarioRepo.repoName)
    private readonly userRepo: UsuarioRepo,
  ) {}

  async getUsuarios() {
    return this.userRepo.find()
  }

  async getUsuariosPaged(pagination: IPaginationParams<UsuarioEntity>) {
    return this.userRepo.findWithCount(pagination)
  }

  async insertUser(usuario: UsuarioEntity) {
    const usuarioToSave = this.userRepo.create(usuario)
    return this.userRepo.save(usuarioToSave)
  }

  async updateUser(id: number, usuario: Partial<UsuarioEntity>) {
    const usuarioSaved = await this.userRepo.findOne({
      where: { id },
    })
    if (!usuarioSaved) {
      throw new Error('Registro não encontrado')
    }
    const u = await this.userRepo.create({
      ...usuarioSaved,
      ...usuario,
    })
    await this.userRepo.update({ id }, u)
    return u
  }

  async deleteUser(id: number) {
    return this.userRepo.delete({ id })
  }
}
