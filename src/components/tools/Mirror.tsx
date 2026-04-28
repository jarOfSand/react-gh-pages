import { observer } from 'mobx-react';
import { mirrorStore, setPlaintext } from '../../stores/mirror-store';
import Column from '../common/Column';
import Row from '../common/Row';

function reverseText(text: string): string {
  return text.split('').reverse().join('');
}

const BOX_STYLING = {
  border: '1px solid black', padding: '5px'
}

function Reflections() {
  const { plaintext } = mirrorStore;

  return (<Column style={{ margin: '20px 0' }}>
    <div>{'reflection'}</div>
    <Row>
      <div style={BOX_STYLING}>{plaintext}</div>
      <div style={{ ...BOX_STYLING, transform: 'scale(-1,1)', backgroundColor: 'rgba(127, 152, 221, 0.50)' }}>{plaintext}</div>
    </Row>
    <Row>
      <div style={{ ...BOX_STYLING, transform: 'scale(1,-1)', backgroundColor: 'rgba(127, 152, 221, 0.50)' }}>{plaintext}</div>
      <div style={{ ...BOX_STYLING, transform: 'scale(-1,-1)', backgroundColor: 'rgba(127, 152, 221, 1)' }}>{plaintext}</div>
    </Row>
  </Column>);
}

function Reverse() {
  const { plaintext } = mirrorStore;

  return (<Column>
    <div>{'reverse'}</div>
    <Row>
      <div style={BOX_STYLING}>{plaintext}</div>
      <div style={BOX_STYLING}>{reverseText(plaintext)}</div>
    </Row>
  </Column>);
}

function Mirror() {
  const { plaintext } = mirrorStore;

  return (<>
    <input placeholder={'plaintext'} onChange={(e) => { setPlaintext(e.target.value) }} value={plaintext} />
    <Reflections />
    <Reverse />
  </>
  );
}

export default observer(Mirror);
