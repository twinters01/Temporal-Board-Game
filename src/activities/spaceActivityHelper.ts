import { proxyActivities } from "@temporalio/workflow";
import { IGame } from "../models/game";
import { EventType, SpaceType } from "../models/space";
import * as spaceActivities from "./spaceActivities";
import * as eventActivities from "./eventActivities";

export type SpaceActivity = (game: IGame) => Promise<IGame>;
export type EventActivity = (game: IGame, playerDecision: number) => Promise<IGame>;

const {redSpace, blueSpace} = proxyActivities<typeof spaceActivities>({startToCloseTimeout: '30 seconds'});
const {starEvent} = proxyActivities<typeof eventActivities>({startToCloseTimeout: '30 seconds'});

export function getSpaceActivities():Map<SpaceType, SpaceActivity> {
    const map = new Map<SpaceType, SpaceActivity>();

    map.set(SpaceType.blue, (game: IGame) => blueSpace(game));
    map.set(SpaceType.red, (game: IGame) => redSpace(game));

    return map;
}

export function getEventActivities():Map<EventType, EventActivity> {
    const map = new Map<EventType, EventActivity>();

    map.set(EventType.star, (game: IGame, playerDecision: number) => starEvent(game, playerDecision))

    return map;
}