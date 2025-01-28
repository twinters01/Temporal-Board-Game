// @@@SNIPSTART money-transfer-project-template-ts-start-workflow
import { Connection, WorkflowClient } from '@temporalio/client';
import { uuid4 } from '@temporalio/workflow';
import { game } from './workflows';

async function run() {
    console.log("run")
  const connection = await Connection.connect();
  const client = new WorkflowClient({ connection });

    const handle = await client.start(game, {
        taskQueue: 'snippets',
        workflowId: uuid4()
    })

    console.log(await handle.result())
}

run().catch((err) => {
    console.error(err);
    process.exit(1);
  });