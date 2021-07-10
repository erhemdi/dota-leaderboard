const fetch = require('node-fetch');
const rawURL = "https://www.dota2.com/webapi/ILeaderboard/GetDivisionLeaderboard/v0001";
const americasRegion = "americas"
const europeRegion = "europe"
const seaRegion = "se_asia"
const chinaRegion = "china"

async function loadLeaderboards(division) {
    const params = new URLSearchParams({
        division: division,
        leaderboard: 0,
    })

    const url = `${rawURL}?${ params.toString() }`

    const response = await fetch(url);
    let data = await response.json()
    let top10Data = [];
    
    if ('leaderboard' in data && Array.isArray(data.leaderboard)) {
        top10Data = data.leaderboard.slice(0, 10);
    }

    return top10Data;
}

loadLeaderboards(seaRegion).
then(response => {
    console.log('Top 10 player = ' + JSON.stringify(response));
}).
catch(e => {
    console.log('Error fetch leaderboard data = ' + e.message);
})