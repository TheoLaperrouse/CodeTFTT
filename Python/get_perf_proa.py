import requests

BASE_URL = 'http://fastapifftt.thorigne-tt.net'

def get_proa_players_performance():
    url = f'{BASE_URL}/matches/proA'
    response = requests.get(url, timeout = 40)
    response.raise_for_status()
    data = response.json()

    for nom, data in data[0]:
        club = data['club']
        victoires = data['vict']
        matches = data['matches']
        ratio_victoires = data['win_ratio']
        print(f"{nom}({club}) {victoires} / {matches} ({ratio_victoires})")
if __name__ == '__main__':
    get_proa_players_performance()
    