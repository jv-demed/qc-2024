export function convertClass(className){
    switch(className){
        case 'Assassin': {
            return 'Assassino';
        }case 'Fighter': {
            return 'Lutador';
        }case 'Mage': {
            return 'Mago';
        }case 'Marksman': {
            return 'Atirador';
        }case 'Support': {
            return 'Suporte'
        }case 'Tank': {
            return 'Tanque';
        }
    }
}

export function getClassNameById(id){
    switch(id){
        case 1: {
            return 'Assassino';
        }case 2: {
            return 'Atirador';
        }case 3: {
            return 'Lutador';
        }case 4: {
            return 'Mago';
        }case 5: {
            return 'Suporte'
        }case 6: {
            return 'Tanque';
        }
    }
}