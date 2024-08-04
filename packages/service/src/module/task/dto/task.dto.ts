import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsOptional, Max } from 'class-validator';

export class TaskDto {
  @ApiProperty({
    title: '任务名称',
    required: false,
  })
  @IsOptional()
  @Max(255, { message: '任务名称不能超过255' })
  name?: string;

  @ApiProperty({
    title: '任务分组',
    required: true,
  })
  @IsEmpty({ message: '分组不能为空' })
  groupId: number;

  @ApiProperty({
    title: '任务参数',
    required: false,
  })
  @IsOptional()
  @Max(255, { message: '参数长度不能超过255' })
  params?: string;

  @ApiProperty({
    title: '脚本',
    required: true,
  })
  @IsEmpty({ message: '脚本不能为空' })
  script: string;
}
