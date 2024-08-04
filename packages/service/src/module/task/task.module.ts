import { Module } from '@nestjs/common';
import { TaskController } from './task.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskService } from './task.service';
// #region entitys
import { TaskEntity } from './entitys/task.entity';
import { TaskGroupEntity } from './entitys/task-group.entity';
// #endregion entitys

@Module({
  controllers: [TaskController],
  imports: [TypeOrmModule.forFeature([TaskEntity, TaskGroupEntity])],
  providers: [TaskService],
})
export class TaskModule {}
