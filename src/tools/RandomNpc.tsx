import { PROFESSIONS, SPECIES, MAGIC_TYPES, WEAPONS } from '../constants/npcValues';
import { npcStore, setProfession, setSpecies, setSubspecies, setMagicType, setWeapon } from '../stores/npc-store';
import { observer } from 'mobx-react';
import '../css/RandomNpc.css';

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

    return (
        <div style={{
            margin: '5px',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <div className={'npc-button-row'} style={{ display: 'flex', marginRight: 'auto' }}>
                <button onClick={() => generateNpcHandler()}>{'generate'}</button>

                {species && <button style={{ marginRight: 'auto' }} onClick={() => {
                    setMagicType(chance.pickone(MAGIC_TYPES));
                }}>{!magicType ? 'add magic' : 'randomize magic'}</button>}

                {magicType && <button style={{ marginRight: 'auto' }} onClick={() => {
                    setMagicType('');
                }}>{'remove magic'}</button>}
            </div>

            {species && <div style={{ marginTop: '10px' }}>{speciesString}</div>}
            {profession && <div>{profession}</div>}

            {weapon && <div style={{ marginTop: '10px' }}>{weapon}</div>}
            {magicType && <div>{`${magicType} magic`}</div>}

            {species && <a style={{ marginRight: 'auto', marginTop: '10px' }} target={'_blank'} href={`https://dnd5e.wikidot.com/lineage:${species}`}>{'lineage:wiki'}</a>}
        </div>
    );
}

export default observer(RandomNpc);
