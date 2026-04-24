import {observable, action} from 'mobx';

type cipherState = {
    ciphertext: string;
    plaintext: string;
    decryptionKey: string;
}

export const cipherStore: cipherState = observable({
    ciphertext: '',
    plaintext: '',
    decryptionKey: ''
});

export const setCiphertext = action((ciphertext: string) => {
    cipherStore.ciphertext = ciphertext;
});
