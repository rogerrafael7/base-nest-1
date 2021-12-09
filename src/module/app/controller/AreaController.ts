import { Body, Controller, Get, Post } from '@nestjs/common'
import { AreaService } from '../service/AreaService'
import { AreaEntity } from '../repository/database-entity/AreaEntity'

@Controller('areas')
export class AreaController {
  constructor(private readonly areaService: AreaService) {}

  @Get()
  getAreas() {
    return this.areaService.getAreas()
  }

  @Post()
  async insertArea(@Body() area: AreaEntity) {
    return this.areaService.insertArea(area)
  }
}
