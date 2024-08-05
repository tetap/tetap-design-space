import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from 'typeorm';
// #region dto
import { TaskGroupDto } from './dto/task-group.dto';
// #endregion dto
// #region entitys
import { TaskGroupEntity } from './entitys/task-group.entity';
// #endregion entitys
// #region types
import type { Repository } from 'typeorm';
// #endregion types

@Injectable()
export class TaskGroupService {
  constructor(
    @InjectRepository(TaskGroupEntity)
    private readonly taskGroupRepository: Repository<TaskGroupEntity>,
  ) {}

  async register(taskGroup: TaskGroupDto) {
    const select = await this.taskGroupRepository.findOne({
      where: {
        code: taskGroup.code,
      },
    });
    const saveData = taskGroup as Partial<TaskGroupEntity>;
    if (select) {
      saveData.id = select.id;
    }
    return await this.taskGroupRepository.save(saveData);
  }
}
