import { supabase } from '@/services/supabaseService';
import { addRecord, generateId } from '../database/tableScripts';
import { addMatchesInConfront } from './matchScripts';

export async function getConfrontById(id){
    const {data, status, error} = await supabase
    .from('qc-confrontos').select('*')
    .eq('id', id);
    if(status != 200){
        console.log(error);
    }return data[0];
}

export async function getConfrontsByRound(idRound){
    const { data, status, error } = await supabase
    .from('qc-confrontos').select('*')
    .eq('idRodada', idRound)
    .order('id')
    if(status !== 200){
        console.log(error);
    }
    return data;
}

export async function addConfront(confront){
    console.log(confront);
    if(validationConfront(confront)){
        const id = await generateId('qc-confrontos');
        const newConfront = {
            ...confront,
            id: id
        }
        await addRecord('qc-confrontos', newConfront);
        await addMatchesInConfront(newConfront);
    }
}

function validationConfront(confront){
    return confront.jogador1 != confront.jogador2;
}