import { diceStore } from '../../../stores/dice-store';
import { observer } from 'mobx-react';

const RollResultsQueue = (props: { maxLength?: number }) => {
    const { history } = diceStore;

    const INDENT = { marginLeft: '10px' };
    const maxIndex = props.maxLength ? props.maxLength - 1 : 10

    const queue = history.map(({ diceString, total, result }, index) => {

        if (index < maxIndex) {
            const resultString = result.length > 1 ? `[${result}]` : '';
            const subtext = [
                diceString,
                resultString,
            ].join(' ');

            return (<div style={index > 0 ? INDENT : {}} key={index}>
                <span style={{ marginLeft: 'auto', width: '40px', marginRight: '5px' }}>{total}</span>
                <span style={{ color: '#aaa', marginRight: '5px', fontSize: 'smaller' }}>{subtext}</span>
            </div>)
        }

        return null;
    });

    return (<div style={{
        height: `${21 * maxIndex}px`,
        borderLeft: '2px solid black',
        borderRadius: '5px',
        marginTop: '10px',
        paddingLeft: '5px'
    }}>{queue.filter(Boolean)}</div>);
}

export default observer(RollResultsQueue);
