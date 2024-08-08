import { IsOptional, MaxLength, Max, Min, IsNotEmpty, IsNumber } from 'class-validator';

export class TaskGroupDto {
  @IsNotEmpty({ message: '任务组标识必填' })
  code: string;

  @IsNotEmpty({ message: '任务组名称必填' })
  name: string;

  @IsOptional()
  @MaxLength(255, { message: 'note不能超过255个字符' })
  note?: string;

  @IsOptional()
  @IsNumber({}, { message: '并发数必须为数字' })
  @Max(20, { message: '并发数不能高于20' })
  @Min(1, { message: '并发数不能小于1' })
  public concurrency: number;

  @IsOptional()
  @IsNumber({}, { message: '重试次数必须为数字' })
  @Max(20, { message: '重试次数不能高于20' })
  public retryCount: number;

  @IsOptional()
  @IsNumber({}, { message: '任务重试间隔(ms)必须为数字' })
  @Min(1000, { message: '任务重试间隔(ms)必须高于1000(ms)' })
  public retryInterval: number;

  @IsOptional()
  @IsNumber({}, { message: '任务轮询间隔(ms)必须为数字' })
  @Min(1000, { message: '任务轮询间隔不能小于1000ms' })
  public pollInterval: number;
}
