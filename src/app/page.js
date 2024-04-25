'use client'

import { getChampions } from '@/scripts/championScripts';
import { useEffect, useState } from 'react';

export default function Home(){

    const [champs, setChamps] = useState([]);
    const [list, setList] = useState([]);

    useEffect(() => {
        getChampions().then(res => setChamps(res));
    }, []);

    useEffect(() => {
        const test = champs.map(c => {
            return {
                key: c.key,
                name: c.name
            }
        })
        setList(test);
    }, [champs]);

    console.log(list);

    return(
        <main>
            <ul>
                {list.map(champ => {
                    return(
                        <li key={champ.id}>
                            <span>Key: {champ.key}, </span>
                            <span>Nome: {champ.name}</span>
                        </li>
                    )
                })}
            </ul>
        </main>
    );
}