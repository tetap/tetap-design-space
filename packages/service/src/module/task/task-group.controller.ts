import { Body, Controller, Request, Post, OnModuleInit } from '@nestjs/common';
import { TaskGroupDto } from './dto/task-group.dto';
import { TaskGroupService } from './task-group.service';
import { ResultData } from 'src/common/utils/result';

@Controller('/task-group')
export class TaskGroupController implements OnModuleInit {
  constructor(private readonly taskGroupService: TaskGroupService) {}
  async onModuleInit() {
    // 没有必要一开始就执行所有任务组
    // const groups = await this.taskGroupService.getAll();
    // for (const group of groups) {
    //   TaskProcess.start(group);
    // }
  }

  @Post('/register')
  async register(@Body() job: TaskGroupDto, @Request() req) {
    const result = await this.taskGroupService.register(job);
    return ResultData.ok(result);
  }
}
