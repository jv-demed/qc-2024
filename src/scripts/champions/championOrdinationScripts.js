export function sortChampWinRate(champions){
    return champions.sort((a, b) => {
        const clearMatchesA = a.matches - a.same;
        const clearMatchesB = b.matches - b.same;
        if(a.winRate != b.winRate){
            return b.winRate - a.winRate;
        }if(a.wins != b.wins){
            return b.wins - a.wins;
        }if(clearMatchesA != clearMatchesB){
            return clearMatchesA - clearMatchesB;
        }
        return a.name.localeCompare(b.name);
    });
}