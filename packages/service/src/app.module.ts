import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import config from './config';

// #region modules
import { TaskModule } from './module/task/task.module';
// #endregion modules

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
          database: config.db,
          entityPrefix: 'tetap_app_',
          logger: {
            logQueryError(error, query) {
              console.error(error, query);
            },
            logQuery() {},
            logQuerySlow(time, query) {
              console.error('Logs query that is slow.', time, query);
            },
            logSchemaBuild() {},
            logMigration() {},
            log() {},
          },
          prepareDatabase: (db) => {
            db.pragma('journal_mode = WAL');
            db.pragma('synchronous = 0');
          },
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
