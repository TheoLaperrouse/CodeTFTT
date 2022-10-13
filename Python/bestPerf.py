import string
import requests
from datetime import  datetime, timedelta

def formatPoint(points):
    return points.split()[2] if 'N' in points else points

if __name__ == '__main__':
    allVictories = []
    maxDate = datetime.now() - timedelta(days = 7)
    players = requests.get('https://tftt.barais.fr/players/club/03350060').json()['joueur']

    for player in players:
        matches = requests.get(f'https://tftt.barais.fr/players/matches/{player["licence"][0]}').json()
        player = requests.get(f'https://tftt.barais.fr/players/{player["licence"][0]}').json()
        if type(matches) == list: 
            filteredMatches = [
                {
                    'ecart' : int(formatPoint(match['classement'])) - int(formatPoint(player['points'])) ,
                    'nomAdversaire' : match['nom'], 
                    'nomJoueur' : f'{player["nom"]} {player["prenom"]}'
                }
                for match in matches 
                if datetime.strptime(match['date'], "%d/%m/%Y") > maxDate and match['victoire'] == True
            ]
        allVictories = allVictories + filteredMatches
    bestPerfs = sorted(allVictories, key=lambda match: match['ecart'], reverse=True)[0:3]
    print('Les 3 meilleures performances du WE :')
    for perf in bestPerfs : 
        print(f'{perf["nomJoueur"]} qui bat {perf["nomAdversaire"]} avec un écart de {perf["ecart"]} points')