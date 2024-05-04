import { supabase } from '@/services/supabaseService';
import { addRecord, generateId, getRecordById, updateRecord } from '../database/tableScripts';
import { getCurrentDate } from '../utils/dateScripts';
import { getRandomIdClass } from '../classesScripts';

export async function getMatches(select){
    const {data, status, error} = await supabase
    .from('qc-partidas')
    .select(select)
    .order('data', { ascending: true });
    if(status != 200){
        console.log(error);
    }return data;
}

export async function getMatchById(id, select){
    return await getRecordById(id, 'qc-partidas', select);
}

export async function getMatchesByConfront(idConfront){
    const {data, status, error} = await supabase
    .from('qc-partidas').select('*')
    .eq('idConfronto', idConfront)
    .order('id')
    if(status != 200){
        console.log(error);
    }return data;
}

export async function addMatchesInConfront(confront){
    const round = await getRecordById(confront.idRodada, 'qc-rodadas', 'idCampeonato');
    const infos = await getRecordById(round.idCampeonato, 'qc-campeonatos', '*');
    console.log(infos);
    if(infos['md2Sort-3']){
        for(let i = 0; i < 2; i++){
            const players = i % 2 == 0 ? 
                [confront.jogador1, confront.jogador2] :
                [confront.jogador2, confront.jogador1];
            await addMatch(confront.id, players);
        }
    }
    if(infos['md1Joker-1']){
        const players = [confront.jogador1, confront.jogador2];
        await addMatch(confront.id, players, {
            joker: true
        });
    }
}

async function addMatch(idConfront, players, options){
    const id = await generateId('qc-partidas');
    await addRecord('qc-partidas', {
        ...options,
        id: id,
        data: getCurrentDate(),
        idConfronto: idConfront,
        jogador1: players[0],
        jogador2: players[1],
        classe: getRandomIdClass()
    });
}

export async function updateMatch(match){
    await updateRecord('qc-partidas', match, 'id', match.id);
}