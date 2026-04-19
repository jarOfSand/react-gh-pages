import { observer } from 'mobx-react';
import { mirrorStore, setPlaintext } from '../../stores/mirror-store';
var _ = require('lodash');

function reverseText(text: string): string {
  const splitText = text.split('');
  return _.reverse(splitText).join('');
}

const BOX_STYLING = {
  border: '1px solid black', padding: '5px'
}

function Reflections() {
  const { plaintext } = mirrorStore;

  return (<div style={{ display: 'flex', flexDirection: 'column', margin: '20px 0' }}>
    <div>{'reflection'}</div>
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div style={BOX_STYLING}>{plaintext}</div>
      <div style={{ ...BOX_STYLING, transform: 'scale(-1,1)', backgroundColor: 'rgba(127, 152, 221, 0.50)' }}>{plaintext}</div>
    </div>
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div style={{ ...BOX_STYLING, transform: 'scale(1,-1)', backgroundColor: 'rgba(127, 152, 221, 0.50)' }}>{plaintext}</div>
      <div style={{ ...BOX_STYLING, transform: 'scale(-1,-1)', backgroundColor: 'rgba(127, 152, 221, 1)' }}>{plaintext}</div>
    </div>
  </div>);
}

function Reverse() {
  const { plaintext } = mirrorStore;

  return (<div style={{ display: 'flex', flexDirection: 'column' }}>
    <div>{'reverse'}</div>
    <div style={{ display: 'flex', flexDirection: 'row' }}>
      <div style={BOX_STYLING}>{plaintext}</div>
      <div style={BOX_STYLING}>{reverseText(plaintext)}</div>
    </div>
  </div>);
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
