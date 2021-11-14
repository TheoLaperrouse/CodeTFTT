	<!doctype html>
<html lang="en">
<head>
  <title>iframe Classement Pro B</title>
  <link href="table.css" rel="stylesheet">
</head>
<body>
 	<?php
	include("API_FFTT.php");
	$connexion = new API_FFTT();
	$poulePro = ($connexion->getPouleClassement('37884','207068'));
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
