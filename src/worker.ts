import { Worker } from '@temporalio/worker'
import { greet } from './activities';

async function run() {
    const worker = await Worker.create({
      workflowsPath: require.resolve('./workflows'),
      activities: [{activityFoo: greet}],
      taskQueue: 'snippets'
    });
  
    await worker.run();
  }

  run();