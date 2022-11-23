# Code TFTT

## Principe

Scripts utilisés pour le club de Tennis de Table de Thorigné Fouillard en Python et en Shell.
Fichiers PHP utilisés sur le Wordpress du Club.

## Python

11 Scripts :
- **crop_video** : Récupérer un extrait d'une vidéo ( = rogner une vidéo)
- **jpeg_to_png** : Convertir une image jpeg en png ( = remplacer un fond blanc par du transparent)
- **generate_qr_code** : Génère un QRCode à partir d'un lien
- **random_picker_quizz** : Récupère un gagnant aléatoire à partir d'un csv d'export de GoogleForm
- **youtube_downloader** : Télécharger des vidéos youtube à partir d'un lien
- **best_perf** : Récupérer la meilleure performance du dernier WE de compétition
- **get_last_matches** : Récupère le résultat du dernier match de toutes les équipes du TFTT
- **get_next_matches** : Récupérer les prochainns matchs des équipes du TFTT
- **insta_downloader** : Télécharger des photos/vidéos depuis un profil instagram public (plutôt utiliser le script Shell associé). Bloqué après un trop grand nombre de requêtes.
- **export_tableaux** : Script pour faire un fichier XLSX propre avec l'export CSV de la BDD pour le tournoi du club
-  **flaskSlides/app.py** : Script permettant de faire tourner un serveur web sur la machine, incluant des commandes pour changer les diapositives à distance

Ajout de pylint et precommit pour l'analyse statique du code Python

### Utilisation :

Installer les librairies requises à la racine du projet:

```sh
pip install -r requirements.txt
```

Accéder au dossier Python:

```sh
cd Python
```

Lancer un des scripts : 

```sh
python3 nom_du_script.py
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

## Extension Chrome

Sur Chrome/Brave, aller dans gérer mes extensions : 
- Activer le mode développeur
- Charger l'extension non embarqué
- Sélectionner le dossier contenant l'extension Chrome (exemple : matchesTFTT)
- Mettre l'extension en 'pinned' pour un accès plus rapide

1 Extension : 
- **matchesTFTT** : Récupération des anciens et des prochains matches

## AppScripts

Scripts visant à la modification de feuilles GoogleSheet (Voir Extensions -> AppsScript)

3 scripts : 
- getData : Récupération de toutes les rencontres de la phase avec les joueurs pour les matches déjà joués
- updateData : Met à jour les catégories et le brulâge selon les données de rencontres
- utils : Scripts facilitant l'utilisation
