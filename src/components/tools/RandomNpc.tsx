import { PROFESSIONS, SPECIES, MAGIC_TYPES, WEAPONS, VARIANTS } from '../../constants/npcValues';
import { npcStore, setProfession, setSpecies, setSubspecies, setMagicType, setWeapon, setVariant } from '../../stores/npc-store';
import { observer } from 'mobx-react';
import '../../css/RandomNpc.css';
import Column from '../common/Column';
import Row from '../common/Row';

const Chance = require('chance');
const chance = new Chance();

function DetailRow(props: {title: string, value: string | undefined | null, link?: string}) : React.JSX.Element {
    const {title, value, link} = props;

    const valueString = value ? value : '---';
    const valueRow = (link && value)
        ? <a target={'_blank'} href={link}>{valueString}</a>
        : <div style={{textWrap: 'wrap'}}>{valueString}</div>;

    return (<Row>
        <div style={{ width: '100px', flexShrink: '0' }}>{`${title}:`}</div>
        {valueRow}
    </Row>);
}

function RandomNpc() : React.JSX.Element {
    const {
        profession,
        species,
        magicType,
        weapon,
        variant
    } = npcStore;

    
    function generateNpcHandler() {
        const currentSpecies = chance.pickone(SPECIES);
        const currentSubspecies = currentSpecies.subspecies && currentSpecies.subspecies.length > 0 ? chance.pickone(currentSpecies.subspecies) : '';
        
        setProfession(chance.pickone(PROFESSIONS));
        setWeapon(chance.pickone(WEAPONS));
        
        
        const speciesLink = `https://dnd5e.wikidot.com/lineage:${currentSpecies.name}`;
        setSpecies({name: currentSpecies.name, subspecies: currentSubspecies, link: speciesLink});
        
        if(chance.d8() === 1) {
            const variant = chance.pickone(VARIANTS);
            const {name, link} = chance.pickone(variant.subvariants);
            
            setVariant({name: variant.name, subvariant: name, link});
        } else {
            setVariant(null);
        }
    }
    
    const subspeciesString = species?.subspecies ? `(${species.subspecies})` : '';
    const speciesString = species ? `${species.name}${subspeciesString}` : null;

    return (<Column>
        <DetailRow title={'species'} value={speciesString} link={species?.link}/>
        <DetailRow title={'variant'} value={variant ? `${variant.name}(${variant.subvariant})` : null} link={variant?.link}/>
        <div style={{height: '10px'}}/>
        <DetailRow title={'profession'} value={profession?.name}/>
        <DetailRow title={'items'} value={profession?.item}/>
        <div style={{height: '10px'}}/>
        <DetailRow title={'weapon'} value={weapon}/>
        <DetailRow title={'magic'} value={magicType}/>

        <div style={{height: '10px'}}/>
        <Row>
            <button onClick={() => generateNpcHandler()}>{'generate'}</button>
        </Row>
        <div style={{height: '10px'}}/>
        <Row>
            <div className={'npc-button-row'}>

                {species && <button onClick={() => {
                    setMagicType(chance.pickone(MAGIC_TYPES));
                }}>{!magicType ? 'add magic' : 'randomize magic'}</button>}

                {magicType && <button onClick={() => {
                    setMagicType('');
                }}>{'remove magic'}</button>}
            </div>
        </Row>
    </Column>
    );
}

export default observer(RandomNpc);
