export function sortPlayersPontuation(players){
    return players.sort((a, b) => {
        if(a.points !== b.points){
            return b.points - a.points;
        }if(a.wins !== b.wins){
            return b.wins - a.wins;
        }if(a.loses !== b.loses){
            return a.loses - b.loses;
        }if(a.time !== b.time){
            return a.time - b.time; // Assumindo que "time" é o tempo em que levou para ganhar
        }if(a.matches !== b.matches){
            return b.matches - a.matches;
        }return a.nick.localeCompare(b.nick);
    });
}