import { observer } from 'mobx-react';
import { cipherStore, setCiphertext } from '../../../stores/cipher-store';
import Caesar from './Caesar';
import Vigenere from './Vigenere';
import Row from '../../common/Row';
import Column from '../../common/Column';
import CipherSelector from './CipherSelector';

function Cipher() {
    const { ciphertext, cipherName } = cipherStore;

    return <Row>
        <Column>
            <CipherSelector />
            <input placeholder={'input text'} onChange={(e) => { setCiphertext(e.target.value) }} value={ciphertext} />
            {(cipherName === 'vigenere') ? <Vigenere /> : null}
            {(cipherName === 'caesar') ? <Caesar /> : null}
        </Column>
    </Row>
}

export default observer(Cipher);
