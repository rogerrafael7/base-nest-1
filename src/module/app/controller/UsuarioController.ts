import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common'
import { UsuarioService } from '../service/UsuarioService'
import { IPaginationParams, RequestFindParams } from '../../../custom-decorator/RequestFindParams'
import { UsuarioEntity } from '../repository/database-entity/UsuarioEntity'
import { Put } from '@nestjs/common'

@Controller('usuarios')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Get()
  getUsuarios() {
    return this.usuarioService.getUsuarios()
  }

  @Get('/pages')
  getUsuariosPaginated(@RequestFindParams() pagination: IPaginationParams<UsuarioEntity>) {
    return this.usuarioService.getUsuariosPaged(pagination)
  }

  @Post()
  insertUser(@Body() user: UsuarioEntity) {
    return this.usuarioService.insertUser(user)
  }

  @Put(':id')
  updateUser(@Param('id') id: number, @Body() user: UsuarioEntity) {
    return this.usuarioService.updateUser(id, user)
  }

  @Delete(':id')
  deleteUsuario(@Param(':id') id: number) {
    return this.usuarioService.deleteUser(id)
  }
}
