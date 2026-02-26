// 2d4+3
// 1d20
// 1d8+1d4+3
var _ = require('lodash');
const Chance = require('chance');
const chance = new Chance();

export function rollHandfull(handfullString: string): string {
    const handfullArray = handfullString.trim().split('+');

    const handfullResults = handfullArray.map((substring) => {
        if (substring.includes('d')) {
            const diceQuantString = substring.split('d')[0].trim();
            const diceQuant = diceQuantString === '' ? 1 : parseInt(diceQuantString);
            const diceSize = parseInt(substring.split('d')[1].trim());

            const partialResult: number[] = chance.n((): number => chance.natural({ min: 1, max: diceSize }), diceQuant);
            return partialResult
        } else {
            return parseInt(substring.trim());
        }
    });

    const total: number = _.sum(_.flatten(handfullResults));

    return total + ' [' + handfullResults + ']';
}