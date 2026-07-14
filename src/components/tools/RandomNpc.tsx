import { PROFESSIONS, SPECIES, MAGIC_TYPES, WEAPONS, VARIANTS } from '../../constants/npcValues';
import { npcStore, setProfession, setSpecies, setSubspecies, setMagicType, setWeapon, setVariant } from '../../stores/npc-store';
import { observer } from 'mobx-react';
import '../../css/RandomNpc.css';
import Column from '../common/Column';
import Row from '../common/Row';

const Chance = require('chance');
const chance = new Chance();

function DetailRow(props: {title: string, value: string | undefined | null}) : React.JSX.Element {
    const {title, value} = props;

    return (<Row>
        <div style={{ width: '100px', flexShrink: '0' }}>{`${title}:`}</div>
        <div style={{textWrap: 'wrap'}}>{value ? value : '---'}</div>
    </Row>);
}

function RandomNpc() : React.JSX.Element {
    const {
        profession,
        species,
        subspecies,
        magicType,
        weapon,
        variant
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

        if(chance.d8() === 1) {
            const variant = chance.pickone(VARIANTS);
            const subvariant = chance.pickone(variant.subvariants);

            setVariant(`${variant.name}(${subvariant})`);
        } else {
            setVariant('');
        }
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
        <DetailRow title={'species'} value={speciesString}/>
        <DetailRow title={'variant'} value={variant}/>
        <DetailRow title={'profession'} value={profession?.name}/>
        <DetailRow title={'items'} value={profession?.item}/>
        <DetailRow title={'weapon'} value={weapon}/>
        <DetailRow title={'magic'} value={magicType}/>
        {species ? <a target={'_blank'} href={`https://dnd5e.wikidot.com/lineage:${species}`}>{'lineage:wiki'}</a> : <></>}
    </Column>
    );
}

export default observer(RandomNpc);
