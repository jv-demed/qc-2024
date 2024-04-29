export function formatData(date){
    const part = date.split('-');
    const day = part[2];
    const month = part[1];
    const year = part[0];
    return `${day}/${month}/${year}`;
}