import { observer } from 'mobx-react';
import { monsterStore } from '../../stores/monster-store';
import DiceButton from '../dice/DiceButton';
import { handfull } from '../../stores/dice-store';

function statRectangle(statName: string, statValue: number) {
    const modifier = Math.ceil((statValue - 10) / 2);
    const modifierString = modifier >= 0 ? `+${modifier}` : `${modifier}`;
    
    return <div style={{border: 'solid 1px black'}}>
        <div>{statName}</div>
        <div>{statValue}</div>
        <div>{modifierString}</div>
    </div>
}

function MonsterBlock(): React.JSX.Element | null {
    const { activeMonster } = monsterStore;

    if(!activeMonster) {
        return null;
    }

    console.log(activeMonster.hit_points_roll);

    return <div style={{marginBottom: '10px'}}>
        <p>{activeMonster.name}</p>
        <p>{activeMonster.size}</p>
        <p>{activeMonster.type}</p>
        <p>{activeMonster.hit_points}</p>
        <p>{activeMonster.hit_dice}</p>
        <p>{activeMonster.hit_points_roll}</p>
        <DiceButton dice={new handfull(activeMonster.hit_points_roll)} />

        <div style={{display: 'flex', flexDirection: 'row'}}>
            {statRectangle('STR', activeMonster.strength)}
        </div>
    </div>;
}

export default observer(MonsterBlock);
