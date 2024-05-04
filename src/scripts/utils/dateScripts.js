export function formatDate(date){
    const part = date.split('-');
    const day = part[2];
    const month = part[1];
    const year = part[0];
    return `${day}/${month}/${year}`;
}

export function getCurrentDate(){
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}