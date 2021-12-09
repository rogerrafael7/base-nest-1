/* eslint-disable */
const fs = require('fs')
const fse = require('fs-extra')
const path = require('path')
let [ moduleName, entityName ] = process.argv.slice(2)
const currentPath = path.resolve(__dirname, 'src', 'module', moduleName)
if (!fs.existsSync(currentPath)) {
  throw new Error(`The module path no exists. Error path: ${currentPath}`)
}
entityName = entityName.replace(/Entity$/, '')
// 2

const repoPath = path.resolve(currentPath, 'repository')
fse.ensureDirSync(repoPath)
const entitiesPath = path.resolve(repoPath, 'database-entity')
fse.ensureDirSync(entitiesPath)

const capitalize = (str) => {
  const firstLetter = str[0].toUpperCase()
  return `${firstLetter}${str.slice(1)}`
}

const snackCase = (str) => {
  const firstLetter = str[0].toLowerCase()
  let nStr = str
    .slice(1)
    .replace(/([A-Z])/g, (f, group) => `_${group.toLowerCase()}`)
  return `${firstLetter}${nStr}`
}

const nameCapitalized = capitalize(entityName)
const tableName = `tb_${snackCase(entityName)}`
const entityNameCapitalized = `${nameCapitalized}Entity`
const repoNameSnacked = snackCase(`${nameCapitalized}Repo`)
const repoNameCapitalized = `${nameCapitalized}Repo`

fs.writeFileSync(
  path.resolve(repoPath, `${repoNameCapitalized}.ts`),
  `import { EntityRepository } from 'typeorm'
import { ${entityNameCapitalized} } from './database-entity/${entityNameCapitalized}'
import { RepoBase } from '../../../base/RepoBase'

@EntityRepository(${entityNameCapitalized})
export class ${repoNameCapitalized} extends RepoBase<${entityNameCapitalized}> {
  static readonly repoName = '${repoNameSnacked.toUpperCase()}'
}
`
)

fs.writeFileSync(
  path.resolve(entitiesPath, `${entityNameCapitalized}.ts`),
  `import { CreateDateColumn, UpdateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('${tableName}')
export class ${entityNameCapitalized} {
  @PrimaryGeneratedColumn()
  id: number

  @CreateDateColumn({
    name: 'dt_created',
    type: 'timestamp',
  })
  createdDate: Date

  @UpdateDateColumn({
    name: 'dt_last_modified',
    type: 'timestamp',
  })
  lastModifiedDate: Date
}
`
)

