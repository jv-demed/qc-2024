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