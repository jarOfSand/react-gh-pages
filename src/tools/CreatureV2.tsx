import { observer } from 'mobx-react';
import { creatureStore } from '../stores/creature-store';

const crocActions = `Bite. Melee Weapon Attack: +4 to hit, reach 5 ft., one creature. Hit: 7 (1d10 + 2) piercing damage, and the target is grappled (escape DC 12). Until this grapple ends, the target is restrained, and the crocodile can't bite another target.`;

function findHandfulls(text: string): string[] {
    const regexp = /(?:(?:[0-9]+d[0-9]+)|(?:\s\+\s)|[0-9])+/g;

    const matches = [];//[...text.matchAll(regexp)];
    return [];
}

function CreatureV2() {
    const { activeCreature } = creatureStore;
    
    return (
        <div>
            <p>{crocActions}</p>
            <p>{findHandfulls(crocActions)}</p>
        </div>);
}

export default observer(CreatureV2);