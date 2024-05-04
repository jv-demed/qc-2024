import { apiConfig } from '@/assets/apiConfig';
import { championsUrl } from '@/services/riotServices';

export async function getChampions(){
    const response = await fetch(championsUrl);
    const data = await response.json();
    return Object.values(data.data);
}

export async function getInfoChampions(champList){
    const champions = await getChampions();
    return champList.map(c => {
        const champ = champions.find(champ => champ.key == c.key);
        return {
            ...c,
            ...champ
        };
    });
}

export function getChampionName(id, list){
    const champ = list.find(champ => champ.key == id);
    return champ && champ.name;
}

export function getChampionImg(id, list){
    const champ = list.find(champ => champ.key == id);
    if(champ){
        return `${apiConfig.imgUrl}${champ.image.full}`;
    }
}

export function getChampionLoadingScreenImg(id, list){
    const champ = list.find(champ => champ.key == id);
    if(champ){
        return `${apiConfig.imgLoadingScreenUrl}${champ.id}_0.jpg`;
    }
}