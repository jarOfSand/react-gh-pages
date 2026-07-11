import {observable, action} from 'mobx';


type mirrorState = {
    plaintext: string
}

export const mirrorStore: mirrorState = observable({
    plaintext: ''
});

export const setPlaintext = action((plaintext: string) => {
    mirrorStore.plaintext = plaintext;
});
