import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity()
export abstract class BaseEntity {
  @PrimaryGeneratedColumn({
    comment: '主键',
  })
  public id: number;

  @CreateDateColumn({ type: 'datetime', name: 'create_time', comment: '创建时间' })
  @Index()
  public createTime: Date;

  @UpdateDateColumn({ type: 'datetime', name: 'update_time', comment: '更新时间' })
  @Index()
  public updateTime: Date;

  @Column({ type: 'varchar', name: 'note', length: 255, comment: '备注', default: '' })
  public note: string;
}
