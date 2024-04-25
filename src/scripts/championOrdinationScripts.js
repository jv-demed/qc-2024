export function sortChampWinRate(champions){
    return champions.sort((a, b) => {
        const clearMatchesA = a.matches - a.same;
        const clearMatchesB = b.matches - b.same;
        if(a.winRate != b.winRate){
            return b.winRate - a.winRate;
        }if(clearMatchesA != clearMatchesB){
            return clearMatchesB - clearMatchesA;
        }if(a.wins != b.wins){
            return b.wins - a.wins;
        }
        return a.name.localeCompare(b.name);
    });
}