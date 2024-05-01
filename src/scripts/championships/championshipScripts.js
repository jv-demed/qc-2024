import { supabase } from '@/services/supabaseService';
import { getMatchesByConfront } from '../matchScripts';

export async function getCurrentChampionship(){
    const { data, status, error } = await supabase
        .from('qc-campeonatos').select('*')
        .order('id', { ascending: false })
        .limit(1);
    if(status !== 200){
        console.log(error);
    }
    return data[0];
}

export async function getRounds(idChampionship){
    const { data, status, error } = await supabase
        .from('qc-rodadas').select('*')
        .eq('idCampeonato', idChampionship)
        .order('id')
    if(status !== 200){
        console.log(error);
    }
    return data;
}

export async function getConfronts(idRound){
    const { data, status, error } = await supabase
        .from('qc-confrontos').select('*')
        .eq('idRodada', idRound)
        .order('id')
    if(status !== 200){
        console.log(error);
    }
    return data;
}

export async function getGameData(idChampionship){
    const rounds = await getRounds(idChampionship);
    const gameData = await Promise.all(rounds.map(async round => {
        const confronts = await getConfronts(round.id);
        const roundMatches = await Promise.all(confronts.map(async confront => {
            return await getMatchesByConfront(confront.id);
        }));
        return roundMatches;
    }));
    return gameData;
}

export async function getClassification(current, gameData, playerList){
    return playerList.map(p => {
        const stats = {
            id: p.id,
            farm: 0,
            jokers: 0,
            kills: 0,
            loses: 0,
            matches: 0,
            nick: p.nick,
            points: 0,
            towers: 0,
            wins: 0,
            time: 0
        }
        gameData.forEach((r, i) => {
            current <= (i+1) && r.forEach(c => {
                if(c[0] && c[1] && c[2]){
                    if(c[0].jogador1 == p.id && c[1].jogador2 == p.id){
                        if(c[0].resultado == 1 && c[1].resultado == 2){
                            stats.points += 3;
                        }else if(c[0].resultado == 1 || c[1].resultado == 2){
                            stats.points += 1;
                        }
                    }if(c[0].jogador2 == p.id && c[1].jogador1 == p.id){
                        if(c[0].resultado == 2 && c[1].resultado == 1){
                            stats.points += 3;
                        }else if(c[0].resultado == 2 || c[1].resultado == 1){
                            stats.points++;
                        }
                    }
                    if(c[2].jogador1 == p.id && c[2].resultado == 1){
                        stats.jokers++;
                        stats.points++;
                    }if(c[2].jogador2 == p.id && c[2].resultado == 2){
                        stats.jokers++;
                        stats.points++;
                    }
                    c.forEach(match => {
                        if(match.jogador1 == p.id){
                            !match.joker && match.resultado && stats.matches++;
                            if(match.resultado == 1){
                                match.metodo == 1 && stats.kills++
                                match.metodo == 2 && stats.farm++
                                match.metodo == 3 && stats.towers++
                                !match.joker && stats.wins++;
                                stats.time += match.tempo
                            }else{
                                !match.joker && stats.loses++;
                            }
                        }else if(match.jogador2 == p.id){
                            !match.joker && match.resultado && stats.matches++;
                            if(match.resultado == 2){
                                match.metodo == 1 && stats.kills++
                                match.metodo == 2 && stats.farm++
                                match.metodo == 3 && stats.towers++
                                !match.joker && stats.wins++;
                                stats.time += match.tempo
                            }else{
                                !match.joker && stats.loses++;
                            }
                        }
                    });
                }
            });
        });
        console.log(stats)
        return stats;
    });
}

export function isPlayoffs(infos){
    if(infos.oitavas || infos.quartas || infos.semi
    || infos.terceiro || infos.final){
        return true;
    }return false;
}