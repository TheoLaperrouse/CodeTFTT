async function fetchLastMatches(){
    const res = await fetch("https://tftt.barais.fr/teams/lastmatches/numclub=03350060/phase=1")
    const matches = await res.json();
    document.getElementById('matches').innerHTML = matches.map(match => match ? `<li><b>${match.equipeA}</b>  ${match.scoreA} - ${match.scoreB} <b>${match.equipeB}</b></li>`: '').join('');
    let button = document.getElementById('button');
    button.value = 'Récupérer les prochains matches';
    button.onclick = fetchNextMatches;
}

async function fetchNextMatches(){
    const res = await fetch("https://tftt.barais.fr/teams/nextmatches/numclub=03350060/phase=1")
    const matches = await res.json();
    document.getElementById('matches').innerHTML = matches.map(match => match ? `<li><b>${match.equipeA}</b> - <b>${match.equipeB}</b></li>`: '').join('');
    let button = document.getElementById('button');
    button.value = 'Récupérer les derniers matches';
    button.onclick = fetchLastMatches;
}

fetchLastMatches()