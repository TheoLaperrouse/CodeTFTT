import requests

BASE_URL = 'http://fastapifftt.thorigne-tt.net'

def get_proa_players_performance():
    url = f'{BASE_URL}/matches/proA'
    response = requests.get(url, timeout = 100)
    response.raise_for_status()
    data = response.json()

    for nom, stats in data:
        club = stats.get('club', '')
        victoires = stats['vict']
        matches = stats['matches']
        ratio_victoires = stats['win_ratio']
        print(f"{nom}({club}) {victoires} / {matches} ({ratio_victoires})")

if __name__ == '__main__':
    get_proa_players_performance()
    