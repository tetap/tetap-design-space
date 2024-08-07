import { Body, Controller, Request, Post, Get, Param, Delete, Put, Query } from '@nestjs/common';
import { TaskDto } from './dto/task.dto';
import { TaskService } from './task.service';
import { ResultData } from 'src/common/utils/result';
import { ResultEnum } from 'src/common/enum';
import { TaskStatusEnum } from './enum/task.enum';
import { TaskEntity } from './entitys/task.entity';

@Controller('/task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post('/push')
  async push(@Body() job: TaskDto, @Request() req) {
    const result = (await this.taskService.add(job)) as any;
    return ResultData.ok(result.raw);
  }

  @Get('/get/:id')
  async get(@Param('id') id, @Request() req) {
    const result = await this.taskService.get(id);
    return result ? ResultData.ok(result) : ResultData.fail(ResultEnum.FAIL, '未找到该任务');
  }

  @Get('/bycode/:id')
  async getByCode(@Param('id') code, @Query('groupCode') groupCode, @Request() req) {
    const result = await this.taskService.getByCode(code, groupCode);
    return result ? ResultData.ok(result) : ResultData.fail(ResultEnum.FAIL, '未找到该任务');
  }

  @Delete('/delete/:id')
  async delete(@Param('id') id, @Request() req) {
    await this.taskService.delete(id);
    return ResultData.ok(id);
  }

  @Put('/pause/:id')
  async pause(@Param('id') id, @Request() req) {
    const job = await this.taskService.get(id);
    if (!job) return ResultData.fail(ResultEnum.FAIL, '未找到该任务');
    if (job.status === TaskStatusEnum.SUCCESS)
      return ResultData.fail(ResultEnum.FAIL, '任务已执行完毕');
    if (
      ![
        TaskStatusEnum.RUNNING,
        TaskStatusEnum.RETRYING,
        TaskStatusEnum.PENDING,
        TaskStatusEnum.PAUSE,
      ].includes(job.status)
    )
      return ResultData.fail(ResultEnum.FAIL, '任务状态不允许暂停');
    await this.taskService.update(id, { status: TaskStatusEnum.PAUSE });
    return ResultData.ok(id);
  }

  @Put('/restart/:id')
  async restart(@Param('id') id, @Request() req) {
    const job = await this.taskService.get(id);
    if (!job) return ResultData.fail(ResultEnum.FAIL, '未找到该任务');
    if (job.status === TaskStatusEnum.SUCCESS)
      return ResultData.fail(ResultEnum.FAIL, '任务已执行完毕');
    if (job.status !== TaskStatusEnum.FAILURE)
      return ResultData.fail(ResultEnum.FAIL, '任务正在执行中');
    await this.taskService.update(id, { status: TaskStatusEnum.RETRYING });
    return ResultData.ok();
  }

  /**
   * 获取任务列表
   * @param code
   * @param body
   * @param req
   */
  @Get('/fetched/:code')
  async fetched(
    @Param('code') code: string,
    @Query('status') status: TaskStatusEnum,
    @Query('limit') limit: number,
    @Request() req,
  ) {
    return ResultData.ok(await this.taskService.fetched(code, status, limit));
  }

  /**
   * 重置指定状态的任务
   * @param code
   * @param status
   * @param value
   * @returns
   */
  @Get('/reset/:code')
  async reset(
    @Param('code') code: string,
    @Query('status') status: TaskStatusEnum[],
    @Query('value') value: TaskStatusEnum,
    @Request() req,
  ) {
    await this.taskService.reset(code, status, value);
    return ResultData.ok();
  }
}
