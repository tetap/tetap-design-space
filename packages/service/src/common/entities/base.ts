import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({ type: Number, description: '主键' })
  @PrimaryGeneratedColumn({
    comment: '主键',
  })
  public id: number;

  @ApiProperty({ type: Date, description: '创建时间' })
  @CreateDateColumn({ type: 'datetime', name: 'create_time', comment: '创建时间' })
  @Index()
  public createTime: Date;

  @ApiProperty({ type: Date, description: '更新时间' })
  @UpdateDateColumn({ type: 'datetime', name: 'update_time', comment: '更新时间' })
  @Index()
  public updateTime: Date;

  @ApiProperty({ type: String, description: '备注' })
  @Column({ type: 'varchar', name: 'note', length: 255, comment: '备注', default: '' })
  public note: string;
}
