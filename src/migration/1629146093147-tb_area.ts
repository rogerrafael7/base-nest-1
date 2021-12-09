import { MigrationInterface, QueryRunner } from 'typeorm'

export class tbArea1629146093147 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.query(`
        create table tb_projeto
        (
            id         serial primary key,
            created_at date default now(),
            updatedAt  date,
            descricao  text,
            nome       varchar
        );

        create table tb_area
        (
            id         serial primary key,
            created_at date default now(),

            descricao  text,
            id_projeto integer references tb_projeto (id)
        );
    `)
  }

  public async down({}: QueryRunner): Promise<void> {
    return null
  }
}
