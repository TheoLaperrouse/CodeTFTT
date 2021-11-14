<!doctype html>
<html lang="en">
<head>
  <title>Pour Elsa</title>
  <link href="table.css" rel="stylesheet">
</head>
<body>
 <?php
 include("API_FFTT.php");
 require __DIR__ . '/vendor/autoload.php';
 
 $api = new API_FFTT();
 $joueurs = $api->getJoueursByNom("Laperrouse");
 echo $joueurs;

	?>
</body>
</html>
