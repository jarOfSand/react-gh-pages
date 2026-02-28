import { observer } from 'mobx-react';
import { descramblerStore, setScrambledText, descramble } from '../stores/descrambler-store';

function Descrambler() {
  const {scrambledText, possibleMatches} = descramblerStore;

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
        <input placeholder={'scrambled text'} onChange={(e) => { setScrambledText(e.target.value)}} value={scrambledText}/>
        <button onClick={descramble}>{'descramble'}</button>
        <div>{`${possibleMatches}`}</div>
      </div>
    </div>
  );
}

export default observer(Descrambler);
