import { handfull } from '../classes/handfull-class';

export function parseDiceCookie(diceCookie: string) {
    return diceCookie.split(',').map((handfullString) => {
        const [diceString, name] = handfullString.split('|');
        return new handfull(diceString, name);
    });
}

export function sum(results: number[]): number {
    return results.reduce((sum, result) => {
        return sum + result;
    }, 0);
}

export function getMatches(input: string, regex: RegExp) {
    return [...input.matchAll(regex)].map(match => match[0]);
}

export function removeAllSubstrings(text: string, substrings: string[]): string {
    return substrings.reduce((result: string, substring: string) => {
        return result.replace(substring, '');
    }, text);
}
