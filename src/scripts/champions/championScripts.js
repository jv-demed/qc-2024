import { apiConfig } from '@/assets/apiConfig';
import { championsUrl } from '@/services/riotServices';

export async function getChampions(){
    const response = await fetch(championsUrl);
    const data = await response.json();
    return Object.values(data.data);
}

export async function getBasicInfoChampions(champList){
    const champions = await getChampions();
    console.log(champions);
    return champList.map(c => {
        const champ = champions.find(champ => champ.key == c.key);
        return {
            ...c,
            image: `${apiConfig.imgUrl}${champ.image.full}`,
            name: champ.name,
            class: champ.tags[0]
        };
    });
}