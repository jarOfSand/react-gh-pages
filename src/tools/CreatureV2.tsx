import { observer } from 'mobx-react';
import { creatureStore } from '../stores/creature-store';
import HandfullButton from './dice/HandfullButton';
import { handfull } from '../stores/dice-store';
import RollResultsQueue from './dice/RollResultsQueue';

const hellhoundBite = `Bite. Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 7 (1d8 + 3) piercing damage plus 7 (2d6) fire damage.`;

function findDiceStrings(text: string): string[] {
    const regexp = /(?:(?:[0-9]+d[0-9]+)(?:\s\+\s[0-9]+d[0-9]+)*(?:\s\+\s[0-9]+)*)/g; // matches 1d4, 2d8 + 4, 3d12 + 1d3 + 4

    const matches = [...text.matchAll(regexp)];
    return matches.map(match => match[0]);
}

function splitTextAroundMatches(text: string): React.JSX.Element[] {
    const matches = findDiceStrings(text);

    let output: React.JSX.Element[] = [];
    let remainingText = text;

    matches.forEach((match, index) => {
        const [plaintext, remainder] = remainingText.split(match);

        output.push(<span>{plaintext}</span>)
        output.push(<HandfullButton dice={new handfull(match)} index={index}/>)

        remainingText = remainder;
    });
    output.push(<span>{remainingText}</span>)

    return output;
}

function CreatureV2() {
    const { activeCreature } = creatureStore;
    
    return (
        <div>
            <p>{splitTextAroundMatches(hellhoundBite)}</p>
            <RollResultsQueue/>
        </div>);
}

export default observer(CreatureV2);
