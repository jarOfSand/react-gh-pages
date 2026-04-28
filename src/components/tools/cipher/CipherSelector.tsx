import { observer } from 'mobx-react';
import { setActiveCipher } from '../../../stores/cipher-store';
import Row from '../../common/Row';

function CipherSelector() {
    return (<div style={{marginBottom: '5px'}}>
        <Row>
            <input type={'radio'} name={'whichCipher'} onClick={() => setActiveCipher('caesar')} />
            <label>{'caesar'}</label>
        </Row>
        <Row>
            <input type={'radio'} name={'whichCipher'} onClick={() => setActiveCipher('vigenere')} />
            <label>{'vigenere'}</label>
        </Row>
    </div>);
}

export default observer(CipherSelector);
