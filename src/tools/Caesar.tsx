import { useState } from 'react';

const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';

function rotateLetterInAlphabet(letter: string, shiftDistance: number) {
  const currentIndex = ALPHABET.indexOf(letter);
  const newIndex = (currentIndex + shiftDistance) % ALPHABET.length; // should be 26

  return ALPHABET[newIndex];
}

function shiftCaesar(cyphertext: string, offset: number): string {
  return cyphertext.split('').map((letter) => {
    if (ALPHABET.includes(letter)) {
      return rotateLetterInAlphabet(letter, offset);
    }
    return letter;
  }).join('');
}

function getResults(cyphertext: string) {
  const plaintexts = [];
  for (let i = 1; i < ALPHABET.length; i++) {
    plaintexts.push(<div style={{display: 'flex'}}>
      <div style={{textAlign: 'end', width: '20px', marginRight: '15px'}}>{i}</div>
      <div>{shiftCaesar(cyphertext, i)}</div>
    </div>);
  }
  return plaintexts;
}

function Caesar() {
  const [cyphertext, setCyphertext] = useState('');

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
        <input placeholder={'cyphertext'} onChange={(e) => { setCyphertext(e.target.value) }}></input>
        {getResults(cyphertext)}
      </div>
    </div>
  );
}

export default Caesar;
