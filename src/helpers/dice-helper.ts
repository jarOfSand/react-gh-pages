import { handfull } from '../classes/handfull-class';

export function parseDiceCookie(diceCookie: string) {
    return diceCookie.split(',').map((handfullString) => {
        const [diceString, name] = handfullString.split('|');
        return new handfull(diceString, name);
    });
}
