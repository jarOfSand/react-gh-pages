const baseurl = 'https:/www.dnd5eapi.co'

async function get5eData(url: string) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        return await response.json();
    } catch (error: any) {
        console.error(error.message);
    }
}

export async function getMonsterList() {
    const url = baseurl + '/api/2014/monsters';
    const json = await get5eData(url);
    return json.results;
}

export async function getMonsterData(monsterIndex: string) {
    const url = baseurl + `/api/2014/monsters/${monsterIndex}`;
    return await get5eData(url);
}
