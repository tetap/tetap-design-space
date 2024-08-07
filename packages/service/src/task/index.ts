import path from 'path';
import { fork } from 'child_process';
import { TaskGroupEntity } from 'src/module/task/entitys/task-group.entity';
import type { ChildProcess } from 'child_process';

export class TaskProcess {
  private static cache: Map<string, ChildProcess> = new Map();
  /**
   * 启动任务进程
   * @param group
   */
  static start(group: TaskGroupEntity) {
    if (this.cache.has(group.code)) return;
    const uri = path.join(__dirname, '/script.js');
    const child = fork(uri, [JSON.stringify(group)], {
      silent: true,
    });
    child.stdout.setEncoding('utf8');
    child.stdout.on('data', function (data) {
      console.log(group.name, group.code, data);
    });
    child.stderr.setEncoding('utf8');
    child.stderr.on('data', function (data) {
      console.error(group.name, group.code, data);
    });
    child.on('error', (error) => {
      console.log(group.name, group.code, error);
    });
    child.on('exit', (code, signal) => {
      console.log(`exited with code ${code}, signal ${signal}`);
      this.cache.delete(group.code);
    });
    this.cache.set(group.code, child);
  }
}
