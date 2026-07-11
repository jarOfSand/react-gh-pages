import { observer } from 'mobx-react';
import { encounterStore, setPlayerCount, setPlayerLevel, setEnemyCount } from '../../stores/encounter-store';
import Column from '../common/Column';
import Row from '../common/Row';

const CR_XP_VALUES = [
    {cr: '0', xp: 10},
    {cr: '1/8', xp: 25},
    {cr: '1/4', xp: 50},
    {cr: '1/2', xp: 100},
    {cr: '1', xp: 200},
    {cr: '2', xp: 450},
    {cr: '3', xp: 700},
    {cr: '4', xp: 1100},
    {cr: '5', xp: 1800},
    {cr: '6', xp: 2300},
    {cr: '7', xp: 2900},
    {cr: '8', xp: 3900},
    {cr: '9', xp: 5000},
    // TODO: add CRs 10 - ??
]

function getMultiplierIndex() {
    const {enemyCount} = encounterStore;
    
    if(enemyCount > 14) {
        return 6;
    }
    
    if(enemyCount > 10) {
        return 5;
    }
    
    if(enemyCount > 6) {
        return 4;
    }
    
    if(enemyCount > 2) {
        return 3;
    }
    
    if(enemyCount === 2) {
        return 2;
    }
    
    return 1;
}

function getMultiplier() {
    const {pcCount} = encounterStore;
    const index = getMultiplierIndex();

    if(pcCount < 3) {
        return MULTIPLIERS_V2[index + 1];
    }

    if(pcCount > 5) {
        return MULTIPLIERS_V2[index - 1];
    }

    return MULTIPLIERS_V2[index];
}

const MULTIPLIERS_V2 = [
    0.5,
    1,
    1.5,
    2,
    2.5,
    3,
    4,
    5
]

type xpThreshold = {
    level: number,
    easy: number,
    medium: number,
    hard: number,
    deadly: number
}
const XP_THRESHOLDS_BY_PC_LEVEL: xpThreshold[] = [
    {level: 1, easy: 25, medium: 50, hard: 75, deadly: 100},
    {level: 2, easy: 50, medium: 100, hard: 150, deadly: 200},
    {level: 3, easy: 75, medium: 150, hard: 225, deadly: 400},
    {level: 4, easy: 125, medium: 250, hard: 375, deadly: 500},
    {level: 5, easy: 250, medium: 500, hard: 750, deadly: 1100},
    {level: 6, easy: 300, medium: 600, hard: 900, deadly: 1400},
    // TODO: add levels 7 - 20
]

function getXP() {
    const { pcLevel} = encounterStore;

    const multiplier = getMultiplier();
    const {easy, medium, hard, deadly} = XP_THRESHOLDS_BY_PC_LEVEL.find(row => row.level === pcLevel) as xpThreshold;

    return `easy ${easy * multiplier}, medium ${medium * multiplier}, hard ${hard * multiplier}, deadly ${deadly * multiplier}`;
}

function Encounter() {
    const { pcCount, pcLevel, enemyCount} = encounterStore;

    return (<Column style={{ margin: '20px 0' }}>
        <div>{'Encounter xp calculator'}</div>
        <Row>
            <Column style={{marginRight: '20px'}}>
                <div>{'pc count'}</div>
                <div>{'pc level'}</div>
                <div>{'enemy count'}</div>
                <div>{'encounter xp'}</div>
                <div>{'multiplier'}</div>
            </Column>
            <Column>
                <input type='number' onChange={(e) => { setPlayerCount(e.target.value) }} value={pcCount} />
                <input type='number' onChange={(e) => { setPlayerLevel(e.target.value) }} value={pcLevel} />
                <input type='number' onChange={(e) => { setEnemyCount(e.target.value) }} value={enemyCount} />
                <div>{getXP()}</div>
                <div>{getMultiplier()}</div>
            </Column>
        </Row>
    </Column>);
}

export default observer(Encounter);
