import { ISpace } from "./space";

export interface IPlayer {
    number: number;
    name: string;
    coins: number;
    stars: number;
    currentSpace: ISpace
}