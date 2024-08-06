import { Body, Controller, Request, Post, Get, Param, Delete, Put } from '@nestjs/common';
import { TaskGroupDto } from './dto/task-group.dto';
import { TaskGroupService } from './task-group.service';
import { ResultData } from 'src/common/utils/result';

@Controller('/task-group')
export class TaskGroupController {
  constructor(private readonly taskGroupService: TaskGroupService) {}

  @Post('/register')
  async register(@Body() job: TaskGroupDto, @Request() req) {
    const result = await this.taskGroupService.register(job);
    return ResultData.ok(result);
  }
}
