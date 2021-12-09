import { Inject, Injectable } from '@nestjs/common'
import { AreaRepo } from '../repository/AreaRepo'
import { AreaEntity } from '../repository/database-entity/AreaEntity'

@Injectable()
export class AreaService {
  constructor(
    @Inject(AreaRepo.repoName)
    private readonly areaRepo: AreaRepo,
  ) {}

  async getAreas() {
    return this.areaRepo.find()
  }

  async insertArea(area: AreaEntity): Promise<AreaEntity> {
    const areaToSave = this.areaRepo.create(area)
    return this.areaRepo.save(areaToSave)
  }
}
