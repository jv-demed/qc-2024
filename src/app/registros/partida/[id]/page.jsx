'use client'

import { Main } from '@/components/boxes/Main';
import { HeaderMenu } from '@/components/menu/HeaderMenu';
import { MatchEditor } from '@/components/register/MatchEditor';


export default function Partida({ params }){
    return(
        <Main>
            <HeaderMenu />
            <MatchEditor
                idMatch={params.id}
            />
        </Main>
    );
}