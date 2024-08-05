import { Body, Controller, Request, Post, Get, Param, Delete, Put } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { TaskGroupDto } from './dto/task-group.dto';
import { TaskGroupService } from './task-group.service';
import { ResultData } from 'src/common/utils/result';

@ApiTags('任务配置相关接口')
@Controller('/task-group')
export class TaskGroupController {
  constructor(private readonly taskGroupService: TaskGroupService) {}

  @ApiBody({
    type: TaskGroupDto,
    required: true,
  })
  @ApiOperation({
    description: '注册任务配置',
  })
  @Post('/register')
  async register(@Body() job: TaskGroupDto, @Request() req) {
    const result = await this.taskGroupService.register(job);
    return ResultData.ok(result);
  }
}
