const { Worker } = require("worker_threads");
const path = require("path");

class WorkerPool {
  constructor(size) {
    this.size = size;

    this.workers = [];

    this.taskQueue = [];

    this.idleWorkers = [];

    this.createWorkers();
  }

  createWorkers() {
    for (let i = 0; i < this.size; i++) {
      const worker = new Worker(
        path.join(__dirname, "worker.js")
      );

      worker.on("message", (result) => {
        this.handleResult(worker, result);
      });

      worker.on("error", (error) => {
        console.error("Worker error:", error);
      });

      worker.on("exit", (code) => {
        console.log(`Worker exited with code ${code}`);
      });

      this.workers.push(worker);
      this.idleWorkers.push(worker);
    }
  }

  execute(task) {
    return new Promise((resolve, reject) => {

      this.taskQueue.push({
        task,
        resolve,
        reject
      });

      this.processQueue();
    });
  }

  processQueue() {

    if (
      this.taskQueue.length === 0 ||
      this.idleWorkers.length === 0
    ) {
      return;
    }

    const worker = this.idleWorkers.shift();

    const taskData = this.taskQueue.shift();

    worker.currentTask = taskData;

    console.log(
      `Assigning task ${taskData.task.id}`
    );

    worker.postMessage(taskData.task);
  }

  handleResult(worker, result) {

    const currentTask = worker.currentTask;

    currentTask.resolve(result);

    worker.currentTask = null;

    this.idleWorkers.push(worker);

    this.processQueue();
  }
}

module.exports = WorkerPool;