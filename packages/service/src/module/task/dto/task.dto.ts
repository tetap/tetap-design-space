import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsOptional, Max } from 'class-validator';

export class TaskDto {
  @ApiProperty({
    title: '任务名称',
    required: false,
  })
  @IsOptional()
  @Max(255, { message: 'name不能超过255个字符' })
  name?: string;

  @ApiProperty({
    title: '任务分组',
    required: true,
  })
  @IsEmpty({ message: 'groupId不能为空' })
  groupId: number;

  @ApiProperty({
    title: '任务参数',
    required: false,
  })
  @IsOptional()
  @Max(255, { message: 'params不能超过255个字符' })
  params?: string;

  @ApiProperty({
    title: '脚本',
    required: true,
  })
  @IsEmpty({ message: 'script不能为空' })
  script: string;
}
