import { IsOptional, Max, IsEmpty } from 'class-validator';

export class TaskGroupDto {
  @Max(255, { message: 'code不能超过255个字符' })
  @IsEmpty({ message: 'code不能为空' })
  code?: string;

  @Max(255, { message: 'name不能超过255个字符' })
  @IsEmpty({ message: 'name不能为空' })
  name?: string;

  @IsOptional()
  @Max(255, { message: 'note不能超过255个字符' })
  note?: string;
}
