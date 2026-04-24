const baseurl = 'https://www.dnd5eapi.co/api/2014'

async function getDataAxios(url: string) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();

        
        return result;
    } catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
        return {};
    }
}

export async function getMonsterList() {
    const url = baseurl + '/monsters';
    
    const data = await getDataAxios(url);

    return data.results;
}

export async function getMonsterData(monsterIndex: string) {
    const url = baseurl + `/monsters/${monsterIndex}`;

    return await getDataAxios(url);
}
