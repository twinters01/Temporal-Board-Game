import { Worker } from '@temporalio/worker'
import { generateGame, rollDice } from './activities';
import { blueSpace, redSpace } from './activities/spaceActivities';
import { starEvent } from './activities/eventActivities';

async function run() {
    const worker = await Worker.create({
      workflowsPath: require.resolve('./workflows'),
      activities: { rollDice, generateGame, blueSpace, redSpace, starEvent },
      taskQueue: 'snippets'
    });
  
    await worker.run();
  }

  run();