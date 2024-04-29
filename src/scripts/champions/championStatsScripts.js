import { getMatches } from '../matchScripts';
import { getBasicInfoChampions } from './championScripts';

export async function getChampionsStats(){
    const matches = await getMatches('*');
    const champList = getChampList(matches);
    const resultsStats = getResultsStats(matches, champList);
    return await getBasicInfoChampions(resultsStats);
}

function getResultsStats(matches, champList){
    return champList.map(champ => {
        let wins = 0;
        let loses = 0;
        let same = 0;
        matches.forEach(m => {
            if(champ.key == m.campeao1 && m.campeao1 == m.campeao2){
                same++;
            }else{
                if(m.resultado == 1){
                    if(m.campeao1 == champ.key){
                        wins++;
                    }else if(m.campeao2 == champ.key){
                        loses++;
                    }
                }else if(m.resultado == 2){
                    if(m.campeao2 == champ.key){
                        wins++;
                    }else if(m.campeao1 == champ.key){
                        loses++;
                    }
                }
            }
        });
        return {
            ...champ,
            wins: wins,
            loses: loses,
            same: same,
            matches: wins+loses+same,
            winRate: (wins*100) / (wins+loses)
        };
    });
}

function getChampList(matches){
    const champList = [];
    matches.forEach(m => {
        if(champList.length == 0){
            champList.push({ key: m.campeao1 });
            if(m.campeao1 != m.campeao2){
                champList.push({ key: m.campeao2 });
            }
        }else{
            if(!champList.some(c => c.key == m.campeao1)){
                champList.push({ key: m.campeao1 });
            }if(!champList.some(c => c.key == m.campeao2)){
                champList.push({ key: m.campeao2 });
            }
        }
    });
    return champList;
}