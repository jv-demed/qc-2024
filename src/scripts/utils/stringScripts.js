export function getNumericArrayByStr(str){
    const trimmedStr = str.replace(/\s/g, '');
    const numbers = trimmedStr.match(/\d+/g);
    return numbers ? numbers.map(num => Number(num)) : [];
}