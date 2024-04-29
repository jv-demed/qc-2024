export function sortPlayersPontuation(players){
    return players.sort((a, b) => {
        if(a.points != b.points){
            return b.points - a.points;
        }if(a.wins != b.wins){
            return b.wins - a.wins;
        }return a.nick.localeCompare(b.nick);
    });
}