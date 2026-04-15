import { observer } from 'mobx-react';
import { monsterStore } from '../../../stores/monster-store';
import DiceButton from '../dice/DiceButton';
import { handfull } from '../../../classes/handfull-class';
import { splitTextAroundMatches } from '../../../helpers/monster-helper';
import { Style } from 'node:util';
import { CSSProperties } from 'react';

function getSaveProficiency(statName: string): number {
    const { proficiencies } = monsterStore.activeMonster;
    const saveProficiency = proficiencies.find((element: any) => element.proficiency.index === `saving-throw-${statName.toLocaleLowerCase()}`)

    if (saveProficiency) {
        return saveProficiency.value;
    }
    return 0;
}

const sharedStyle: CSSProperties = {
    width: '24px',
    display: 'inline-block',
    margin: '1px',
    // width: '8%',
    fontSize: '12px',
    verticalAlign: 'top',
    // color: '#6d0000',
    fontFamily: 'Open Sans, arial, sans-serif',
    boxSizing: 'border-box',
    MozBoxSizing: 'border-box',
    lineHeight: '21px',
    backgroundColor: 'rgb(240, 240, 240)'
}

const CAR1: CSSProperties = {
    ...sharedStyle,
    fontVariant: 'small-caps',
    textAlign: 'left',
    fontWeight: 'bold',
}

const CAR2: CSSProperties = {
    ...sharedStyle,
    textAlign: 'center',
}

function statRectangle(statName: string, statValue: number) {
    const saveProficiency = getSaveProficiency(statName);

    const modifier = Math.ceil((statValue - 10) / 2);
    const modifierString = modifier >= 0 ? `+${modifier}` : `${modifier}`;

    return <div style={{}}>
        <div style={CAR1}>{statName}</div>
        <div style={CAR2}>{statValue}</div>
        <DiceButton dice={new handfull('1d20' + modifierString, `${modifierString}`)} />
        {!saveProficiency ? null : <DiceButton dice={new handfull(`1d20+${saveProficiency}`, `+${saveProficiency} save`)} />}
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

function getTraits(traits: action[]) {
    const traitRows = traits.map(trait => {
        return <div style={{ marginTop: '15px' }}>
            <span style={{ fontWeight: 'bold', marginRight: '5px' }}>{trait.name}</span>
            {splitTextAroundMatches(trait.desc)}
        </div>
    });

    return (<div>
        {traitRows}
    </div>);
}

function getSkills() {
    const { proficiencies } = monsterStore.activeMonster;
    const skillProficiencies = proficiencies.filter((element: any) => element.proficiency.index.split('-')[0] === 'skill');
    const handfulls = skillProficiencies.map((skill: any) => {
        const skillName = skill.proficiency.index.split('-')[1];
        const skillValue = skill.value;
        return <DiceButton dice={new handfull(`1d20+${skillValue}`, `+${skillValue} ${skillName}`)} />
    });

    return (<div style={{marginTop: '5px'}}>
        {handfulls}
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

        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '5px' }}>
            {statRectangle('Str', activeMonster.strength)}
            {statRectangle('Dex', activeMonster.dexterity)}
            {statRectangle('Con', activeMonster.constitution)}
            {statRectangle('Int', activeMonster.intelligence)}
            {statRectangle('Wis', activeMonster.wisdom)}
            {statRectangle('Cha', activeMonster.charisma)}
        </div>
        {getSkills()}


        <div style={{fontSize: '24px', marginTop: '10px'}}>{'Traits'}</div>
        {getTraits(activeMonster.special_abilities)}

        <div style={{fontSize: '24px', marginTop: '10px'}}>{'Actions'}</div>
        {getActions(activeMonster.actions)}
    </div>;
}

export default observer(MonsterBlock);
