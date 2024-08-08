import { IsNotEmpty, IsOptional, Max } from 'class-validator';

export class TaskDto {
  @IsNotEmpty({ message: '任务标识不能为空' })
  code: string;

  @IsOptional()
  @Max(255, { message: 'name不能超过255个字符' })
  name?: string;

  @IsNotEmpty({ message: 'groupCode不能为空' })
  groupCode: string;

  @IsOptional()
  @Max(255, { message: 'params不能超过255个字符' })
  params?: string;

  @IsNotEmpty({ message: 'script不能为空' })
  script: string;
}
