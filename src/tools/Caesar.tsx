import { observer } from 'mobx-react';
import { caesarStore, setCyphertext } from '../stores/caesar-store';

const a_asciiCode = 'a'.charCodeAt(0);
const A_asciiCode = 'A'.charCodeAt(0);

function rotateLetter(letter: string, shiftDistance: number): string {
  const asciiCode = letter.charCodeAt(0);
  const initial_asciiCode = letter.match(/[a-z]/g) ? a_asciiCode : A_asciiCode;

  return String.fromCharCode(((asciiCode - initial_asciiCode + shiftDistance) % 26) + initial_asciiCode);
}

function shiftCaesar(cyphertext: string, offset: number): string {
  return cyphertext.split('').map((letter) => {
    return letter.match(/[a-zA-Z]/g) ? rotateLetter(letter, offset) : letter;
  }).join('');
}

function decypher(cyphertext: string): React.JSX.Element[] {
  if (cyphertext === '') {
    return [];
  }

  const plaintexts: React.JSX.Element[] = [];
  for (let i = 1; i < 26; i++) {
    plaintexts.push(<div style={{ display: 'flex' }}>
      <div style={{ textAlign: 'end', width: '20px', marginRight: '15px' }}>{i}</div>
      <div>{shiftCaesar(cyphertext, i)}</div>
    </div>);
  }
  return plaintexts;
}

function Caesar() {
  const {cyphertext} = caesarStore;

  return (
    <div style={{
      margin: '5px',
      display: 'flex',
      flexDirection: 'row',
    }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column'
      }}>
        <input placeholder={'cyphertext'} onChange={(e) => { setCyphertext(e.target.value)}} value={cyphertext}/>
        {decypher(cyphertext)}
      </div>
    </div>
  );
}

export default observer(Caesar);
