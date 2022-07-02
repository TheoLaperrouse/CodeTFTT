import requests

phase = input('Pour quelle phase souhaitez vous récupérer les derniers matchs (1 ou 2) ? ')
lastMatches = requests.get(f'http://localhost:3000/teams/nextmatches/numclub=03350060/phase={phase}').json()
for match in lastMatches:
    if match is not None:
        print(f"{match['equipeA']} - {match['equipeB']}")