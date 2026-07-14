import {observable, action} from 'mobx';

type npcState = {
    profession: profession | null,
    species: string,
    subspecies: string,
    magicType: string,
    weapon: string,
    variant: string,
}

type profession = {
    name: string,
    item: string
}

export const npcStore: npcState = observable({
    profession: null,
    species: '',
    subspecies: '',
    magicType: '',
    weapon: '',
    variant: ''
});

export const setProfession = action((profession: profession) => {
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

export const setVariant = action((variant: string) => {
    npcStore.variant = variant;
});
