import { supabase } from '@/services/supabaseService';
import { addRecord, generateId } from '../database/tableScripts';

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
    if(validationConfront(confront)){
        const id = await generateId('qc-confrontos');
        await addRecord('qc-confrontos', {
            ...confront,
            id: id
        });
    }
}

function validationConfront(confront){
    return confront.jogador1 != confront.jogador2;
}