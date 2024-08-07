import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskProcess } from 'src/task';
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
    const row = await this.taskGroupRepository.save(saveData);
    const current = await this.taskGroupRepository.findOne({
      where: {
        id: row.id,
      },
    });
    TaskProcess.start(current);
  }

  async getAll() {
    return await this.taskGroupRepository.find();
  }
}
