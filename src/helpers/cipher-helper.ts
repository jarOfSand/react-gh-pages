const a_ASCII_CODE = 'a'.charCodeAt(0);
const A_ASCII_CODE = 'A'.charCodeAt(0);

function handleNegative(shiftDistance: number) {
    let distance = shiftDistance;
    while(distance < 0) {
        distance += 26;
    }
    return distance;
}

function rotateLetter(letter: string, shiftDistance: number): string {
  const asciiCode = letter.charCodeAt(0);
  const initial_asciiCode = letter.match(/[a-z]/g) ? a_ASCII_CODE : A_ASCII_CODE;

  return String.fromCharCode(((asciiCode - initial_asciiCode + handleNegative(shiftDistance)) % 26) + initial_asciiCode);
}

export function shiftCaesar(ciphertext: string, offset: number): string {
  return ciphertext.split('').map((letter) => {
    return letter.match(/[a-zA-Z]/g) ? rotateLetter(letter, offset) : letter;
  }).join('');
}

export function vigenere(ciphertext: string, keyString: string, isEncrypting: boolean): string {
    if(keyString === '') {
        return '';
    }

    if(!/^[a-zA-Z\s]+$/.test(keyString)) {
        return 'invalid decryption key. only letters and spaces allowed.';
    }

    const keyArray = keyString.toLowerCase().replace(' ', '').split('').map(character => {return character.charCodeAt(0) - a_ASCII_CODE});

    let runningIndex = 0;
    return ciphertext.split('').map((character) => {
        if(/[a-zA-Z]/.test(character)) {
            const keyIndex = runningIndex % keyArray.length;
            runningIndex++;
            return rotateLetter(character, keyArray[keyIndex] * (isEncrypting ? 1 : -1));
        }
        return character;
    }).join('');
}
