

export type ability = {
    name: string,
    desc: string,
    usage?: {
        type: string,
        times: number,
        rest_types: string[] // unused
    }
}

type armor_class = {
    type: string,
    value: number,
    condition?: {
        index: string,
        name: string,
        url: string // unused
    }
}

type proficiency = {
    value: number,
    proficiency: {
        index: string,
        name: string, // unused
        url: string // unused
    }
}

export type monster = {
    armor_class: armor_class[],
    name: string,
    size: string,
    type: string,
    hit_points: string,
    hit_points_roll: string,

    strength: number,
    dexterity: number,
    constitution: number,
    intelligence: number,
    wisdom: number,
    charisma: number,

    proficiencies: proficiency,

    languages: string,
    challenge_rating: number,
    special_abilities: ability[],
    actions: string,
}
