export function sortAlpha(list, info){
    return list.sort((a, b) => {
        return a[info].localeCompare(b[info]);
    });
}