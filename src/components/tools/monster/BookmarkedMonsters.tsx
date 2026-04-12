import { observer } from 'mobx-react';
import { monsterStore, handleBookmarkClick} from '../../../stores/monster-store';
import { diceStore } from '../../../stores/dice-store';

function BookmarkedMonsters() {
    const {bookmarks} = monsterStore;
    const {deletionMode} = diceStore;

    const buttons: React.JSX.Element[] = [];
    bookmarks.forEach(bookmark => {
        buttons.push(<button style={deletionMode ? {color: '#b1000d'} : {}} onClick={() => {handleBookmarkClick(bookmark.index)}}>{bookmark.name}</button>);
    })

    return (<div>{buttons}</div>);
}

export default observer(BookmarkedMonsters);
