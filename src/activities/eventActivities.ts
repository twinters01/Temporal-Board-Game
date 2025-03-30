import { IGame } from "../models/game";

export async function starEvent(game: IGame, playerDecision: number, starCost: number = 20) {
    if(playerDecision == 1)
    {
        if(game.currentPlayer.coins < starCost)
            throw new Error()
    
        game.currentPlayer.coins -= starCost;
        game.currentPlayer.stars++;
    }

    return game;
}