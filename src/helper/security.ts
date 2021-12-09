import { createHash } from 'crypto'

export const securityHelper = {
  createHash(value: string) {
    return createHash('md5').update(value).digest('hex')
  },
}
