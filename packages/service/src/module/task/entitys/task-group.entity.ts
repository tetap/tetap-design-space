import { Column, Entity, Index } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../../common/entities/base';

@Entity('task-group', {
  comment: '任务组配置表',
})
export class TaskGroupEntity extends BaseEntity {
  @ApiProperty({ description: '组名称' })
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: '组名称',
    unique: true,
  })
  @Index()
  public name: string;

  @ApiProperty({ description: '组代码' })
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: '组代码',
    unique: true,
  })
  @Index()
  public code: string;

  @ApiProperty({ description: '最大并发数' })
  @Column({
    type: 'int',
    nullable: false,
    comment: '最大并发数',
    default: 1,
  })
  public maxConcurrency: number;

  @ApiProperty({ description: '任务超时时间(s)' })
  @Column({
    type: 'int',
    nullable: false,
    comment: '任务超时时间(s)',
    default: 60000,
  })
  public timeout: number;

  @ApiProperty({ description: '任务重试次数' })
  @Column({
    type: 'int',
    nullable: false,
    comment: '任务重试次数',
    default: 0,
  })
  public retryCount: number;

  @ApiProperty({ description: '任务重试间隔(s)' })
  @Column({
    type: 'int',
    nullable: false,
    comment: '任务重试间隔(s)',
    default: 10000,
  })
  public retryInterval: number;

  @ApiProperty({ description: '任务超时重试次数' })
  @Column({
    type: 'int',
    nullable: false,
    comment: '任务超时重试次数',
    default: 0,
  })
  public timeoutRetryCount: number;

  @ApiProperty({ description: '任务超时重试间隔(s)' })
  @Column({
    type: 'int',
    nullable: false,
    comment: '任务超时重试间隔(s)',
    default: 10000,
  })
  public timeoutRetryInterval: number;
}
