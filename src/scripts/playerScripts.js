import { supabase } from '@/services/supabaseService';

export async function getPlayer(id){
    const {data, status, error} = await supabase
    .from('qc-jogadores').select('*')
    .eq('id', id);
    if(status != 200){
        console.log(error);
    }return data[0];
}

export async function getPlayerList(array){
    const playerIds = array.split(',');
    const playerList = [];
    for(const id of playerIds){
        const player = await getPlayer(id);
        playerList.push(player);
    }
    return playerList;
}