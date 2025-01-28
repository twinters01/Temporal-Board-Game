import { condition, defineSignal, setHandler } from '@temporalio/workflow';
import {greet} from './activities';

const playerRollSignal = defineSignal<[number, number]>('playerRoll')

export async function helloWorld()
{
    return { greeting: await greet() };
}

export async function game()
{
    var goal = 30;
    var players = [0, 0];
    var currentPlayer = 0;
    setHandler(playerRollSignal, (player) => {
        if(player == currentPlayer)
        {
            players[player] += 30;
            currentPlayer = currentPlayer == 0 ? 1 : 0;
        }
    });

    await condition(() => players[0] >= goal || players[1] >= goal);

    if(players[0] >= goal)
        return 0;
    else if(players[1] >= goal)
        return 1;
}