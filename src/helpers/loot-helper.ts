import { handfull } from '../classes/handfull-class';

const Chance = require('chance');
const chance = new Chance();

type currency = 'cp' | 'sp' | 'ep' | 'gp' | 'pp';

const CURRENCY_MULTIPLIERS = {
    cp: 1,
    sp: 10,
    ep: 50,
    gp: 100,
    pp: 1000
}

type loot = {
    lootString: string,
    raw_cp: number
}

export function rollLoot(cr: number): loot {
    const lootRolls = getLootRolls(cr);

    const raw_cp = lootRolls.reduce((total, lootRoll) => {
        const newHandfull = new handfull(lootRoll.roll);
        const result = newHandfull.roll().total;
        const currencyMult = CURRENCY_MULTIPLIERS[lootRoll.unit];
        
        return total + (result * currencyMult * (lootRoll.multiplier ?? 1))
    }, 0);
    
    const loot = [];

    const gp = Math.floor(raw_cp / 100);
    if(gp){
        loot.push(`${gp} gp`)
    }

    const cp = raw_cp % 100;
    if(cp){
        loot.push(`${cp} cp`)
    }

    const lootString = loot.join(', ');

    return {lootString, raw_cp};
}

type lootRoll = {
    roll: string,
    unit: currency,
    multiplier?: number
}

function getLootRolls(cr: number): lootRoll[] {
    const percentile = chance.d100();

    if (cr <= 4) {
        return lootIndividual_0_4(percentile);
    }
    if (cr <= 10) {
        return lootIndividual_5_10(percentile);
    }
    if (cr <= 16) {
        return lootIndividual_11_16(percentile);
    }
    return lootIndividual_17plus(percentile);
}

function lootIndividual_0_4(percentile: number): lootRoll[] {
    if (percentile <= 30) {
        return [{ roll: '5d6', unit: 'cp' }]; // max 30cp
    }
    if (percentile <= 60) {
        return [{ roll: '4d6', unit: 'sp' }]; // max 24sp or 240cp or 2gp 40cp
    }
    if (percentile <= 70) {
        return [{ roll: '3d6', unit: 'ep' }]; // max 18ep or 900cp or 9gp
    }
    if (percentile <= 95) {
        return [{ roll: '3d6', unit: 'gp' }]; // max 18gp or 1800cp
    }
    return [{ roll: '1d6', unit: 'pp' }]; // max 6pp or 6000cp or 60gp
}

function lootIndividual_5_10(percentile: number): lootRoll[] {
    if (percentile <= 30) {
        return [
            { roll: '4d6', unit: 'cp', multiplier: 100 },
            { roll: '1d6', unit: 'ep', multiplier: 10 }
        ];
    }
    if (percentile <= 60) {
        return [
            { roll: '6d6', unit: 'sp', multiplier: 10 },
            { roll: '2d6', unit: 'gp', multiplier: 10 }
        ];
    }
    if (percentile <= 70) {
        return [
            { roll: '3d6', unit: 'ep', multiplier: 10 },
            { roll: '2d6', unit: 'gp', multiplier: 10 }
        ];
    }
    if (percentile <= 95) {
        return [
            { roll: '4d6', unit: 'gp', multiplier: 10 },
        ];
    }
    return [
        { roll: '2d6', unit: 'gp', multiplier: 10 },
        { roll: '3d6', unit: 'pp' }
    ];
}

function lootIndividual_11_16(percentile: number): lootRoll[] {
    if (percentile <= 20) {
        return [
            { roll: '2d6', unit: 'sp', multiplier: 10 },
            { roll: '1d6', unit: 'gp', multiplier: 100 }
        ];
    }
    if (percentile <= 35) {
        return [
            { roll: '1d6', unit: 'ep', multiplier: 100 },
            { roll: '1d6', unit: 'gp', multiplier: 100 }
        ];
    }
    if (percentile <= 75) {
        return [
            { roll: '2d6', unit: 'gp', multiplier: 100 },
            { roll: '1d6', unit: 'pp', multiplier: 10 }
        ];
    }
    return [
        { roll: '2d6', unit: 'gp', multiplier: 100 },
        { roll: '2d6', unit: 'pp', multiplier: 10 }
    ];
}

function lootIndividual_17plus(percentile: number): lootRoll[] {
    if (percentile <= 15) {
        return [
            { roll: '2d6', unit: 'ep', multiplier: 1000 },
            { roll: '8d6', unit: 'gp', multiplier: 100 }
        ];
    }
    if (percentile <= 55) {
        return [
            { roll: '1d6', unit: 'gp', multiplier: 1000 },
            { roll: '1d6', unit: 'pp', multiplier: 100 }
        ];
    }
    return [
        { roll: '1d6', unit: 'gp', multiplier: 1000 },
        { roll: '2d6', unit: 'pp', multiplier: 100 }
    ];
}

export function getLootItem(raw_cp: number): string {
    if(raw_cp <= 10) { // 1sp

    }
    if(raw_cp <= 50) { // 1ep

    }
    if(raw_cp <= 100) { // 1gp

    }
    
    const gp = Math.floor(raw_cp / 100);
    if(gp <= 10) {

    }
    if(gp <= 100) {

    }
    if(gp <= 500) {

    }
    return '';
}
