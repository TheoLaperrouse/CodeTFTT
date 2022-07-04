import requests

phase = input('Pour quelle phase souhaitez vous récupérer les derniers matchs (1 ou 2) ? ')
next_matches = requests.get(f'https://tftt.barais.fr/teams/lastmatches/numclub=03350060/phase={phase}').json()
for match in next_matches:
    if match is not None:
        print(f"{match['equipeA']} - {match['equipeB']}")