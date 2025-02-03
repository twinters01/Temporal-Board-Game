import { IPlayer } from "./player";
import { ISpace } from "./space";

export interface IGame {
    map: ISpace[],
    players: IPlayer[],
    currentPlayer: IPlayer;
}