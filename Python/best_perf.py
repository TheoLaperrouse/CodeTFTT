from datetime import  datetime, timedelta
import requests


def format_point(points):
    return points.split()[2] if 'N' in points else points

def get_players():
    players_with_points = requests.get(
                            'https://tftt.barais.fr/players/club/03350060',
                            timeout=10
                        ).json()
    competitive_players = requests.get(
                            'https://tftt.barais.fr/players/competitiv/club/03350060',
                            timeout=10
                        ).json()
    keep_list_num_lic = [player['licence'] for player in competitive_players]
    players = [player for player in players_with_points if player['licence'] in keep_list_num_lic]
    return players

if __name__ == '__main__':
    allVictories = []
    maxDate = datetime.now() - timedelta(days = 7)
    for player in get_players():
        filteredMatches = []
        matches = requests.get(
            f'https://tftt.barais.fr/players/matches/{player["licence"]}',
            timeout=10
        ).json()
        if isinstance(matches, list):
            filteredMatches = [
                {
                    'ecart' : float(format_point(match['classement']))\
                         - float(format_point(player['points'])) ,
                    'nomAdversaire' : match['nom'],
                    'nomJoueur' : f'{player["nom"]} {player["prenom"]}',
                    'pointsAdversaire' : format_point(match['classement']),
                    'pointsJoueurs' : format_point(player['points'])
                }
                for match in matches
                if datetime.strptime(match['date'], "%d/%m/%Y") > maxDate  \
                    and match['victoire'] is True # False
            ]
        allVictories = allVictories + filteredMatches
    bestPerfs = sorted(allVictories, key=lambda match: match['ecart'],reverse=True)[0:3]
    print('Les 3 meilleures performances du WE :')
    for perf in bestPerfs :
        print(
            f'- {perf["nomJoueur"]} ({perf["pointsJoueurs"]}) contre {perf["nomAdversaire"]}'\
            f'({perf["pointsAdversaire"]}) (écart : {perf["ecart"]} points)'
        )
    # print('Les 3 pires performances du WE :')
    # for perf in bestPerfs :
    #     print(f'- {perf["nomJoueur"]} ({perf["pointsJoueurs"]}) contre {perf["nomAdversaire"]}'\
    #  '({perf["pointsAdversaire"]}) (écart : {perf["ecart"]} points)')
