import {observable, action} from 'mobx';

type npcState = {
    profession: string,
    species: string,
    subspecies: string,
    magicType: string,
    weapon: string,
}

export const npcStore: npcState = observable({
    profession: '',
    species: '',
    subspecies: '',
    magicType: '',
    weapon: '',
});

export const setProfession = action((profession: string) => {
    npcStore.profession = profession;
});

export const setSpecies = action((species: string) => {
    npcStore.species = species;
});

export const setSubspecies = action((subspecies: string) => {
    npcStore.subspecies = subspecies;
});

export const setMagicType = action((magicType: string) => {
    npcStore.magicType = magicType;
});

export const setWeapon = action((weapon: string) => {
    npcStore.weapon = weapon;
});
