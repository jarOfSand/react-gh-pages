import { observer } from 'mobx-react';
import { cipherStore } from '../../../stores/cipher-store';
import Row from '../../common/Row';
import { shiftCaesar } from '../../../helpers/cipher-helper';

function Caesar(): React.JSX.Element | null {
  const { ciphertext } = cipherStore;

  if (ciphertext === '') {
    return null;
  }

  const plaintexts: React.JSX.Element[] = [];
  for (let i = 1; i < 26; i++) {
    plaintexts.push(<Row>
      <div style={{ textAlign: 'end', width: '20px', marginRight: '15px' }}>{i}</div>
      <div>{shiftCaesar(ciphertext, i)}</div>
    </Row>);
  }

  return <>{plaintexts}</>;
}

export default observer(Caesar);
