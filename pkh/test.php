<?php
//ini_set('display_errors', 'On');

include('simple_html_dom.php');
set_error_handler('exceptions_error_handler');

function exceptions_error_handler($severity, $message, $filename, $lineno) {
  if (error_reporting() == 0) {
    return;
  }
  if (error_reporting() & $severity) {
    throw new ErrorException($message, 0, $severity, $filename, $lineno);
  }
}
$html = file_get_html("http://www.pkhonor.net/");

$helperArray = [];
$modArray = [];
$adminArray = [];
$ownerArray = [];

$table = $html->find('div.Table_rank tr');
$x = "";
foreach ($table as $key){
	//echo $key->tag;
	if ($key->tag == "tr"){
		$x = $key;
	}
}
$y = $x->find('div')[0];

$z = $y->find('a');
$z2 = $y->find('img');


for ($i = 0; $i < sizeof($z); $i++){
	try {
		$crownText = $z2[$i]->src;
	} catch (Exception $e){

	}
	//echo $crownText;
	if ($crownText != null && strpos($crownText, 'CROWN_30') !== false){
		array_push($helperArray, $z[$i]->innertext);
	};

	if ($crownText != null && strpos($crownText, 'CROWN_35') !== false){
		array_push($modArray, $z[$i]->innertext);
	};

	if ($crownText != null && strpos($crownText, 'CROWN_40') !== false){
		array_push($modArray, $z[$i]->innertext);
	};

	if ($crownText != null && strpos($crownText, 'CROWN_33') !== false){
		array_push($modArray, $z[$i]->innertext);
	};

	if ($crownText != null && strpos($crownText, 'CROWN_50') !== false){
		array_push($adminArray, $z[$i]->innertext);
	};

	if ($crownText != null && strpos($crownText, 'CROWN_60') !== false){
		array_push($ownerArray, $z[$i]->innertext);
	};

}

$total = [$helperArray, $modArray, $adminArray, $ownerArray];

echo json_encode($total);



?>