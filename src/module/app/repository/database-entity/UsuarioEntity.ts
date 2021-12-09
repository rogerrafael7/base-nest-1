import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('tb_usuario')
export class UsuarioEntity {
  @PrimaryGeneratedColumn()
  id: number

  @Column({
    name: 'nome',
  })
  nome: string
}
