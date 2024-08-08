export enum TaskStatusEnum {
  PENDING = 'pending',
  RUNNING = 'running',
  SUCCESS = 'success',
  FAILURE = 'failure',
  RETRYING = 'retrying',
  CANCELED = 'canceled',
  PAUSE = 'pause',
  // 意外终止 程序退出
  ABORT = 'abort',
}
