import { observer } from 'mobx-react';
import { creatureStore } from '../stores/creature-store';
// import '../css/Statblock.css';

// https://www.dnd5eapi.co/
// https://5e-bits.github.io/docs/introduction
// https://www.dnd5eapi.co/monsters/acolyte
// https://github.com/5e-bits/5e-database/blob/main/src/2014/5e-SRD-Monsters.json

const API_ACOLYTE = {
    "index": "acolyte",
    "name": "Acolyte",
    "desc": "Acolytes are junior members of a clergy, usually answerable to a priest. They perform a variety of functions in a temple and are granted minor spellcasting power by their deities.",
    "size": "Medium",
    "type": "humanoid",
    "subtype": "any race",
    "alignment": "any alignment",
    "armor_class": [
        {
            "type": "dex",
            "value": 10
        }
    ],
    "hit_points": 9,
    "hit_dice": "2d8",
    "hit_points_roll": "2d8",
    "speed": {
        "walk": "30 ft."
    },
    "strength": 10,
    "dexterity": 10,
    "constitution": 10,
    "intelligence": 10,
    "wisdom": 14,
    "charisma": 11,
    "proficiencies": [
        {
            "value": 4,
            "proficiency": {
                "index": "skill-medicine",
                "name": "Skill: Medicine",
                "url": "/api/2014/proficiencies/skill-medicine"
            }
        },
        {
            "value": 2,
            "proficiency": {
                "index": "skill-religion",
                "name": "Skill: Religion",
                "url": "/api/2014/proficiencies/skill-religion"
            }
        }
    ],
    "damage_vulnerabilities": [],
    "damage_resistances": [],
    "damage_immunities": [],
    "condition_immunities": [],
    "senses": {
        "passive_perception": 12
    },
    "languages": "any one language (usually Common)",
    "challenge_rating": 0.25,
    "proficiency_bonus": 2,
    "xp": 50,
    "special_abilities": [
        {
            "name": "Spellcasting",
            "desc": "The acolyte is a 1st-level spellcaster. Its spellcasting ability is Wisdom (spell save DC 12, +4 to hit with spell attacks). The acolyte has following cleric spells prepared:\n\n- Cantrips (at will): light, sacred flame, thaumaturgy\n- 1st level (3 slots): bless, cure wounds, sanctuary",
            "spellcasting": {
                "level": 1,
                "ability": {
                    "index": "wis",
                    "name": "WIS",
                    "url": "/api/2014/ability-scores/wis"
                },
                "dc": 12,
                "modifier": 4,
                "components_required": [
                    "V",
                    "S",
                    "M"
                ],
                "school": "cleric",
                "slots": {
                    "1": 3
                },
                "spells": [
                    {
                        "name": "Light",
                        "level": 0,
                        "url": "/api/2014/spells/light"
                    },
                    {
                        "name": "Sacred Flame",
                        "level": 0,
                        "url": "/api/2014/spells/sacred-flame"
                    },
                    {
                        "name": "Thaumaturgy",
                        "level": 0,
                        "url": "/api/2014/spells/thaumaturgy"
                    },
                    {
                        "name": "Bless",
                        "level": 1,
                        "url": "/api/2014/spells/bless"
                    },
                    {
                        "name": "Cure Wounds",
                        "level": 1,
                        "url": "/api/2014/spells/cure-wounds"
                    },
                    {
                        "name": "Sanctuary",
                        "level": 1,
                        "url": "/api/2014/spells/sanctuary"
                    }
                ]
            },
            "damage": []
        }
    ],
    "actions": [
        {
            "name": "Club",
            "desc": "Melee Weapon Attack: +2 to hit, reach 5 ft., one target. Hit: 2 (1d4) bludgeoning damage.",
            "attack_bonus": 2,
            "damage": [
                {
                    "damage_type": {
                        "index": "bludgeoning",
                        "name": "Bludgeoning",
                        "url": "/api/2014/damage-types/bludgeoning"
                    },
                    "damage_dice": "1d4"
                }
            ],
            "actions": []
        }
    ],
    "image": "/api/images/monsters/acolyte.png",
    "url": "/api/2014/monsters/acolyte",
    "updated_at": "2026-04-01T20:35:38.253Z",
    "forms": [],
    "legendary_actions": [],
    "reactions": []
};

function Creature() {
    const { activeCreature } = creatureStore;

    return (
        <div style={{
            margin: '5px',
            display: 'flex',
            flexDirection: 'row',
        }}>
            <div className='stat-block'>
                <hr className="orange-border" />
                <div className="section-left">
                    <div className="creature-heading">
                        <h1>{API_ACOLYTE.name}</h1>
                        <h2>{`${API_ACOLYTE.size} ${API_ACOLYTE.type}, ${API_ACOLYTE.alignment}`}</h2>
                    </div>
                    <svg height="5" width="100%" className="tapered-rule">
                        <polyline points="0,0 400,2.5 0,5"></polyline>
                    </svg>
                    <div className="top-stats">
                        <div className="property-line first">
                            <h4>Armor Class</h4>
                            <p>{API_ACOLYTE.armor_class[0].value}</p>
                        </div>
                        <div className="property-line">
                            <h4>Hit Points</h4>
                            <p>{API_ACOLYTE.hit_points}</p>
                        </div>
                        <div className="property-line last">
                            <h4>Speed</h4>
                            <p>{API_ACOLYTE.speed.walk}</p>
                        </div>
                        <svg height="5" width="100%" className="tapered-rule">
                            <polyline points="0,0 400,2.5 0,5"></polyline>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default observer(Creature);

{/* <div class="stat-block">
	<hr class="orange-border" />
	<div class="section-left">
		<div class="creature-heading">
			<h1>Animated Armor</h1>
			<h2>Medium construct, unaligned</h2>
		</div> <!-- creature heading -->
		<svg height="5" width="100%" class="tapered-rule">
	    <polyline points="0,0 400,2.5 0,5"></polyline>
	  </svg>
		<div class="top-stats">
			<div class="property-line first">
				<h4>Armor Class</h4>
				<p>18 (natural armor)</p>
			</div> <!-- property line -->
			<div class="property-line">
				<h4>Hit Points</h4>
				<p>33 (6d8 + 6)</p>
			</div> <!-- property line -->
			<div class="property-line last">
				<h4>Speed</h4>
				<p>25ft.</p>
			</div> <!-- property line -->
			<svg height="5" width="100%" class="tapered-rule">
	    <polyline points="0,0 400,2.5 0,5"></polyline>
	  </svg>


			<div class="abilities">
				<div class="ability-strength">
					<h4>STR</h4>
					<p>14 (+2)</p>
				</div> <!-- ability strength -->
				<div class="ability-dexterity">
					<h4>DEX</h4>
					<p>11 (+0)</p>
				</div> <!-- ability dexterity -->
				<div class="ability-constitution">
					<h4>CON</h4>
					<p>13 (+1)</p>
				</div> <!-- ability constitution -->
				<div class="ability-intelligence">
					<h4>INT</h4>
					<p>1 (-5)</p>
				</div> <!-- ability intelligence -->
				<div class="ability-wisdom">
					<h4>WIS</h4>
					<p>3 (-4)</p>
				</div> <!-- ability wisdom -->
				<div class="ability-charisma">
					<h4>CHA</h4>
					<p>1 (-5)</p>
				</div> <!-- ability charisma -->
			</div> <!-- abilities -->
			<svg height="5" width="100%" class="tapered-rule">
	    <polyline points="0,0 400,2.5 0,5"></polyline>
	  </svg>
			<div class="property-line first">
				<h4>Damage Immunities</h4>
				<p>poison, psychic</p>
			</div> <!-- property line -->
			<div class="property-line">
				<h4>Condition Immunities</h4>
				<p>blinded, charmed, deafened, exhaustion, frightened,
						petrified, poisoned</p>
			</div> <!-- property line -->
			<div class="property-line">
				<h4>Senses</h4>
				<p>blindsight 60ft. (blind beyond this radius), passive Perception 6</p>
			</div> <!-- property line -->
			<div class="property-line">
				<h4>Languages</h4>
				<p>&mdash;</p>
			</div> <!-- property line -->
			<div class="property-line last">
				<h4>Challenge</h4>
				<p>1 (200 XP)</p>
			</div> <!-- property line -->
		</div> <!-- top stats -->
		<svg height="5" width="100%" class="tapered-rule">
	    <polyline points="0,0 400,2.5 0,5"></polyline>
	  </svg>
		<div class="property-block">
			<h4>Antimagic Suceptibility.</h4>
			<p>The armor is incapacitated while in the area of an <i>antimagic
	        field</i>.  If targeted by <i>dispel magic</i>, the armor must succeed
	        on a Constitution saving throw against the caster’s spell save DC or
	        fall unconscious for 1 minute.</p>
		</div> <!-- property block -->
		<div class="property-block">
			<h4>False Appearance.</h4>
			<p>While the armor remains motionless, it is indistinguishable from a
	        normal suit of armor.</p>
		</div> <!-- property block -->
	</div> <!-- section left -->
	<div class="section-right">
		<div class="actions">
			<h3>Actions</h3>
			<div class="property-block">
				<h4>Multiattack.</h4>
				<p>The armor makes two melee attacks.</p>
			</div> <!-- property block -->
			<div class="property-block">
				<h4>Slam.</h4>
				<p><i>Melee Weapon Attack:</i> +4 to hit, reach 5 ft., one target.
        <i>Hit:</i> 5 (1d6 + 2) bludgeoning damage.</p>
			</div> <!-- property block -->
		</div> <!-- actions -->
		<div class="actions">
			<h3>Legendary Actions</h3>
			<div class="property-block">
				<h4>Multiattack.</h4>
				<p>The armor makes two melee attacks.</p>
			</div> <!-- property block -->
			<div class="property-block">
				<h4>Slam.</h4>
				<p><i>Melee Weapon Attack:</i> +4 to hit, reach 5 ft., one target.
        <i>Hit:</i> 5 (1d6 + 2) bludgeoning damage.</p>
			</div> <!-- property block -->
		</div> <!-- actions -->
	</div> <!-- section right -->
	<hr class="orange-border bottom" />
</div> <!-- stat block --> */}
