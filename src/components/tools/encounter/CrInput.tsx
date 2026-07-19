import { observer } from 'mobx-react';
import Row from '../../common/Row';
import { setCR, encounterStore } from '../../../stores/encounter-store';
import { getCrString } from '../../../helpers/encounter-helper';
import { CR_XP } from '../../../constants/encounterValues';

function CrInput() {
    const MAX = CR_XP.length - 1;
    const {currentCrIndex} = encounterStore;

    return (<Row>
        <button onClick={() => {
            if (currentCrIndex > 0) {
                setCR(currentCrIndex - 1);
            }
        }}>{'<-'}</button>
        <input value={getCrString(currentCrIndex)} style={{width: '30px'}} />
        <button onClick={() => {
            if(currentCrIndex < MAX){
                setCR(currentCrIndex + 1);
            }
        }}>{'->'}</button>
    </Row>);
}

export default observer(CrInput);
