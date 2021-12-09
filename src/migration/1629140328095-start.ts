import { MigrationInterface, QueryRunner } from 'typeorm'

export class start1629140328095 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    return queryRunner.query(`
        create table tb_usuario
        (
            id   serial primary key,
            nome varchar
        );
    `)
  }

  public async down({}: QueryRunner): Promise<null> {
    return null
  }
}
