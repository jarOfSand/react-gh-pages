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

type ability = {
    name: string,
    desc: string,
    usage?: {
        type: string,
        times: number,
        rest_types: string[]
    }
}


function getSkills() {
    const { proficiencies } = monsterStore.activeMonster;
    const skillProficiencies = proficiencies.filter((element: any) => element.proficiency.index.split('-')[0] === 'skill');
    const handfulls = skillProficiencies.map((skill: any) => {
        const skillName = skill.proficiency.index.split('-')[1];
        const skillValue = skill.value;
        return <DiceButton dice={new handfull(`1d20+${skillValue}`, `+${skillValue} ${skillName}`)} />
    });


    return (<div style={{ marginTop: '5px' }}>
        <strong>{'Skills '}</strong>{handfulls}
    </div>);
}

function getAbilities(abilities: ability[]) {
    const traitRows = abilities.map(ability => {
        return <div style={{ marginTop: '15px' }}>
            <span style={{ fontWeight: 'bold', marginRight: '5px' }}>{ability.name}</span>
            {!ability.usage ? null : <span style={{ fontWeight: 'bold', marginRight: '5px' }}>{`(${ability.usage.times}/${ability.usage.type})`}</span>}
            {splitTextAroundMatches(ability.desc)}
        </div>
    });

    return (<>
        <div style={{ fontSize: '24px', marginTop: '10px' }}>{'Traits'}</div>
        {traitRows}
    </>);
}

function getArmorClass() {
    const { activeMonster } = monsterStore;

    const primaryAC = activeMonster.armor_class[0].value;
    return <div><strong>{'AC'}</strong>{` ${primaryAC}`}</div>
}

function getSpeed() {
    const { activeMonster } = monsterStore;
    const {speed} = activeMonster;
    const {walk} = speed;

    const speedStrings: string[] = [];
    if(walk){
        speedStrings.push(walk);
    }

    console.log('');
    ['fly', 'swim', 'climb', 'burrow'].forEach(speedName => {
        console.log('speedName', speedName);
        const value = speed[speedName]
        if(value){
            console.log('value', value);
            speedStrings.push(`${speedName} ${value}`);
        }
    });

    return <div><strong>{'Speed'}</strong>{` ${speedStrings.join(', ')}`}</div>
}

function MonsterBlock(): React.JSX.Element | null {
    const { activeMonster } = monsterStore;

    if (!activeMonster) {
        return null;
    }

    return <div style={{ overflowY: 'auto', flexGrow: 1 }}>
        <div style={{fontSize: 'larger', fontWeight: 'bold'}}>{activeMonster.name}</div>
        <div style={{fontSize: 'smaller', marginBottom: '10px'}}>{`${activeMonster.size} ${activeMonster.type}`}</div>
        {getArmorClass()}
        <div><strong>{'HP'}</strong>{` ${activeMonster.hit_points} `}<DiceButton dice={new handfull(activeMonster.hit_points_roll)} /></div>
        {getSpeed()}

        <div style={{ display: 'flex', flexDirection: 'column', marginTop: '5px' }}>
            {statRectangle('Str', activeMonster.strength)}
            {statRectangle('Dex', activeMonster.dexterity)}
            {statRectangle('Con', activeMonster.constitution)}
            {statRectangle('Int', activeMonster.intelligence)}
            {statRectangle('Wis', activeMonster.wisdom)}
            {statRectangle('Cha', activeMonster.charisma)}
        </div>
        {getSkills()}
        <div><strong>{'Languages'}</strong>{` ${activeMonster.languages}`}</div>
        <div><strong>{'CR'}</strong>{` ${activeMonster.challenge_rating}`}</div>
        {getAbilities(activeMonster.special_abilities)}

        <div style={{ fontSize: '24px', marginTop: '10px' }}>{'Actions'}</div>
        {getActions(activeMonster.actions)}
    </div>;
}

export default observer(MonsterBlock);
