import { handfull } from '../stores/dice-store';
import DiceButton from '../components/tools/dice/DiceButton';

const MOD_REGEXP = /^[+-]\d+[^d]/;
const COMBO_REGEXP = /((\d+d\d+)(\s?[-+]\s?((\d+d\d+)|(\d+))*)*|[+-]\d+[^d])/g;

function getButtonMatches(text: string): string[] {
    return [...text.matchAll(COMBO_REGEXP)].map(match => match[0]);
}

function isD20(match: string): boolean {
    return MOD_REGEXP.test(match);
}

export function splitTextAroundMatches(text: string): React.JSX.Element[] {
    const matches = getButtonMatches(text);

    const output: React.JSX.Element[] = [];
    let remainingText = text;

    matches.forEach((match) => {
        const matchIndex = remainingText.indexOf(match);
        const plaintext = remainingText.slice(0, matchIndex);
        const remainder = remainingText.slice(matchIndex + match.length);

        const dice = isD20(match) ? new handfull(`1d20${match}`, match) : new handfull(match);

        output.push(<span>{plaintext}</span>)
        output.push(<DiceButton dice={dice} key={dice.id}/>)

        remainingText = remainder;
    });
    output.push(<span>{remainingText}</span>)

    return output;
}