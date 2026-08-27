import { handfull } from '../classes/handfull-class';

export function parseDiceCookie(diceCookie: string) {
    return diceCookie.split(',').map((handfullString) => {
        const [diceString, name] = handfullString.split('|');
        return new handfull(diceString, name);
    });
}

const NEW_REGEX = /[+-]?\s?[0-9]?d[0-9]+/g;

export function parseDiceString(diceString: string) {
    const matches = [...diceString.matchAll(NEW_REGEX)].map(match => match[0].replace(' ', ''));
}
