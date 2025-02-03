import { IGame } from "../models/game";

export async function blueSpace(game: IGame) {
    game.currentPlayer.coins += 3;
}

export async function redSpace(game: IGame) {
    game.currentPlayer.coins -= 3;
}