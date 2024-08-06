import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import { AppModule } from './app.module';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { ExceptionsFilter } from './common/filter/ExceptionsFilter';
import { HttpExceptionsFilter } from './common/filter/HttpExceptionsFilter';
import config, { updateConfig } from './config';

async function bootstrap() {
  updateConfig(process.argv);

  const app = await NestFactory.create(AppModule, {
    cors: true, // 开启跨域访问
    logger: console,
  });

  app.use(compression());

  // 全局验证
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      errorHttpStatusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    }),
  );
  app.useGlobalFilters(new ExceptionsFilter());
  app.useGlobalFilters(new HttpExceptionsFilter());

  //服务端口
  const port = config.port;
  await app.listen(port);

  console.log(`Tetap 服务启动成功 `, '\n服务地址：\n', `http://localhost:${port}/`);
}
bootstrap();
