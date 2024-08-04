import { Column, Entity, Index } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '../../../common/entities/base';
import { TaskStatusEnum } from '../enum/task.enum';

@Entity('task', {
  comment: '任务表',
})
export class TaskEntity extends BaseEntity {
  @ApiProperty({ description: '任务名称' })
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: '任务名称',
  })
  @Index()
  public name: string;

  @ApiProperty({ description: '任务状态' })
  @Column({
    type: 'int',
    default: TaskStatusEnum.PENDING,
    comment: '任务状态',
  })
  public status: TaskStatusEnum;

  @ApiProperty({ description: '任务分组' })
  @Column({
    type: 'int',
    nullable: false,
    comment: '任务分组',
  })
  @Index()
  public groupId: number;

  @ApiProperty({ description: '任务参数' })
  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    comment: '任务参数',
  })
  public params: string;

  @ApiProperty({ description: '脚本' })
  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    comment: '脚本',
  })
  public script: string;
}
