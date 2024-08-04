import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from 'typeorm';
// #region dto
import { TaskDto } from './dto/task.dto';
// #endregion dto
// #region entitys
import { TaskEntity } from './entitys/task.entity';
import { TaskGroupEntity } from './entitys/task-group.entity';
// #endregion entitys
// #region types
import type { Repository } from 'typeorm';
// #endregion types

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
    @InjectRepository(TaskGroupEntity)
    private readonly taskGroupRepository: Repository<TaskGroupEntity>,
  ) {}
  async add(task: TaskDto) {
    const group = await this.taskGroupRepository.findOne({
      where: {
        id: task.groupId,
        name: Like('%'),
      },
    });
    if (!group) throw new Error('task group not found');
    const dateText = new Date().toLocaleString();
    const name = `${group.name}-${dateText}-${crypto.getRandomValues(new Uint32Array(1))[0]}`;
    const obj = Object.assign(
      {
        name: task.name || name,
      },
      task,
    );
    return await this.taskRepository.insert(obj);
  }
  async update(id: number, task: Partial<TaskEntity>) {
    return await this.taskRepository.update(id, task);
  }
  async delete(id: number) {
    return await this.taskRepository.delete(id);
  }
  async get(id: number) {
    return await this.taskRepository.findOne({
      where: {
        id,
      },
    });
  }
}
