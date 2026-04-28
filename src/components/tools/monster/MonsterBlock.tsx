import { observer } from 'mobx-react';
import { CSSProperties } from 'react';

import { monsterStore } from '../../../stores/monster-store';
import DiceButton from '../dice/DiceButton';
import { handfull } from '../../../classes/handfull-class';
import { splitTextAroundMatches } from '../../../helpers/monster-helper';
import { ability } from '../../../types/monster';

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

function Actions() {
    const { actions } = monsterStore.activeMonster
    const actionRows = actions.map((action: action) => {
        return <div style={{ marginTop: '15px' }}>
            <span style={{ fontWeight: 'bold', marginRight: '5px' }}>{action.name}</span>
            {splitTextAroundMatches(action.desc)}
        </div>
    });

    return (<>
        <div style={{ fontSize: '24px', marginTop: '10px' }}>{'Actions'}</div>
        <div>
            {actionRows}
        </div>
    </>);
}

function Skills(): React.JSX.Element | null {
    const { proficiencies } = monsterStore.activeMonster;

    const skillProficiencies = proficiencies.filter((element: any) => element.proficiency.index.split('-')[0] === 'skill');

    if (!skillProficiencies.length) {
        return null;
    }

    const handfulls = skillProficiencies.map((skill: any) => {
        const skillName = skill.proficiency.index.split('-')[1];
        const skillValue = skill.value;
        return <DiceButton dice={new handfull(`1d20+${skillValue}`, `+${skillValue} ${skillName}`)} />
    });

    return (<div style={{ marginTop: '5px' }}>
        <strong>{'Skills '}</strong>{handfulls}
    </div>);
}

function Abilities() {
    const { activeMonster } = monsterStore;

    if (!activeMonster.special_abilities.length) {
        return null;
    }

    const traitRows = activeMonster.special_abilities.map((ability: ability) => {
        return <div style={{ marginTop: '15px' }}>
            <span style={{ fontWeight: 'bold', marginRight: '5px' }}>{ability.name}</span>
            {!ability.usage ? null : <span style={{ fontWeight: 'bold', marginRight: '5px' }}>{`(${ability.usage.times}/${ability.usage.type})`}</span>}
            {splitTextAroundMatches(ability.desc)}
        </div>
    });

    return (<>
        <div style={{ fontSize: '24px', marginTop: '10px' }}>{'Abilities'}</div>
        {traitRows}
    </>);
}

function ArmorClass() {
    const { activeMonster } = monsterStore;
    const acStrings: string[] = [];

    activeMonster.armor_class.forEach(element => {
        if (element.type === 'condition') {
            acStrings.push(`${element.value} while ${element.condition.name.toLocaleLowerCase()}`);
        } else if (element.type === 'armor') {
            acStrings.push(`${element.value} with ${element.armor.map(armorPiece => armorPiece.name.toLocaleLowerCase()).join(', ')}`);
        } else {
            acStrings.unshift(element.value);
        }
    })

    return <div><strong>{'AC'}</strong>{` ${acStrings.join(', ')}`}</div>
}

function Senses() {
    const { activeMonster } = monsterStore;

    const senseStrings: string[] = [];

    const keys = Object.keys(activeMonster.senses);
    keys.forEach(key => {
        const value = activeMonster.senses[key];
        if (key === 'passive_perception') {
            senseStrings.unshift(`passive perception ${value}`);
        } else {

            senseStrings.push(`${key} ${value}`);
        }
    })

    return <div>
        <strong>{'Senses '}</strong>
        {senseStrings.join(', ')}
    </div>;
}

function Speed() {
    const { activeMonster } = monsterStore;
    const { speed } = activeMonster;

    const speedStrings: string[] = [];

    if (speed.walk) {
        speedStrings.push(speed.walk);
    }
    ['fly', 'swim', 'climb', 'burrow'].forEach(speedName => {
        const value = speed[speedName]
        if (value) {
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
        <div style={{ fontSize: 'larger', fontWeight: 'bold' }}>{activeMonster.name}</div>
        <div style={{ fontSize: 'smaller', marginBottom: '10px' }}>{`${activeMonster.size} ${activeMonster.type}`}</div>
        <ArmorClass />
        <div><strong>{'HP'}</strong>{` ${activeMonster.hit_points} `}<DiceButton dice={new handfull(activeMonster.hit_points_roll)} /></div>
        <Speed />

        <div style={{marginTop: '5px'}}>
            {statRectangle('Str', activeMonster.strength)}
            {statRectangle('Dex', activeMonster.dexterity)}
            {statRectangle('Con', activeMonster.constitution)}
            {statRectangle('Int', activeMonster.intelligence)}
            {statRectangle('Wis', activeMonster.wisdom)}
            {statRectangle('Cha', activeMonster.charisma)}
        </div>

        <Skills />
        <Senses />
        <div><strong>{'Languages'}</strong>{` ${activeMonster.languages ? activeMonster.languages : 'none'}`}</div>
        <div><strong>{'CR'}</strong>{` ${activeMonster.challenge_rating}`}</div>
        <Abilities />

        <Actions />
    </div>;
}

export default observer(MonsterBlock);
