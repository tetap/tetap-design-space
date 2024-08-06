import { IsEmpty, IsOptional, Max } from 'class-validator';

export class TaskDto {
  @IsOptional()
  @Max(255, { message: 'name不能超过255个字符' })
  name?: string;

  @IsEmpty({ message: 'groupId不能为空' })
  groupId: number;

  @IsOptional()
  @Max(255, { message: 'params不能超过255个字符' })
  params?: string;

  @IsEmpty({ message: 'script不能为空' })
  script: string;
}
