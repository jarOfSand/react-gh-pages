import { observer } from 'mobx-react';
import Row from '../../common/Row';
import Column from '../../common/Column';
import { encounterStore, removeFromRoster } from '../../../stores/encounter-store';
import { getCrString } from '../../../helpers/encounter-helper';
import { CR_XP } from '../../../constants/encounterValues';
import LootButton from '../../common/LootButton';

function getTotalXp(roster: number[]) {
    return roster.reduce((total, crIndex) => {
        return total + CR_XP[crIndex]
    }, 0);
}

function EncounterRoster(): React.JSX.Element | null {
    const { roster } = encounterStore;

    if (!roster.length) {
        return null;
    }

    const rosterList = roster.map((crIndex, index) => {
        const crForLoot = Math.max(crIndex - 3, 0);

        return <Row>
            <button style={{ width: '100px' }} key={index} onClick={() => {
                removeFromRoster(crIndex);
            }}>{`${getCrString(crIndex)} (${CR_XP[crIndex]} xp)`}</button>
            <LootButton cr={crForLoot}/>
        </Row>

    });

    return (<Column>
        <div style={{ padding: '10px 0 0 0' }}>{`total: ${getTotalXp(roster)} xp`}</div>
        <div style={{ padding: '0 0 10px 0' }}>{`count: ${roster.length}`}</div>
        <>{rosterList}</>
    </Column>);
}

export default observer(EncounterRoster);
