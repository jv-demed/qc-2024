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

export function getClassIdByName(className){
    switch(className){
        case 'Assassin': {
            return 1;
        }case 'Marksman': {
            return 2;
        }case 'Fighter': {
            return 3;
        }case 'Mage': {
            return 4;
        }case 'Support': {
            return 5
        }case 'Tank': {
            return 6;
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

export function getClassesObjs(){
    return [
        {
            id: 1,
            name: 'Assassino'
        },{
            id: 2,
            name: 'Atirador'
        },{
            id: 3,
            name: 'Lutador'
        },{
            id: 4,
            name: 'Mago'
        },{
            id: 5,
            name: 'Suporte'
        },{
            id: 6,
            name: 'Tanque'
        },
    ]
}

export function getRandomIdClass(){
    return Math.floor(Math.random() * 6) + 1;
}