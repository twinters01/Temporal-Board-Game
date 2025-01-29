import { condition, defineQuery, defineSignal, proxyActivities, setHandler } from '@temporalio/workflow';
import * as activities from './activities';

const { greet, rollDice } = proxyActivities<typeof activities>({startToCloseTimeout: '30 seconds'})

const playerRollSignal = defineSignal<[number, number]>('playerRoll');
const getStatusQuery = defineQuery<object>("getStatus");

export async function helloWorld()
{
    return { greeting: await greet() };
}

export async function game()
{
    var roll: number | undefined = undefined;
    var goal = 10;
    var players = [0, 0];
    var currentPlayer = 0;
    setHandler(playerRollSignal, async (player) => {
        if(player == currentPlayer)
        {
            roll = await rollDice();
        }
    });
    setHandler(getStatusQuery, () => {
        return {
            goal, players, currentPlayer
        }
    })

    while(players[0] < goal && players[1] < goal)
    {
        roll = undefined;
        await condition(() => roll != undefined);
        players[currentPlayer] += roll!;
        currentPlayer = currentPlayer == 0 ? 1 : 0;
    }

    if(players[0] >= goal)
        return 0;
    else if(players[1] >= goal)
        return 1;
}