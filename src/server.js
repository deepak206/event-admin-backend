const express = require("express");
const WorkerPool = require("./workerPool");
const os = require("os");

const authRoutes = require("./routes/auth.routes");


console.log('CPU cores:', os.cpus().length);
const app = express();

const workerCount = os.cpus().length - 1;

const pool = new WorkerPool(workerCount);

app.use('user', authRoutes);

app.get("/calculate", async (req, res) => {

  const number = Number(req.query.number) || 100000000;

  const taskId = Date.now();

  console.log(`Received task ${taskId}`);

  try {

    const result = await pool.execute({
      id: taskId,
      number
    });

    res.json({
      taskId,
      result
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Calculation failed"
    });

  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});