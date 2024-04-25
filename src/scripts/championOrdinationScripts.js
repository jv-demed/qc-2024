export function sortChampWinRate(champions){
    return champions.sort((a, b) => {
        if(a.winRate != b.winRate){
            return b.winRate - a.winRate;
        }if(a.matches != b.matches){
            return b.matches - a.matches;
        }if(a.wins != b.wins){
            return b.wins - a.wins;
        }
        return a.name.localeCompare(b.name);
    });
}