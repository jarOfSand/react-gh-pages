import { observer } from 'mobx-react';
import { encounterStore, setPlayerCount, setPlayerLevel, setEnemyCount } from '../../stores/encounter-store';
import Column from '../common/Column';
import Row from '../common/Row';
import NumberInput from '../common/NumberInput';

function getMultiplierIndex() {
    const { enemyCount } = encounterStore;

    if (enemyCount > 14) {
        return 6;
    }

    if (enemyCount > 10) {
        return 5;
    }

    if (enemyCount > 6) {
        return 4;
    }

    if (enemyCount > 2) {
        return 3;
    }

    if (enemyCount === 2) {
        return 2;
    }

    return 1;
}

function getMultiplier() {
    const { pcCount } = encounterStore;
    const index = getMultiplierIndex();

    if (pcCount < 3) {
        return MULTIPLIERS[index + 1];
    }

    if (pcCount > 5) {
        return MULTIPLIERS[index - 1];
    }

    return MULTIPLIERS[index];
}

const MULTIPLIERS = [
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
    { level: 1, easy: 25, medium: 50, hard: 75, deadly: 100 },
    { level: 2, easy: 50, medium: 100, hard: 150, deadly: 200 },
    { level: 3, easy: 75, medium: 150, hard: 225, deadly: 400 },
    { level: 4, easy: 125, medium: 250, hard: 375, deadly: 500 },
    { level: 5, easy: 250, medium: 500, hard: 750, deadly: 1100 },
    { level: 6, easy: 300, medium: 600, hard: 900, deadly: 1400 },
    { level: 7, easy: 350, medium: 750, hard: 1100, deadly: 1700 },
    { level: 8, easy: 450, medium: 900, hard: 1200, deadly: 2100 },
    { level: 9, easy: 550, medium: 1100, hard: 1600, deadly: 2400 },
    { level: 10, easy: 600, medium: 1200, hard: 1900, deadly: 2800 },
    { level: 11, easy: 800, medium: 1600, hard: 2400, deadly: 3600 },
    { level: 12, easy: 1000, medium: 2000, hard: 3000, deadly: 4500 },
    { level: 13, easy: 1100, medium: 2200, hard: 3400, deadly: 5100 },
    { level: 14, easy: 1250, medium: 2500, hard: 3800, deadly: 5700 },
    { level: 15, easy: 1400, medium: 2800, hard: 4300, deadly: 6400 },
    { level: 16, easy: 1600, medium: 3200, hard: 4800, deadly: 7200 },
    { level: 17, easy: 2000, medium: 3900, hard: 5900, deadly: 8800 },
    { level: 18, easy: 2100, medium: 4200, hard: 6300, deadly: 9500 },
    { level: 19, easy: 2400, medium: 4900, hard: 7300, deadly: 10900 },
    { level: 20, easy: 2800, medium: 5700, hard: 8500, deadly: 12700 }
];

type difficulty = 'easy' | 'medium' | 'hard' | 'deadly';

function XpRow(props: { row: xpThreshold, multiplier: number, difficulty: difficulty }) {
    const { pcCount } = encounterStore;
    const { row, multiplier, difficulty } = props;

    const xpThreshold = row[difficulty];
    const modifiedXp = (pcCount * xpThreshold / multiplier).toFixed(0);

    return (<div>{`${modifiedXp} xp `}<span style={{ fontSize: 'smaller', color: '#aaa' }}>{`${difficulty}`}</span></div>);
}

function Encounter() {
    const { pcCount, pcLevel, enemyCount } = encounterStore;

    const multiplier = getMultiplier();
    const row = XP_THRESHOLDS_BY_PC_LEVEL.find(row => row.level === pcLevel) as xpThreshold;

    return (
        <Row style={{ marginTop: '20px', marginLeft: '20px' }}>
            <Column style={{ marginRight: '20px', gap: '5px' }}>
                <div>{'pc count'}</div>
                <div>{'pc level'}</div>
                <div>{'enemy count'}</div>
                <div>{'encounter xp'}</div>
            </Column>
            <Column style={{ gap: '5px' }}>
                <NumberInput value={pcCount} setter={setPlayerCount} />
                <NumberInput value={pcLevel} setter={setPlayerLevel} max={20} />
                <NumberInput value={enemyCount} setter={setEnemyCount} />
                <div>
                    <XpRow row={row} multiplier={multiplier} difficulty={'easy'} />
                    <XpRow row={row} multiplier={multiplier} difficulty={'medium'} />
                    <XpRow row={row} multiplier={multiplier} difficulty={'hard'} />
                    <XpRow row={row} multiplier={multiplier} difficulty={'deadly'} />
                </div>
            </Column>
        </Row>);
}

export default observer(Encounter);
