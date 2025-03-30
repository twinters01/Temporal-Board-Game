import { IGame } from "./models/game";
import { IPlayer } from "./models/player";
import { map1 } from "./maps";

export async function rollDice(): Promise<number> {
    return 1 + Math.floor((Math.random() * 6))
}

export async function generateGame(names: string[]): Promise<IGame> {
    if(names.length < 1)
        throw new Error("No players");
        
    var map = map1;

    var players: IPlayer[] = names.map((name, index): IPlayer=> ({
        number: index,
        name,
        coins: 10,
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