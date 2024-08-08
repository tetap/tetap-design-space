import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like } from 'typeorm';
import { isEmpty } from 'lodash';
// #region dto
import { TaskDto } from './dto/task.dto';
// #endregion dto
// #region entitys
import { TaskEntity } from './entitys/task.entity';
import { TaskGroupEntity } from './entitys/task-group.entity';
// #endregion entitys
// #region types
import type { Repository } from 'typeorm';
import { TaskStatusEnum } from './enum/task.enum';
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
        code: task.groupCode,
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
  async getByCode(code: string, groupCode: string) {
    const group = await this.taskGroupRepository.findOne({
      where: {
        code: groupCode,
      },
    });
    if (!group) throw new Error('task group not found');
    return await this.taskRepository.findOne({
      where: {
        code,
        groupId: group.id,
      },
    });
  }
  /**
   * 获取指定状态条数的任务
   * @param code
   * @param status
   * @param limit
   * @returns
   */
  async fetched(code: string, status: TaskStatusEnum, limit: number) {
    const group = await this.taskGroupRepository.findOne({
      where: {
        code: code,
      },
    });
    if (!group) throw new Error('task group not found');
    return this.taskRepository.find({
      where: {
        groupId: group.id,
        status,
      },
      order: {
        id: 'DESC',
      },
      take: limit,
    });
  }

  /**
   * 重置指定状态的任务
   * @param code
   * @param status
   * @param value
   * @returns
   */
  async reset(code: string, status: TaskStatusEnum[], value: TaskStatusEnum) {
    const group = await this.taskGroupRepository.findOne({
      where: {
        code: code,
      },
    });
    if (!group) throw new Error('task group not found');
    const tasks = await this.taskRepository.find({
      where: {
        groupId: group.id,
        status: In(status),
      },
      order: {
        id: 'DESC',
      },
    });
    const updateData = tasks.map((task) => ({ id: task.id, status: value }));
    if (!isEmpty(updateData)) {
      // sqlite 批量更新数据时，不能超过32767个 https://www.sqlite.org/limits.html
      return await this.taskRepository.save(updateData, { chunk: 30000 });
    }
    return [];
  }
}
