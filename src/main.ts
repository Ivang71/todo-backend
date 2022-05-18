import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as cookieParser from 'cookie-parser'
import * as dotenv from 'dotenv'
import { AppModule } from './app.module'

dotenv.config()

const bootstrap = async () => {
  const port = process.env.PORT || 9000
  const options = { cors: true }
  const app = await NestFactory.create(AppModule, options)

  app.useGlobalPipes(new ValidationPipe())
  app.use(cookieParser())

  const config = new DocumentBuilder()
    .setTitle('The Great Todo Project')
    .setDescription('Документация')
    .setVersion('0.0.1')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('/api/docs', app, document)

  await app.listen(port, '0.0.0.0', () => console.log('server started'))
}

bootstrap()
