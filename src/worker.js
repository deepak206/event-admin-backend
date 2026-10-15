const { parentPort } = require("worker_threads");

console.log(`Worker ${process.threadId} started`);

function calculate(number) {
  let result = 0;

  for (let i = 0; i < number; i++) {
    result += i;
  }

  return result;
}

parentPort.on("message", (task) => {
  console.log(`Worker received task: ${task.id}`);

  const result = calculate(task.number);

  parentPort.postMessage({
    taskId: task.id,
    result
  });
});