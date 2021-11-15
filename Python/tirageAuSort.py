import csv
import random
import time

good_answers = ["Iranien", "Saison 2019/2020",
                "N°40 Mondial;2012", "Il change parfois de main", "Butterfly"]
candidats = []

with open('reponses.csv', newline='') as file:
    answers = csv.reader(file, delimiter=',')
    for answer in answers:
        valid = True
        for i in range(0, 5):
            if answer[i+3] != good_answers[i]:
                valid = False
        if valid:
            candidats.append(answer[2])

for i, candidat in enumerate(candidats):
    print(f'{i} : {candidat}')

# Pour un peu de suspens
# for i in range(0, 10):
#    print(random.randrange(0, 30) * '.')
#    time.sleep(1)

print(
    f'\nLe grand gagnant de ce super quizz est {candidats[random.randrange(0, len(candidats))]}')
