import {observable, action} from 'mobx';

type caesarState = {
    cyphertext: string
}

export const caesarStore: caesarState = observable({
    cyphertext: ''
});

export const setCyphertext = action((cyphertext: string) => {
    caesarStore.cyphertext = cyphertext;
});
