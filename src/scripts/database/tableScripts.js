import { supabase } from '@/services/supabaseService';

export async function getTable(table, select){
    const {data, status, error} = await supabase.from(table)
    .select(select).order('id', { ascending: true });
    if(status != 200){
        console.log(error);
    }return data;
}

export async function addRecord(table, obj){
    const { status, error } = await supabase
    .from(table)
    .insert(obj);
    if(status != 201){
        console.log(error);
    }
}

export async function generateId(table){
    const list = await getTable(table, 'id', 'id');
    if(list.length != 0){
        return list[list.length-1].id + 1;
    }
    return 1;
}