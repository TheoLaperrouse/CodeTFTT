<!doctype html>
<html lang="en">
<head>
  <title>Test API FFTT</title>
  <style>
	th {
		background-color: #1E73B4;
		color: white;
	}
	tr:nth-child(even) {background-color: #f2f2f2;}
  </style>
</head>
<body>
 <?php
	include("API_FFTT.php");
	$connexion = new API_FFTT();

	// 1ère Requête, récupérer tous les clubs du département et les afficher

	echo "<h2>Tous les clubs du département</h2>";
	$affichage_club_departement = ($connexion->getClubsByDepartement(35));
	echo "<table>";
	echo "<tr><th>Idclub</th><th>Numéro</th><th>Club</th></tr>";
	foreach($affichage_club_departement as $dep=>$club){
		echo '<tr>';
   		echo '<td>'.$club['idclub'].'</td><td>'.$club['numero'].'</td><td>'.$club['nom'].'</td>';
		echo '</tr>';
	}
	echo "</table>";

	// 2ème requête, récupérer les informations du Club de Thorigné Fouillard 

	echo "<h2>Informations du club de Tennis de Table de Thorigné</h2>";
	$tftt = ($connexion->getClub('03350060'));
	echo 'Nom Club : '.$tftt['nom'].'<br>';
	echo 'Nom Correspondant : '.$tftt['nomcor'].' '.$tftt['prenomcor'].'<br>'; 
    echo 'Mail du correspondant : '.$tftt['mailcor'];

	// 3ème requête, récupérer tous les joueurs de Thorigné Fouillard et les afficher

	echo "<h2>Les joueurs de Thorigné Fouillard</h2>";
	$joueurclub = ($connexion->getJoueursByClub('03350060'));
	echo "<table>";
	echo "<tr><th>Nom</th><th>prénom</th><th>Classement</th></tr>";
	foreach($joueurclub as $club=>$joueur){
		echo '<tr>';
   		echo '<td>'.$joueur['nom'].'</td><td>'.$joueur['prenom'].'</td><td>'.$joueur['clast'].'</td>';
		echo '</tr>';
	}
	echo "</table>";

	// 4ème requête, récupérer toutes les équipes du club de Thorigné Fouillard et les afficher

	echo "<h2>Les équipes de Thorigné Fouillard (Elles ne sont pas disponibles en fin de saison sportive)</h2>";
	$equipesTftt = ($connexion->getEquipesByClub('03350060','F'));
	foreach($equipesTftt as $equipe){
		echo '1';
	}
	echo "<table>";
	echo "<tr><th>Libellé de l'équipe</th><th>Division</th></tr>";
	foreach($equipesTftt as $club=>$equipe){
		echo '<tr>';
   		echo '<td>'.$equipe['libequipe'].'</td><td>'.$equipe['libdivision'].'</td>';
   		echo '</tr>';
	}
	echo "</table>";

	// 5ème requête, récupérer le classement de l'équipe de Pro B et l'afficher
	
	echo "<h2>Classement Pro B</h2>";
	$poulePro = ($connexion->getPouleClassement('13529','108189'));
	echo "<table>";
	echo "<tr><th>Nom équipe</th><th>Points</th></tr>";
	foreach($poulePro as $pro=>$equipe){
		echo '<tr>';
   		echo '<td>'.$equipe['equipe'].'</td><td>'.$equipe['pts'].'</td>';
   		echo '</tr>';
	}	
	echo "</table>";

	//6ème requête, récupérer les données d'un joueur en particulier et les afficher, ici Théo LAPERROUSE
	echo "<h2>Classement d'un joueur en particulier</h2>";
	$joueur = ($connexion->getJoueur('3524012'));
	echo 'Le joueur '.$joueur['nom'].' '.$joueur['prenom'].' a le numéro de licence n°'.$joueur['licence'].', a '.$joueur['valcla'].' points en officiel et '.$joueur['point'].' points en mensuel';
	$rencontre = ($connexion->getPouleClassement('3524012'));
	?>
</body>
</html>
