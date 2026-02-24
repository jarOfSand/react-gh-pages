import { useState } from 'react';
import { PROFESSIONS, SPECIES } from '../constants/npcValues';

// import chance from 'chance';
// var randomName = chance().string();
const Chance = require('chance');
const chance = new Chance();

function RandomNpc() {
    const [profession, setProfession] = useState('');
    const [species, setSpecies] = useState('');
    const [subspecies, setSubspecies] = useState('');
    
    const subspeciesString = subspecies ? `(${subspecies})` : '';
    const result = `${species}${subspeciesString}, ${profession}`;

    return (
        <div style={{
            margin: '5px',
            display: 'flex',
            flexDirection: 'column'
        }}>
            <button style={{marginRight: 'auto'}} onClick={() => {
                const currentSpecies = chance.pickone(SPECIES);
                const currentSubspecies = currentSpecies.subspecies && currentSpecies.subspecies.length > 0 ? chance.pickone(currentSpecies.subspecies) : '';

                setSpecies(currentSpecies.name);
                setSubspecies(currentSubspecies);
                setProfession(chance.pickone(PROFESSIONS));
            }}>{'generate'}</button>
            <div>{result}</div>
            {species && <a style={{marginRight: 'auto'}} target={'_blank'} href={`https://dnd5e.wikidot.com/lineage:${species}`}>{'lineage:wiki'}</a>}
        </div>
    );
}

export default RandomNpc;
