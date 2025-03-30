import { IGame } from "../models/game";

export async function blueSpace(game: IGame) {
    console.log("blue space")
    game.currentPlayer.coins += 10;
    game.players[game.currentPlayer.number] = game.currentPlayer;

    return game;
}

export async function redSpace(game: IGame) {
    game.currentPlayer.coins -= 3;

    return game;
}