import { Worker } from '@temporalio/worker'
import { generateGame, rollDice } from './activities';
import { blueSpace, redSpace } from './activities/spaceActivities';

async function run() {
    const worker = await Worker.create({
      workflowsPath: require.resolve('./workflows'),
      activities: { rollDice, generateGame, blueSpace, redSpace },
      taskQueue: 'snippets'
    });
  
    await worker.run();
  }

  run();