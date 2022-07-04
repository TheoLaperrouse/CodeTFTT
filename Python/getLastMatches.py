import requests

phase = input('Pour quelle phase souhaitez vous récupérer les derniers matchs (1 ou 2) ? ')
last_matches = requests.get(f'https://tftt.barais.fr/teams/lastmatches/numclub=03350060/phase={phase}').json()
for match in last_matches:
    if match is not None:
        print(f"\033[1m{match['equipeA']}\033[0m  \033[91m{match['scoreA']}-{match['scoreB']}\033[0m  \033[1m{match['equipeB']}\033[0m")