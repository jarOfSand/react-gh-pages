import { diceStore } from '../../stores/dice-store';
import { observer } from 'mobx-react';

const RollResultsQueue = () => {
    const {history} = diceStore;

    const queue = history.map(({ diceString, total, result }, index) => {
        const resultString = result.length > 1 ? `[${result}]` : '';
        const subtext = [
            diceString,
            resultString,
        ].join(' ');

        return (<div style={index === 0 ? { marginBottom: '15px' } : {}} key={index}>
            <span style={{ marginLeft: 'auto', width: '40px', marginRight: '5px' }}>{total}</span>
            <span style={{ color: '#aaa', marginRight: '5px', fontSize: 'smaller' }}>{subtext}</span>
        </div>)
    });

    return (<>{queue}</>)
}

export default observer(RollResultsQueue);
