import { In, Repository } from 'typeorm'
import { IPaginationResult } from './IPaginationResult'
import { TypeParamsToFind } from './TypeParamsToFind'
import { EntityManager } from 'typeorm/entity-manager/EntityManager'

export abstract class RepoBase<Entity> extends Repository<Entity> {
  async findWithCount(options?: TypeParamsToFind<Entity>): Promise<IPaginationResult<Entity>> {
    let result
    let total
    if (options && +options.take === -1) {
      result = await super.find({
        ...options,
        take: undefined,
        skip: 0,
      })
      total = result.length
    } else {
      ;[result, total] = await super.findAndCount(options)
    }
    return {
      data: result,
      count: total,
    }
  }
  async upsertAll(
    lookupPropertyName: keyof Entity,
    listEntities: Entity[],
    entityManager?: EntityManager,
    EntityClass?: { new (): Entity },
    upsert = false,
  ): Promise<Entity[]> {
    const ids = []

    for (const entityRow of listEntities) {
      ids.push(entityRow[lookupPropertyName])
    }

    const where = {
      [lookupPropertyName]: In(ids),
    }

    const mapRowsByPk: { [key: string]: any } = {}
    ;(await this._findWithManager(entityManager, EntityClass, { where })).forEach((row) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      mapRowsByPk[row[lookupPropertyName]] = row
    })
    const promises: Promise<Entity>[] = []
    for (const row of listEntities) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const saved = mapRowsByPk[row[lookupPropertyName]]

      let mixed = row || {}
      if (upsert && !saved) {
        mixed = this._createWithManager(entityManager, EntityClass, row as Entity)
      }
      if (saved || upsert) {
        const rowToSave = Object.assign(saved || ({} as Entity), mixed)
        promises.push(this._saveWithManager(entityManager, EntityClass, rowToSave))
      }
    }

    return Promise.all(promises)
  }
  async upsertOne(
    where: any,
    partialEntity: Partial<Entity>,
    entityManager: EntityManager,
    EntityClass: { new (): Entity },
    upsert = false,
  ): Promise<Entity> {
    const row: Entity = await this._findOneWithManager(entityManager, EntityClass, { where })
    let mixed = partialEntity || {}
    if (upsert && !row) {
      mixed = this._createWithManager(entityManager, EntityClass, partialEntity as Entity)
    }
    if (row || upsert) {
      const rowToSave = Object.assign(row || ({} as Entity), mixed)
      return this._saveWithManager(entityManager, EntityClass, rowToSave)
    }
    return null
  }

  protected _findWithManager = async (
    entityManager: EntityManager,
    EntityClass: { new (): Entity },
    ...findArgs: any[]
  ): Promise<Entity[]> => {
    if (entityManager) {
      return entityManager.find(EntityClass as any, ...findArgs)
    }
    return this.find(...findArgs)
  }
  protected _findOneWithManager = async (
    entityManager: EntityManager,
    EntityClass: { new (): Entity },
    ...findArgs: any[]
  ): Promise<Entity> => {
    if (entityManager) {
      return entityManager.findOne(EntityClass as any, ...findArgs)
    }
    return this.findOne(...findArgs)
  }
  protected _saveWithManager = async (
    entityManager: EntityManager,
    EntityClass: { new (): Entity },
    e: Entity,
  ): Promise<Entity> => {
    if (entityManager) {
      return entityManager.save(EntityClass, e)
    }
    return this.save(e)
  }
  protected _createWithManager = (entityManager: EntityManager, EntityClass: { new (): Entity }, e: Entity): Entity => {
    if (entityManager) {
      return entityManager.create(EntityClass as any, e)
    }
    return this.create(e)
  }
}
