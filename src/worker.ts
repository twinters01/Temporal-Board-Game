import { Worker } from '@temporalio/worker'
import { greet, rollDice } from './activities';

async function run() {
    const worker = await Worker.create({
      workflowsPath: require.resolve('./workflows'),
      activities: { greet, rollDice },
      taskQueue: 'snippets'
    });
  
    await worker.run();
  }

  run();