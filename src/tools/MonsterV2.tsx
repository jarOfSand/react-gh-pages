import { observer } from 'mobx-react';
import { monsterStore, setActiveMonster } from '../stores/monster-store';
import HandfullButton from './dice/HandfullButton';
import { handfull } from '../stores/dice-store';
import RollResultsQueue from './dice/RollResultsQueue';
import { monsterListItem } from '../stores/monster-store';

// const hellhoundBite = `Bite. Melee Weapon Attack: +5 to hit, reach 5 ft., one target. Hit: 7 (1d8 + 3) piercing damage plus 7 (2d6) fire damage.`;

const dragon = `Ancient Red Dragon
[ Dragon rouge, ancien ]
Gargantuan dragon (Chromatic), chaotic evil
Armor Class 22 (natural armor)
Hit Points 546 (28d20 + 252)
Speed 40 ft., climb 40 ft., fly 80 ft.
STR
30 (+10)
DEX
10 (+0)
CON
29 (+9)
INT
18 (+4)
WIS
15 (+2)
CHA
23 (+6)
Saving Throws Dex +7, Con +16, Wis +9, Cha +13
Skills Perception +16, Stealth +7
Damage Immunities fire
Senses blindsight 60 ft., darkvision 120 ft., passive Perception 26
Languages Common, Draconic
Challenge 24 (62000 XP)

Legendary Resistance (3/Day). If the dragon fails a saving throw, it can choose to succeed instead.
Actions

Multiattack. The dragon can use its Frightful Presence. It then makes three attacks: one with its bite and two with its claws.

Bite. Melee Weopon Attack: +17 to hit, reach 15 ft., one target. Hit: 21 (2d10 + 10) piercing damage plus 14 (4d6) fire damage.

Claw. Melee Weapon Attack: +17 to hit, reach 10 ft., one target. Hit: 17 (2d6 + 10) slashing damage.

Tail. Melee Weapon Attack: +17 to hit, reach 20 ft., one target. Hit: 19 (2d8 + 10) bludgeoning damage.

Frightful Presence. Each creature of the dragon's choice that is within 120 feet of the dragon and aware of it must succeed on a DC 21 Wisdom saving throw or become frightened for 1 minute. A creature can repeat the saving throw at the end of each of its turns, ending the effect on itself on a success. If a creature's saving throw is successful or the effect ends for it, the creature is immune to the dragon's Frightful Presence for the next 24 hours.

Fire Breath (Recharge 5-6). The dragon exhales fire in a 90-foot cone. Each creature in that area must make a DC 24 Dexterity saving throw, taking 91 (26d6) fire damage on a failed save, or half as much damage on a successful one.
Legendary actions

The dragon can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature's turn. The dragon regains spent legendary actions at the start of its turn.

Detect. The dragon makes a Wisdom (Perception) check.

Tail Attack. The dragon makes a tail attack.

Wing Attack (Costs 2 Actions). The dragon beats its wings. Each creature within 15 feet of the dragon must succeed on a DC 25 Dexterity saving throw or take 17 (2d6 + 10) bludgeoning damage and be knocked prone. The dragon can then fly up to half its flying speed.`;

const MOD_REGEXP = /[+-]\d+/; // matches +3, +12, -3, -10
const COMBO_REGEXP = /[\s\(]([+-]\d+|(?:(?:[0-9]+d[0-9]+)(?:\s\+\s[0-9]+d[0-9]+)*(?:\s\+\s[0-9]+)*))/g

function getButtonMatches(text: string): string[] {
    return [...text.matchAll(COMBO_REGEXP)].map(match => match[1]);
}

function isD20(match: string): boolean {
    return MOD_REGEXP.test(match);
}

function splitTextAroundMatches(text: string): React.JSX.Element[] {
    const matches = getButtonMatches(text);

    let output: React.JSX.Element[] = [];
    let remainingText = text;

    matches.forEach((match, index) => {
        const matchIndex = remainingText.indexOf(match);
        const plaintext = remainingText.slice(0, matchIndex);
        const remainder = remainingText.slice(matchIndex + match.length);

        const dice = isD20(match) ? new handfull(`1d20${match}`, match) : new handfull(match);

        output.push(<span>{plaintext}</span>)
        output.push(<HandfullButton dice={dice} index={index}/>)

        remainingText = remainder;
    });
    output.push(<span>{remainingText}</span>)

    return output;
}

function getMonsterSelector(monsterList: monsterListItem[], setActiveMonster: Function) {
    const options = monsterList.map((monsterListItem) => {
        return <option value={monsterListItem.index}>{monsterListItem.name}</option>
    });

    return <select name={'monster'} onChange={(e) => setActiveMonster(e.target.value)}>{options}</select>
}

function MonsterV2() {
    const { monsterList, activeMonster } = monsterStore;
    
    return (
        <div>
            {getMonsterSelector(monsterList, setActiveMonster)}
            <p>{activeMonster && splitTextAroundMatches(JSON.stringify(activeMonster))}</p>
            <RollResultsQueue/>
        </div>);
}

export default observer(MonsterV2);
