import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, Max, IsEmpty } from 'class-validator';

export class TaskGroupDto {
  @ApiProperty({
    title: '组',
    required: false,
  })
  @Max(255, { message: 'code不能超过255个字符' })
  @IsEmpty({ message: 'code不能为空' })
  code?: string;

  @ApiProperty({
    title: '名称',
    required: false,
  })
  @Max(255, { message: 'name不能超过255个字符' })
  @IsEmpty({ message: 'name不能为空' })
  name?: string;

  @ApiProperty({
    title: '描述',
    required: false,
  })
  @IsOptional()
  @Max(255, { message: 'note不能超过255个字符' })
  note?: string;
}
