import { existsSync, readdirSync } from 'fs'
import { resolve as resolvePath } from 'path'
import { Type } from '@nestjs/common'

const cache: { [path: string]: any[] } = {}

export class LoaderHelper {
  static getFiles(PATH: string, filterToCompare: (key: string) => boolean) {
    if (!existsSync(PATH)) {
      return []
    }
    if (cache[PATH]) {
      return cache[PATH]
    }
    const files: string[] = readdirSync(PATH)
    const list: any[] = []
    for (const fileName of files) {
      const pathFile: string = resolvePath(PATH, fileName)
      if (/\.js$/.test(fileName)) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const c: { [key: string]: Type } = require(pathFile)
        const name: string = Object.keys(c).find((key: string) => filterToCompare(key))
        if (name) {
          list.push(c[name])
        }
      }
    }
    cache[PATH] = list
    return list
  }
  basePath: string
  constructor(basePath: string) {
    if (!basePath) {
      throw new Error('Basepath is required')
    }
    this.basePath = basePath
  }
  getControllers(): Type[] {
    const CONTROLLERS_PATH = resolvePath(this.basePath, 'controller')
    return LoaderHelper.getFiles(CONTROLLERS_PATH, (key) => /.+Controller$/.test(key))
  }
  getServices(): Type[] {
    const SERVICES_PATH = resolvePath(this.basePath, 'service')
    return LoaderHelper.getFiles(SERVICES_PATH, (key) => /.+Service$/.test(key))
  }
}
