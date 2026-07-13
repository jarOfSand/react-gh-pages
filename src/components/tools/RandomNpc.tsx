import { PROFESSIONS, SPECIES, MAGIC_TYPES, WEAPONS } from '../../constants/npcValues';
import { npcStore, setProfession, setSpecies, setSubspecies, setMagicType, setWeapon } from '../../stores/npc-store';
import { observer } from 'mobx-react';
import '../../css/RandomNpc.css';
import Column from '../common/Column';
import Row from '../common/Row';

const Chance = require('chance');
const chance = new Chance();

function RandomNpc() {
    const {
        profession,
        species,
        subspecies,
        magicType,
        weapon
    } = npcStore;

    const subspeciesString = subspecies ? `(${subspecies})` : '';
    const speciesString = `${species}${subspeciesString}`;

    function generateNpcHandler() {
        const currentSpecies = chance.pickone(SPECIES);
        const currentSubspecies = currentSpecies.subspecies && currentSpecies.subspecies.length > 0 ? chance.pickone(currentSpecies.subspecies) : '';

        setSpecies(currentSpecies.name);
        setSubspecies(currentSubspecies);
        setProfession(chance.pickone(PROFESSIONS));
        setWeapon(chance.pickone(WEAPONS));
    }

    return (<Column>
        <Row>
            <div className={'npc-button-row'}>
                <button onClick={() => generateNpcHandler()}>{'generate'}</button>

                {species && <button onClick={() => {
                    setMagicType(chance.pickone(MAGIC_TYPES));
                }}>{!magicType ? 'add magic' : 'randomize magic'}</button>}

                {magicType && <button onClick={() => {
                    setMagicType('');
                }}>{'remove magic'}</button>}
            </div>
        </Row>
        <Row>
            <Column style={{paddingRight: '10px'}}>
                <div>{'species:'}</div>
                <div>{'profession:'}</div>
                <div>{'items:'}</div>
                <div>{'weapon:'}</div>
                <div>{'magic:'}</div>
                <div>{'link:'}</div>
            </Column>
            {species ?
                <Column>
                    <div>{speciesString}</div>
                    <div>{profession?.name || '---'}</div>
                    <div>{profession?.item || '---'}</div>
                    <div>{weapon}</div>
                    <div>{magicType ? `${magicType} magic` : '---'}</div>
                    <a target={'_blank'} href={`https://dnd5e.wikidot.com/lineage:${species}`}>{'lineage:wiki'}</a>
                </Column> : <div></div>}
        </Row>
    </Column>
    );
}

export default observer(RandomNpc);
