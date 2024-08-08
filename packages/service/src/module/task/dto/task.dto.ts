import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class TaskDto {
  @IsNotEmpty({ message: '任务标识不能为空' })
  code: string;

  @IsOptional()
  @MaxLength(255, { message: 'name不能超过255个字符' })
  name?: string;

  @IsNotEmpty({ message: 'groupCode不能为空' })
  groupCode: string;

  @IsOptional()
  params?: string;

  @IsNotEmpty({ message: 'script不能为空' })
  script: string;
}
