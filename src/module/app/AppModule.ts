import { Module } from '@nestjs/common'
import { LoaderHelper } from '../../helper/LoaderHelper'
import { DatabaseLoaderHelper } from '../../helper/DatabaseLoaderHelper'

const loaderHelper = new LoaderHelper(__dirname)
const services = loaderHelper.getServices()

const databaseLoaderHelper = new DatabaseLoaderHelper(__dirname, 'teste')
const repositories = databaseLoaderHelper.getRepositories()
const databaseProvider = databaseLoaderHelper.getDatabaseProvider()

@Module({
  providers: [databaseProvider, ...repositories, ...services],
  controllers: [...loaderHelper.getControllers()],
})
export default class AppModule {}
