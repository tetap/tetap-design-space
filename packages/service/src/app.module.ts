import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

// #region modules
import { TaskModule } from './module/task/task.module';
// #endregion modules

// #endregion
@Module({
  imports: [
    // 数据库
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        return {
          type: 'better-sqlite3',
          entities: [`${__dirname}/**/*.entity{.ts,.js}`],
          autoLoadEntities: true,
          keepConnectionAlive: true,
          timezone: '+08:00',
          database: './databases/app.db',
          entityPrefix: 'tetap_app_',
          logger: 'file',
          logging: true,
          multipleStatements: true,
          dropSchema: false,
          synchronize: true,
          supportBigNumbers: true,
          bigNumberStrings: true,
        } as TypeOrmModuleOptions;
      },
    }),
    TaskModule,
  ],
  providers: [],
})
export class AppModule {}
