import {greet} from './activities';

export async function helloWorld()
{
    return {greeting: await greet()};
}