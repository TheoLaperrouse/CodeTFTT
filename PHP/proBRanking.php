<!doctype html>
<html lang="en">
<head>
  <style>
	th {
		background-color: #1E73B4;
		color: white;
	}
	tr:nth-child(even) {background-color: #f2f2f2;}
  </style>
  <title>Classement Pro A</title>
</head>
<body>
 	<?php
	include("API_FFTT.php");
	$connexion = new API_FFTT();
	$poulePro = ($connexion->getPouleClassement('106853','437620'));
	echo "<table>";
 	echo "<tr><th>Équipe</th><th>Points</th><th>MJ</th></tr>";
	foreach($poulePro as $pro=>$equipe){
		echo '<tr>';
   		echo '<td>'.$equipe['equipe'].'</td><td align="center">'.$equipe['pts'].'</td><td align="center">'.$equipe['joue'].'</td>';

   		echo '</tr>';
	}	
	echo "</table>";
	?>
	</body>
</html>