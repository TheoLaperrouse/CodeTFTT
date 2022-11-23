import requests

if __name__ == '__main__':
    phase = input(
        'Pour quelle phase souhaitez vous récupérer les prochains matchs (1 ou 2) ? ')

    last_matches = requests.get(
            f'https://tftt.barais.fr/teams/nextmatches/numclub=03350060/phase={phase}',
            timeout=10
        ).json()

    print(*(
            f"\033[1m{match['equipeA']} - {match['equipeB']}\033[0m"
            for match in last_matches
            if match is not None)
        , sep="\n")
