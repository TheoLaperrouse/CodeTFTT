# Code TFTT

## Principe

Scripts utilisés pour le club de Tennis de Table de Thorigné Fouillard en Python et en Shell.
Fichiers PHP utilisés sur le Wordpress du Club.

## Python

10 Scripts :
- **cropVideo** : Récupérer un extrait d'une vidéo ( = rogner une vidéo)
- **jpegToPng** : Convertir une image jpeg en png ( = remplacer un fond blanc par du transparent)
- **generateQRCode** : Génère un QRCode à partir d'un lien
- **randomPickerQuizz** : Récupère un gagnant aléatoire à partir d'un csv d'export de GoogleForm
- **youtubeDownloader** : Télécharger des vidéos youtube à partir d'un lien
- **bestPerf** : Récupérer la meilleure performance du dernier WE de compétition
- **getLastMatches** : Récupère le résultat du dernier match de toutes les équipes du TFTT
- **getNextMatches** : Récupérer les prochainns matchs des équipes du TFTT
- **instaDownloader** : Télécharger des photos/vidéos depuis un profil instagram public (plutôt utiliser le script Shell associé). Bloqué après un trop grand nombre de requêtes.
- **exportTableaux** : Script pour faire un fichier XLSX propre avec l'export CSV de la BDD pour le tournoi du club

### Utilisation :

Accèder au dossier Python:

```sh
cd Python
```

Installer les librairies requises :

```sh
pip3 install -r requirements.txt
```

Lancer un des scripts : 

```sh
python3 nomDuScript.py
```
puis suivre les instructions sur le terminal

## Shell 

1 Script :
- **instaDownloader** : Télécharger des photos/vidéos depuis un profil instagram public. Bloqué après un trop grand nombre de requêtes.

### Utilisation :

Accèder au dossier Shell:

```sh
cd Shell
```

Donner les droits pour exécuter le script shell :

```sh
chmod +x instaDownloader.sh
```

Exécuter le script shell :

```sh
./instaDownloader.sh
```

puis suivre les instructions sur le terminal

## PHP 

2 Fichiers :
- **proARanking** : Récupération du classement de la Pro A sous forme de tableau
- **exampleApiFFTT** : exemples de requêtes possibles sur l'api de la Fédération Française de Tennis de Table
