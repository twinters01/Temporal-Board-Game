import { condition, defineQuery, defineSignal, proxyActivities, setHandler } from '@temporalio/workflow';
import * as activities from './activities';
import { getSpaceActivities } from './activities/spaceActivityHelper';

const { rollDice, generateGame } = proxyActivities<typeof activities>({startToCloseTimeout: '30 seconds'})

const playerRollSignal = defineSignal<[number, number]>('playerRoll');
const getStatusQuery = defineQuery<object>("getStatus");

export async function game()
{
    var roll: number | undefined = undefined;
    var game = await generateGame(["Player 1", "Player 2", "Player 3", "Player 4"]);
    const spaceActivities = getSpaceActivities();

    setHandler(playerRollSignal, async (player) => {
        if(player == game.currentPlayer.number)
        {
            roll = await rollDice();
        }
    });
    setHandler(getStatusQuery, () => game)

    while(true)
    {
        roll = undefined;
        await condition(() => roll != undefined);
        for(let i = 0; i < roll!; i++)
        {
            console.log("moving")
            const space = game.currentPlayer.currentSpace;
            const nextSpace = space.nextSpaces[0];

            game.currentPlayer.currentSpace = game.map[nextSpace];
        }
        if(spaceActivities.has(game.currentPlayer.currentSpace.type))
            spaceActivities.get(game.currentPlayer.currentSpace.type)!(game);
        
        game.currentPlayer = game.currentPlayer.number == game.players.length - 1 ?
                        game.players[0] : game.players[game.currentPlayer.number + 1]
    }
}