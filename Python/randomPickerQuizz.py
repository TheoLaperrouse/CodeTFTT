import csv
import random

if __name__ == '__main__':
    good_answers = ["answer1","answer2"]
    candidats = []

    with open('answers.csv', newline='') as file:
        answers = csv.reader(file, delimiter=',')
        for answer in answers:
            valid = True
            for i in range(0, 5):
                if answer[i+3] != good_answers[i]:
                    valid = False
            if valid:
                candidats.append(answer[2])
    [print(f'{i} : {candidat}') for i, candidat in enumerate(candidats)]

    # Pour un peu de suspens
    # for i in range(0, 10):
    #    print(random.randrange(0, 30) * '.')
    #    time.sleep(1)

    print(
        f'\nLe grand gagnant de ce super quizz est {candidats[random.randrange(0, len(candidats))]}')
