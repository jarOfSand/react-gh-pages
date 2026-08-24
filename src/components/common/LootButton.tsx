import Row from './Row';

import { useState } from 'react';
import { observer } from 'mobx-react';
import { rollLoot } from '../../helpers/loot-helper';

function LootButton(props: { cr: number, hoard?: boolean }) {
    const { cr } = props;
    const [loot, setLoot] = useState('');

    return (
        <Row>
            <button onClick={() => {
                setLoot(rollLoot(cr).lootString);
            }}>{'drop loot(coins)'}</button>
            <button onClick={() => {
                setLoot((rollLoot(cr).raw_cp));
            }}>{'drop loot(item)'}</button>
            <div style={{paddingLeft: '10px'}}>{loot}</div>
        </Row>
    );
}

export default observer(LootButton);
