import { condition, defineQuery, defineSignal, log, proxyActivities, setHandler } from '@temporalio/workflow';
import * as activities from './activities';
import { getEventActivities, getSpaceActivities } from './activities/spaceActivityHelper';
import { EventType } from './models/space';

const { rollDice, generateGame } = proxyActivities<typeof activities>({startToCloseTimeout: '30 seconds'})

type PlayerDecisionProps = {
    player: number;
    decision: number;
}
const playerRollSignal = defineSignal<[number, number]>('playerRoll');
const getStatusQuery = defineQuery<object>("getStatus");
const playerDecisionSignal = defineSignal<[PlayerDecisionProps]>("playerDecision");

export async function game()
{
    var roll: number | undefined = undefined;
    var game = await generateGame(["Player 1", "Player 2", "Player 3", "Player 4"]);
    const spaceActivities = getSpaceActivities();
    const eventActivities = getEventActivities();

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
            console.log("moving");
            const space = game.currentPlayer.currentSpace;
            const nextSpace = space.nextSpaces[0];

            game.currentPlayer.currentSpace = game.map[nextSpace];

            const nextSpaceEvent = game.map[nextSpace].event;
            if(nextSpaceEvent !== EventType.none && eventActivities.has(nextSpaceEvent))
            {
                console.log("event")
                const eventActivity = eventActivities.get(nextSpaceEvent)!;
                let playerDecision: number | undefined = undefined;
                setHandler(playerDecisionSignal, async (props) => {
                    if(props.player == game.currentPlayer.number)
                        playerDecision = props.decision;
                });
                await condition(()=>playerDecision !== undefined)
                setHandler(playerDecisionSignal, ()=>{});
                try
                {
                    game = await eventActivity(game, playerDecision!);
                }
                catch(err){
                    log.error("Failed to buy star");
                }
                i--;
            }
        }
        if(spaceActivities.has(game.currentPlayer.currentSpace.type))
            game = await spaceActivities.get(game.currentPlayer.currentSpace.type)!(game);
        
        game.currentPlayer = game.currentPlayer.number == game.players.length - 1 ?
                        game.players[0] : game.players[game.currentPlayer.number + 1]
    }
}