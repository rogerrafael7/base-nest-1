import { Inject, Injectable } from '@nestjs/common'
import { ProjetoRepo } from '../repository/ProjetoRepo'

@Injectable()
export class ProjetoService {
  constructor(
    @Inject(ProjetoRepo.repoName)
    private readonly projetoRepo: ProjetoRepo,
  ) {}

  async getProjetos() {
    return this.projetoRepo.find()
  }

  async getOneProjeto(id: number) {
    return this.projetoRepo.findOne({ where: { id } })
  }
}
