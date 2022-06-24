# Code TFTT

## Principe

Scripts utilisés pour le club de Tennis de Table de Thorigné Fouillard en Python et en Shell.
Fichiers PHP utilisés sur le Wordpress du Club.

## Python

5 Scripts :
- **cropVideo** : récupérer un extrait d'une vidéo ( = rogner une vidéo)
- **generateQRCode** : génère un QRCode à partir d'un lien
- **randomPickerQuizz** : récupère un gagnant aléatoire à partir d'un csv d'export de GoogleForm
- **youtubeDownloader** : télécharger des vidéos youtube à partir d'un lien
- **instaDownloader** : télécharger des photos/vidéos depuis un profil instagram public (plutôt utiliser le script Shell associé). Bloqué après un trop grand nombre de requêtes.

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
- **instaDownloader** : télécharger des photos/vidéos depuis un profil instagram public. Bloqué après un trop grand nombre de requêtes.

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
- **proBRanking** : Récupération du classement de la Pro B sous forme de tableau
- **exampleApiFFTT** : exemples de requêtes possibles sur l'api de la Fédération Française de Tennis de Table