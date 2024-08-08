import type { TaskEntity } from '@tetap-design-space/service/dist/module/task/entitys/task.entity'
import type { TaskDto } from '@tetap-design-space/service/dist/module/task/dto/task.dto'

const base = 'http://localhost:39090'

export const task = Object.freeze({
  getJob: async (jobId: string) => {
    return (await fetch(`${base}/task/${jobId}`).then((res) => res.json())) as {
      code: number
      msg: string
      data: TaskEntity
    }
  },
  pushJob: async (job: TaskDto) => {
    return (await fetch(`${base}/task/push`, {
      method: 'post',
      body: JSON.stringify(job)
    }).then((res) => res.json())) as {
      code: number
      msg: string
      data: number
    }
  },
  removeJob: async (jobId: string) => {
    return (await fetch(`${base}/delete/${jobId}`, {
      method: 'delete'
    }).then((res) => res.json())) as {
      code: number
      msg: string
      data: number
    }
  },
  pauseJob: async (jobId: string) => {
    return (await fetch(`${base}/pause/${jobId}`, {
      method: 'put'
    }).then((res) => res.json())) as {
      code: number
      msg: string
      data: number
    }
  },
  restartJob: async (jobId: string) => {
    return (await fetch(`${base}/restart/${jobId}`, {
      method: 'put'
    }).then((res) => res.json())) as {
      code: number
      msg: string
      data: number
    }
  }
})
