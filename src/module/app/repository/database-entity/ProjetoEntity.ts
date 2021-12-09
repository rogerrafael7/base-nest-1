import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { AreaEntity } from './AreaEntity'

@Entity('tb_projeto')
export class ProjetoEntity {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @Column({ name: 'descricao' })
  descricao: string

  @Column({ name: 'nome' })
  nome: string

  @OneToMany(() => AreaEntity, (area) => area.projeto)
  areas: AreaEntity[]
}
