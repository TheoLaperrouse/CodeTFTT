async function fetchLastMatches(){
    const res = await fetch("http://fastapifftt.thorigne-tt.net/matches/tftt")
    const matches = await res.json();
    document.getElementById('matches').innerHTML = matches.map(match => match ? `<li><b>${match.equa}</b>  ${match.scorea} - ${match.scoreb} <b>${match.equb}</b></li>`: '').join('');
    let button = document.getElementById('button');
    button.value = 'Récupérer les prochains matches';
    button.onclick = fetchNextMatches;
}

async function fetchNextMatches(){
    const res = await fetch("http://fastapifftt.thorigne-tt.net/matches/tftt")
    const matches = await res.json();
    document.getElementById('matches').innerHTML = matches.map(match => match ? `<li><b>${match.equa}</b> - <b>${match.equb}</b></li>`: '').join('');
    let button = document.getElementById('button');
    button.value = 'Récupérer les derniers matches';
    button.onclick = fetchLastMatches;
}

fetchLastMatches()