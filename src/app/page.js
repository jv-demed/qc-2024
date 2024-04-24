'use client'

import { getChampions } from "@/services/riotServices";
import { useEffect, useState } from "react";

export default function Home() {
    const [champs, setChamps] = useState([]);

    useEffect(() => {
        getChampions().then(res => setChamps(res));
    }, []);

    return(
        <main>
            <ul>
                {champs.map(champ => {
                    return(
                        <li key={champ.id}>
                            <img src={`https://ddragon.leagueoflegends.com/cdn/14.8.1/img/champion/${champ.name}.png`} />
                            {champ.name}
                        </li>
                    )
                })}
            </ul>
        </main>
    );
}