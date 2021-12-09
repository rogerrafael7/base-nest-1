import { TypeOrmModule } from '@nestjs/typeorm'
import { DATA_BASE_NAME_PROVIDER } from '../constant/simple-values'
import { Connection, createConnection } from 'typeorm'
import { Type } from '@nestjs/common'
import { resolve as resolvePath } from 'path'
import { LoaderHelper } from './LoaderHelper'
import databaseConfig = require('../database-config')

class DatabaseContext {
  #listeners: { resolve: (connection: any) => void; reject: (error: Error) => void }[] = []
  #promiseConnection: Promise<any>
  #connection: any
  #entities: any[] = []
  constructor(entities: any[] = []) {
    this.#entities = entities
  }
  putEntities(entities: any[]) {
    this.#entities = [...this.#entities, ...entities].reduce((previous, current) => {
      if (!previous.find(({ name }: any) => name === current.name)) {
        previous.push(current)
      }
      return previous
    }, [])
  }
  async resolveListeners() {
    if (this.#connection) {
      this.#connection.options.entities = [...(this.#connection.options.entities || []), ...this.#entities]
      this.#connection.buildMetadatas()

      for (const listener of this.#listeners) {
        listener.resolve(this.#connection)
      }
    }
  }
  getDatabaseProvider() {
    return {
      provide: DATA_BASE_NAME_PROVIDER,
      useFactory: () => {
        if (!this.#promiseConnection) {
          // garante que haja apenas uma conexão com o banco de dados desta mesma instância
          this.#promiseConnection = createConnection({
            ...(databaseConfig as any),
            migrations: undefined,
            cli: undefined,
            entities: this.#entities,
          })
            .then((conn) => {
              this.#connection = conn
              return this.resolveListeners()
            })
            .catch((error) => {
              for (const listener of this.#listeners) {
                listener.reject(error)
              }
            })
        }
        return new Promise((resolve, reject) => {
          this.#listeners.push({
            resolve: (connection: any) => resolve(connection),
            reject: (error: any) => reject(error),
          })
          return this.resolveListeners()
        })
      },
    }
  }
}

const _databaseContexts: { [key: string]: DatabaseContext } = {}

const factoryDatabaseContext = (contextName = 'default', entities: any[]): DatabaseContext => {
  if (_databaseContexts[contextName]) {
    _databaseContexts[contextName].putEntities(entities)
  } else {
    _databaseContexts[contextName] = new DatabaseContext(entities)
  }
  return _databaseContexts[contextName]
}

export class DatabaseLoaderHelper {
  #basePath: string
  #databaseContextName: string

  /**
   * @param {String} basePath Caminho do diretório do módulo que irá registrar os providers, repositories e entities
   * @param {String} [databaseContextName] Nome do contexto desta instância do banco, essa opção garante q outros módulos possam trabalhar com as mesmas instâncias(singleton)
   */
  constructor(basePath: string, databaseContextName?: string) {
    if (!basePath) {
      throw new Error('Basepath is required')
    }
    this.#basePath = basePath
    this.#databaseContextName = databaseContextName
  }
  getEntities(): Type[] {
    const ENTITIES_PATH = resolvePath(this.#basePath, 'repository', 'database-entity')
    return LoaderHelper.getFiles(ENTITIES_PATH, (key) => /.+Entity$/.test(key))
  }
  getDataBaseModule() {
    const entities = this.getEntities()
    return TypeOrmModule.forRoot({
      ...(databaseConfig as any),
      migrations: undefined,
      cli: undefined,
      entities,
    })
  }
  getDatabaseProvider(): any {
    const entities = this.getEntities()
    return factoryDatabaseContext(this.#databaseContextName, entities).getDatabaseProvider()
  }
  getRepositories(): any[] {
    const REPO_PATH = resolvePath(this.#basePath, 'repository')
    const classesRepos = LoaderHelper.getFiles(REPO_PATH, (key) => /.+Repo$/.test(key))
    return classesRepos.map((CustomRepository) => {
      if (!CustomRepository.repoName) {
        throw new Error('All repositories need have a static property named like "repoName"')
      }
      return {
        provide: CustomRepository.repoName,
        useFactory: (connection: Connection) => connection.getCustomRepository(CustomRepository),
        inject: [DATA_BASE_NAME_PROVIDER],
      }
    })
  }
}
