import requests
from datetime import  datetime, timedelta

def formatPoint(points):
    return points.split()[2] if 'N' in points else points

def getPlayers():
    playersWithPoints = requests.get('https://tftt.barais.fr/players/club/03350060').json()
    competitivePlayers = requests.get('https://tftt.barais.fr/players/competitiv/club/03350060').json()
    keepListNumLic = [player['licence'] for player in competitivePlayers]
    players = [player for player in playersWithPoints if player['licence'] in keepListNumLic]
    return players

if __name__ == '__main__':
    allVictories = []
    maxDate = datetime.now() - timedelta(days = 7)
    for player in getPlayers():
        filteredMatches = []
        matches = requests.get(f'https://tftt.barais.fr/players/matches/{player["licence"]}').json()
        if type(matches) == list: 
            filteredMatches = [
                {
                    'ecart' : float(formatPoint(match['classement'])) - float(formatPoint(player['points'])) ,
                    'nomAdversaire' : match['nom'], 
                    'nomJoueur' : f'{player["nom"]} {player["prenom"]}',
                    'pointsAdversaire' : formatPoint(match['classement']),
                    'pointsJoueurs' : formatPoint(player['points'])
                }
                for match in matches 
                if datetime.strptime(match['date'], "%d/%m/%Y") > maxDate and match['victoire'] == True # False
            ]
        allVictories = allVictories + filteredMatches
    bestPerfs = sorted(allVictories, key=lambda match: match['ecart'],reverse=True)[0:3] # enlever reverse
    print('Les 3 meilleures performances du WE :')
    for perf in bestPerfs : 
        print(f'- {perf["nomJoueur"]} ({perf["pointsJoueurs"]}) contre {perf["nomAdversaire"]} ({perf["pointsAdversaire"]}) (écart : {perf["ecart"]} points)')
    # print('Les 3 pires performances du WE :')
    # for perf in bestPerfs : 
    #     print(f'- {perf["nomJoueur"]} ({perf["pointsJoueurs"]}) contre {perf["nomAdversaire"]} ({perf["pointsAdversaire"]}) (écart : {perf["ecart"]} points)')