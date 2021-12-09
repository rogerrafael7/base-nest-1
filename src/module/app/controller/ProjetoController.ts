import { Controller, Get } from '@nestjs/common'
import { ProjetoService } from '../service/ProjetoService'

@Controller('projetos')
export class ProjetoController {
  constructor(private readonly projetoService: ProjetoService) {}

  @Get()
  getProjetos() {
    return this.projetoService.getProjetos()
  }
}
