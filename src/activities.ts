import { IGame } from "./models/game";
import { IPlayer } from "./models/player";
import { EventType, ISpace, SpaceType } from "./models/space";

export async function rollDice(): Promise<number> {
    return 1 + Math.floor((Math.random() * 6))
}

export async function generateGame(names: string[]): Promise<IGame> {
    if(names.length < 1)
        throw new Error("No players");
        
    var prevSpace: ISpace | null = null;
    var map: ISpace[] = new Array<ISpace>(20).fill({} as unknown as ISpace).map((_, index): ISpace => {
        var space = {
            index: index,
            type: SpaceType.blue,
            event: EventType.none,
            players: [],
            skipSpace: false,
            nextSpaces: []
        };
        if(prevSpace)
            prevSpace.nextSpaces = [index];
        
        prevSpace = space;
        return space; 
    });

    var players: IPlayer[] = names.map((name, index): IPlayer=> ({
        number: index,
        name,
        coins: 0,
        stars: 0,
        currentSpace: map[0]
    }));
    const game: IGame = {
        map,
        players,
        currentPlayer: players[0]
    };
    return game;
}