import { supabase } from '@/services/supabaseService';

const token = 'sb-gslgflzuxvsngdyoutwr-auth-token';

export function getUser(){
    if(typeof localStorage != 'undefined'){
        const session = JSON.parse(localStorage.getItem(token));
        if(session){
            return session.user;
        }
    }return null;
}

export function isLogin(){
    if(typeof localStorage != 'undefined'){
        const session = JSON.parse(localStorage.getItem(token));
        if(session){
            return true;
        }
    }return false;
}

export async function login(user, router){
    const { error } = await supabase.auth.signInWithPassword(user);
    if(error){
        console.log(`Erro ao logar:\n${error}`);
    }else{
        router.push('/');
    }
}