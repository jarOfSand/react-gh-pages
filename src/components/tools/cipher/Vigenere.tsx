import { observer } from 'mobx-react';
import { cipherStore, setDecryptionKey, toggleIsEncrypting } from '../../../stores/cipher-store';
import Row from '../../common/Row';
import { vigenere } from '../../../helpers/cipher-helper';
import Switch from 'react-switch';

function Vigenere(): React.JSX.Element | null {
  const { ciphertext, decryptionKey, isEncrypting } = cipherStore;
  const decrypted = vigenere(ciphertext, decryptionKey, isEncrypting);

  return <>
    <Row>
    <input style={{marginRight: '5px'}} placeholder={'decryption key'} onChange={(e) => { setDecryptionKey(e.target.value) }} value={decryptionKey} />
      <Switch
        onChange={toggleIsEncrypting}
        checked={isEncrypting}
        height={21}
        width={42}
      />
      <div style={{fontSize: 'smaller', marginLeft: '5px'}}>{isEncrypting ? 'encrypting' : 'decrypting'}</div>
    </Row>
    {decrypted}
  </>;
}

export default observer(Vigenere);
