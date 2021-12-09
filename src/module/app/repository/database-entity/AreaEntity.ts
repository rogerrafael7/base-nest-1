import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { ProjetoEntity } from './ProjetoEntity'

@Entity('tb_area')
export class AreaEntity {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @Column({ name: 'descricao' })
  descricao: string

  @ManyToOne(() => ProjetoEntity, (projeto) => projeto.areas)
  @JoinColumn({ name: 'id_projeto' })
  projeto: ProjetoEntity

  @Column({ name: 'id_projeto' })
  idProjeto: number
}
