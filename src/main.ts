/// <reference types="node" />
import env from './env'
import { resolve as resolvePath } from 'path'

import { NestFactory } from '@nestjs/core'
import AppModule from './module/app/AppModule'

const { PORT } = env

console.log(`::: Server running on port: ${PORT}`)

export const imp = (path: string) => {
  return require(resolvePath(__dirname, path))
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  })

  // app.useGlobalFilters(new AllExceptionsFilter())
  await app.listen(PORT)
}

bootstrap()
