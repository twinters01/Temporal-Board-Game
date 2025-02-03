import { proxyActivities } from "@temporalio/workflow";
import { IGame } from "../models/game";
import { SpaceType } from "../models/space";
import * as spaceActivities from "./spaceActivities";

export type SpaceActivity = (game: IGame) => void;

const {redSpace, blueSpace} = proxyActivities<typeof spaceActivities>({startToCloseTimeout: '30 seconds'});

export function getSpaceActivities():Map<SpaceType, SpaceActivity> {
    const map = new Map<SpaceType, SpaceActivity>();

    map.set(SpaceType.blue, (game: IGame) => blueSpace);
    map.set(SpaceType.red, (game: IGame) => redSpace);

    return map;
}