<?php
require_once __DIR__ . "/../../../tournoi/Technique/AutoLoad.php";
\Technique\AutoLoad::loadTFTT();
	$html = view_WP::getHTMLPartenaires();
	echo $html ;
\Technique\AutoLoad::exitTFTT();
?>