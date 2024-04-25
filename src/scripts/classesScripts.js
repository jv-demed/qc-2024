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