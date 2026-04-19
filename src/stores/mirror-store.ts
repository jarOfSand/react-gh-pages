import {observable, action} from 'mobx';


type toolState = {
    plaintext: string
}

export const mirrorStore: toolState = observable({
    plaintext: ''
});

export const setPlaintext = action((plaintext: string) => {
    mirrorStore.plaintext = plaintext;
});
