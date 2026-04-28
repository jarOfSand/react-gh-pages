import {observable, action} from 'mobx';

type cipherState = {
    ciphertext: string;
    decryptionKey: string;
    cipherName: string;
    isEncrypting: boolean;
}

export const cipherStore: cipherState = observable({
    ciphertext: '',
    decryptionKey: '',
    cipherName: '',
    isEncrypting: false
});

export const setCiphertext = action((ciphertext: string) => {
    cipherStore.ciphertext = ciphertext;
});

export const setDecryptionKey = action((decryptionKey: string) => {
    cipherStore.decryptionKey = decryptionKey;
});

export const setActiveCipher = action((cipherName: string) => {
    cipherStore.cipherName = cipherName;
});

export const toggleIsEncrypting = action(() => {
    cipherStore.isEncrypting = !cipherStore.isEncrypting;
});
