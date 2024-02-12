import cluster from 'node:cluster';
import { availableParallelism } from 'node:os';
import { handleMessage, users } from '../database/db';
import { createServer } from './createServer';

export const numCPUs = availableParallelism();

if (process.env.MULTI) {
  if (cluster.isPrimary) {
    console.log(`Master process ${process.pid} is running`);

    for (let i = 1; i < numCPUs; i++) {
      cluster.fork({ WORKER_ID: i });
    }

    cluster.on('exit', (worker) => {
      console.log(`Worker process ${worker.process.pid} died. Restarting...`);
      cluster.fork({ WORKER_ID: worker.id });
    });

    cluster.on('message', (_worker, message) => {
      handleMessage(message);

      Object.values(cluster.workers!).forEach((worker) => {
        worker?.send({ type: 'updatedDB', data: users });
      });
    });

    createServer();
  } else {
    process.on('message', handleMessage);

    createServer(Number(process.env.WORKER_ID));
  }
}
