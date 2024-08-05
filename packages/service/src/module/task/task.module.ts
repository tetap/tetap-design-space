import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// #region services
import { TaskService } from './task.service';
import { TaskGroupService } from './task-group.service';
// #endregion services

// #region controllers
import { TaskController } from './task.controller';
import { TaskGroupController } from './task-group.controller';
// #endregion controllers

// #region entitys
import { TaskEntity } from './entitys/task.entity';
import { TaskGroupEntity } from './entitys/task-group.entity';
// #endregion entitys

@Module({
  controllers: [TaskController, TaskGroupController],
  imports: [TypeOrmModule.forFeature([TaskEntity, TaskGroupEntity])],
  providers: [TaskService, TaskGroupService],
})
export class TaskModule {}
