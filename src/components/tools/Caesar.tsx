import { observer } from 'mobx-react';
import { cipherStore } from '../../stores/cipher-store';

const a_ASCII_CODE = 'a'.charCodeAt(0);
const A_ASCII_CODE = 'A'.charCodeAt(0);

function rotateLetter(letter: string, shiftDistance: number): string {
  const asciiCode = letter.charCodeAt(0);
  const initial_asciiCode = letter.match(/[a-z]/g) ? a_ASCII_CODE : A_ASCII_CODE;

  return String.fromCharCode(((asciiCode - initial_asciiCode + shiftDistance) % 26) + initial_asciiCode);
}

function shiftCaesar(ciphertext: string, offset: number): string {
  return ciphertext.split('').map((letter) => {
    return letter.match(/[a-zA-Z]/g) ? rotateLetter(letter, offset) : letter;
  }).join('');
}

function Caesar(): React.JSX.Element | null {
  const { ciphertext } = cipherStore;

  if (ciphertext === '') {
    return null;
  }

  const plaintexts: React.JSX.Element[] = [];
  for (let i = 1; i < 26; i++) {
    plaintexts.push(<div style={{ display: 'flex' }}>
      <div style={{ textAlign: 'end', width: '20px', marginRight: '15px' }}>{i}</div>
      <div>{shiftCaesar(ciphertext, i)}</div>
    </div>);
  }

  return <>{plaintexts}</>;
}

export default observer(Caesar);
