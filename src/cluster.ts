import cluster from 'node:cluster';
import { createServer } from './index';
import { availableParallelism } from 'node:os';

const numCPUs = availableParallelism();

if (cluster.isPrimary) {
  console.log(`Master process ${process.pid} is running`);

  for (let i = 1; i < numCPUs; i++) {
    cluster.fork({ WORKER_ID: i });
  }

  cluster.on('exit', (worker) => {
    console.log(`Worker process ${worker.process.pid} died. Restarting...`);
    cluster.fork({ WORKER_ID: worker.id });
  });
} else {
  createServer(Number(process.env.WORKER_ID));
}
