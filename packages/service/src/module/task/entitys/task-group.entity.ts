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
    comment: '最大并发数',
    default: 1,
  })
  public maxConcurrency: number;

  @Column({
    type: 'int',
    nullable: false,
    comment: '任务超时时间(s)',
    default: 60000,
  })
  public timeout: number;

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
    comment: '任务重试间隔(s)',
    default: 10000,
  })
  public retryInterval: number;

  @Column({
    type: 'int',
    nullable: false,
    comment: '任务超时重试次数',
    default: 0,
  })
  public timeoutRetryCount: number;

  @Column({
    type: 'int',
    nullable: false,
    comment: '任务超时重试间隔(s)',
    default: 10000,
  })
  public timeoutRetryInterval: number;
}
