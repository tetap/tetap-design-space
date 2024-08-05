import helmet from 'helmet';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import * as compression from 'compression';
import { AppModule } from './app.module';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { ExceptionsFilter } from './common/filter/ExceptionsFilter';
import { HttpExceptionsFilter } from './common/filter/HttpExceptionsFilter';
import { isDev } from './common/utils/dev';

async function bootstrap() {
  // 获取启动参数
  const argv = process.argv.slice(2);
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

  // web 安全，防常见漏洞
  // 注意： 开发环境如果开启 nest static module 需要将 crossOriginResourcePolicy 设置为 false 否则 静态资源 跨域不可访问
  app.use(
    helmet({
      crossOriginOpenerPolicy: { policy: 'same-origin-allow-popups' },
      crossOriginResourcePolicy: false,
    }),
  );
  if (isDev) {
    const swaggerOptions = new DocumentBuilder()
      .setTitle('Tetap')
      .setDescription('Tetap 接口文档')
      .setVersion('2.0.0')
      .addBearerAuth()
      .build();
    const document = SwaggerModule.createDocument(app, swaggerOptions);
    // 项目依赖当前文档功能，最好不要改变当前地址
    // 生产环境使用 nginx 可以将当前文档地址 屏蔽外部访问
    SwaggerModule.setup(`/swagger-ui`, app, document, {
      swaggerOptions: {
        persistAuthorization: true,
      },
      customSiteTitle: 'Tetap API Docs',
    });
  }

  //服务端口
  const port = 39090;
  await app.listen(port);

  console.log(
    `Tetap 服务启动成功 `,
    '\n',
    '\n',
    '服务地址',
    `http://localhost:${port}/`,
    '\n',
    'swagger 文档地址        ',
    `http://localhost:${port}/swagger-ui/`,
  );
}
bootstrap();

export default { a: 1 };
