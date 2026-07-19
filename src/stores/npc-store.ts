import { observable, action } from 'mobx';

export type species = {
    name: string,
    subspecies: string,
    link: string
}

export type subvariant = {
    name: string,
    link: string
}

export type variant = {
    name: string,
    link: string,
    subvariant: string
}

export type profession = {
    name: string,
    item: string
}

type npcState = {
    profession: profession | null,
    species: species | null,
    magicType: string,
    weapon: string,
    variant: variant | null
}

export const npcStore: npcState = observable({
    profession: null,
    species: null,
    magicType: '',
    weapon: '',
    variant: null
});

export const setProfession = action((profession: profession) => {
    npcStore.profession = profession;
});

export const setSpecies = action((species: species) => {
    npcStore.species = species;
});

export const setMagicType = action((magicType: string) => {
    npcStore.magicType = magicType;
});

export const setWeapon = action((weapon: string) => {
    npcStore.weapon = weapon;
});

export const setVariant = action((variant: variant | null) => {
    npcStore.variant = variant;
});
