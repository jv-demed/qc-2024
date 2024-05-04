'use client'

import { Main } from '@/components/boxes/Main';
import { HeaderMenu } from '@/components/menu/HeaderMenu';
import { ConfrontEditor } from '@/components/register/ConfrontEditor';


export default function Confronto({ params }){
    return(
        <Main>
            <HeaderMenu />
            <ConfrontEditor 
                idConfront={params.id}
            />
        </Main>
    );
}