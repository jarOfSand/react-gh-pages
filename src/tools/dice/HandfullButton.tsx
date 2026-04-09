import { diceStore, handfull, handleCustomButtonClick } from '../../stores/dice-store';
import { observer } from 'mobx-react';

const HandfullButton = (props: { dice: handfull, index: number }) => {
    const {dice, index} = props;
    const {deletionMode} = diceStore;

    const buttonText = dice.name ? dice.name : dice.diceString;
    const style = deletionMode ? { color: '#b1000d' } : {};

    return (<button style={{ ...style, marginRight: '3px' }} onClick={() => { handleCustomButtonClick(dice, index) }}>{buttonText}</button>);
}

export default observer(HandfullButton);