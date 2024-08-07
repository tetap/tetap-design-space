const args = JSON.parse(process.argv[2]);

// 并发数
const concurrency = args.concurrency;
// 执行中的任务
const taskList = [];

const request = fetch(
  `http://localhost:39090/task/reset/${args.code}?status=['running','retrying']&value='pending'`,
  {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  },
).catch((err) => {
  console.error('Failed to fetch tasks', err);
});

const pollInterval = setInterval(() => {
  // 获取还可执行的数量
  const availableCount = concurrency - taskList.length;
  // 如果有可执行的任务
  if (availableCount <= 0) return;
  run(availableCount);
}, args.pollInterval);

async function run(availableCount: number) {
  // 获取任务列表
  const request = await fetch(
    `http://localhost:39090/task/fetched/${args.code}?status=pending&limit=${availableCount}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  ).catch((err) => {
    console.error('Failed to fetch tasks', err);
  });
  if (!request) return;
  const result = await request.json().catch((err) => {
    console.error('Failed to json tasks', err);
  });
  if (!result) return;
  // 如果没有可执行的任务
  if (result?.data?.length === 0) return;
}
