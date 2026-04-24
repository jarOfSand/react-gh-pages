import { observer } from 'mobx-react';
import { cipherStore, setCiphertext } from '../../stores/cipher-store';
import Caesar from './Caesar';

function Cipher() {
    const {ciphertext} = cipherStore;

    return <div style={{
        display: 'flex',
        flexDirection: 'row'
    }}>
        <div style={{
            display: 'flex',
            flexDirection: 'column'
        }}>
            <input placeholder={'ciphertext'} onChange={(e) => { setCiphertext(e.target.value) }} value={ciphertext} />
            <Caesar />
        </div>
    </div>
}

export default observer(Cipher);
