import { diceStore, handfull, handleCustomButtonClick } from '../../stores/dice-store';
import { observer } from 'mobx-react';

const HandfullButton = (props: { handfull: handfull, index: number }) => {
    const {deletionMode} = diceStore;

    const buttonText = props.handfull.name ? props.handfull.name : props.handfull.diceString;
    const style = deletionMode ? { color: '#b1000d' } : {};

    return (<button style={{ ...style, marginRight: '3px' }} onClick={() => { handleCustomButtonClick(props.index) }}>{buttonText}</button>);
}

export default observer(HandfullButton);