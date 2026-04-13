import { observer } from 'mobx-react';
import { monsterStore } from '../../../stores/monster-store';
import DiceButton from '../dice/DiceButton';
import { handfull } from '../../../classes/handfull-class';
import { splitTextAroundMatches } from '../../../helpers/monster-helper';

function statRectangle(statName: string, statValue: number) {
    const modifier = Math.ceil((statValue - 10) / 2);
    const modifierString = modifier >= 0 ? `+${modifier}` : `${modifier}`;
    return <div style={{ border: 'solid 1px black', width: '50px' }}>
        <div>{statName}</div>
        <div>{statValue}</div>
        <DiceButton dice={new handfull('1d20' + modifierString, modifierString)} />
    </div>
}

type action = {
    name: string,
    desc: string
}

function getActions(actions: action[]) {
    const actionRows = actions.map(action => {
        return <div style={{ marginTop: '15px' }}>
            <span style={{ fontWeight: 'bold', marginRight: '5px' }}>{action.name}</span>
            {splitTextAroundMatches(action.desc)}
        </div>
    });

    return (<div>
        {actionRows}
    </div>);
}

function MonsterBlock(): React.JSX.Element | null {
    const { activeMonster } = monsterStore;

    if (!activeMonster) {
        return null;
    }

    return <div style={{ overflowY: 'auto', flexGrow: 1 }}>
        <div>{activeMonster.name}</div>
        <div>{`${activeMonster.size} ${activeMonster.type}`}</div>
        <div>{`${activeMonster.hit_points} hp `}<DiceButton dice={new handfull(activeMonster.hit_points_roll)} /></div>
        <div style={{ display: 'flex', flexDirection: 'row', marginTop: '10px' }}>
            {statRectangle('STR', activeMonster.strength)}
            {statRectangle('DEX', activeMonster.dexterity)}
            {statRectangle('CON', activeMonster.constitution)}
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '10px' }}>
            {statRectangle('INT', activeMonster.intelligence)}
            {statRectangle('WIS', activeMonster.wisdom)}
            {statRectangle('CHA', activeMonster.charisma)}
        </div>

        {getActions(activeMonster.actions)}
    </div>;
}

export default observer(MonsterBlock);
