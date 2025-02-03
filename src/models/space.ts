import { IPlayer } from "./player";

export interface ISpace{
    index: number;
    type: SpaceType;
    event: EventType;
    nextSpaces: number[];
    skipSpace: Boolean;
}

export enum SpaceType {
    blue,
    red
}

export enum EventType {
    star,
    none
}