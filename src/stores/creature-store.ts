import { observable, action } from 'mobx';

type creatureState = {
    activeCreature: string
}

export const creatureStore: creatureState = observable({
    activeCreature: ''
});

export const setActiveCreature = action((activeCreature: string) => {
    creatureStore.activeCreature = activeCreature;
});
