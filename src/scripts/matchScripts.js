import { supabase } from '@/services/supabaseService';

export async function getMatches(select){
    const {data, status, error} = await supabase
    .from('qc-partidas')
    .select(select)
    .order('data', { ascending: true });
    if(status != 200){
        console.log(error);
    }return data;
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

export function getPlayerName(id, list){
    const player = list.find(player => player.id == id);
    return player.nick;
}