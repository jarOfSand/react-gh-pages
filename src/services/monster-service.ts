import axios from 'axios';

const baseurl = 'https://www.dnd5eapi.co/api/2014'

async function getDataAxios(url: string) {
    return await axios
        .get(url)
        .then((response) => {
            return response.data;
        });
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
