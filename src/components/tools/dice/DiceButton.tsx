import { diceStore, handfull, handleCustomButtonClick } from '../../../stores/dice-store';
import { observer } from 'mobx-react';

const DiceButton = (props: { dice: handfull, removable?: boolean }) => {
    const {dice, removable} = props;
    const {deletionMode} = diceStore;

    const isRemovable = removable ?? false;

    const buttonText = dice.name ? dice.name : dice.diceString;
    const style = deletionMode && isRemovable ? { color: '#b1000d' } : {};

    return (<button style={{ ...style, marginRight: '3px' }} onClick={() => { handleCustomButtonClick(dice, isRemovable)}}>{buttonText}</button>);
}

export default observer(DiceButton);
