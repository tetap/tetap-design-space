import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base';

@Entity('task-group', {
  comment: '任务组配置表',
})
export class TaskGroupEntity extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: '组名称',
    unique: true,
  })
  @Index()
  public name: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: '组代码',
    unique: true,
  })
  @Index()
  public code: string;

  @Column({
    type: 'int',
    nullable: false,
    comment: '并发数',
    default: 1,
  })
  public concurrency: number;

  @Column({
    type: 'int',
    nullable: false,
    comment: '任务重试次数',
    default: 0,
  })
  public retryCount: number;

  @Column({
    type: 'int',
    nullable: false,
    comment: '任务重试间隔(ms) default 10000',
    default: 10000,
  })
  public retryInterval: number;

  @Column({
    type: 'int',
    nullable: false,
    comment: '任务轮询间隔(ms) default 1000',
    default: 1000,
  })
  public pollInterval: number;
}
