import { useState } from 'react';

// import chance from 'chance';
// var randomName = chance().string();
const Chance = require('chance');
const chance = new Chance();

function DiceRoller() {
    const [rollResult, setRollResult] = useState('');
    const [diceRolled, setDiceRolled] = useState(null);
    const [diceCount, setDiceCount] = useState(1);
    const [diceSize, setDiceSize] = useState(6);

    // =1 -1 [roll] +1 +5
    // d4 d6 d8 d10 d12 d20 d100

    function rollDice() {
        const result = [];
        let total = 0;
        for(let i = 0; i < diceCount; i++) {
            const roll = chance.natural({min: 1, max: diceSize})
            result.push(roll);
            total += roll;
        }
        return diceCount > 1 ? `${total} [${result}]` : `${total}`;
    }

    return (
        <div style={{
            margin: '5px',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <div className={'button-row'} style={{ display: 'flex', marginRight: 'auto' }}>
                <button onClick={() => setDiceSize(4)}>{'d4'}</button>
                <button onClick={() => setDiceSize(6)}>{'d6'}</button>
                <button onClick={() => setDiceSize(8)}>{'d8'}</button>
                <button onClick={() => setDiceSize(10)}>{'d10'}</button>
                <button onClick={() => setDiceSize(12)}>{'d12'}</button>
                <button onClick={() => setDiceSize(20)}>{'d20'}</button>
                <button onClick={() => setDiceSize(100)}>{'d100'}</button>
            </div>

            <div className={'button-row'} style={{ display: 'flex', marginRight: 'auto' }}>
                <button onClick={() => setDiceCount(1)}>{'1'}</button>
                <button onClick={() => {if(diceCount > 1){setDiceCount(diceCount - 1)}}}>{'-1'}</button>
                
                <button onClick={
                    () => {
                        const result = rollDice();
                        setRollResult(result);
                    }

                }>{'roll'}</button>

                <button onClick={() => setDiceCount(diceCount + 1)}>{'+1'}</button>
                <button onClick={() => setDiceCount(diceCount + 5)}>{'+5'}</button>
            </div>

            <div className={'button-row'} style={{ display: 'flex', marginRight: 'auto' }}>
                
            </div>

            {/* {species && <div style={{ marginTop: '10px' }}>{speciesString}</div>} */}
            <div style={{ marginTop: '10px' }}>{`${diceCount}d${diceSize} -> ${rollResult}`}</div>
        </div>
    );
}

export default DiceRoller;
