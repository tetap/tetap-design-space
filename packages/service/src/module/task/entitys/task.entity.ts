import { Column, Entity, Index } from 'typeorm';
import { BaseEntity } from '../../../common/entities/base';
import { TaskStatusEnum } from '../enum/task.enum';

@Entity('task', {
  comment: '任务表',
})
export class TaskEntity extends BaseEntity {
  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    comment: '任务名称',
  })
  @Index()
  public name: string;

  @Column({
    type: 'int',
    default: TaskStatusEnum.PENDING,
    comment: '任务状态',
  })
  public status: TaskStatusEnum;

  @Column({
    type: 'int',
    nullable: false,
    comment: '任务分组',
  })
  @Index()
  public groupId: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    comment: '任务参数',
  })
  public params: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: true,
    comment: '脚本',
  })
  public script: string;
}
