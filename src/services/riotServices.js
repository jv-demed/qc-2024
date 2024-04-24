export async function getChampions(){
    const url = 'https://ddragon.leagueoflegends.com/cdn/14.8.1/data/pt_BR/champion.json';
    try{
        const response = await fetch(url);
        if(!response.ok) {
            throw new Error('Erro ao buscar os campeões.');
        }
        const data = await response.json();
        return Object.values(data.data);
    }catch(error){
        console.error('Erro:', error);
        throw error;
    }
}