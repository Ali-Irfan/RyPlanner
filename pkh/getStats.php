<?php
ini_set('display_errors', 'On');

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

$name = $_GET["q"];
$html = file_get_html("http://highscores.pkhonor.net/?u=" . $name);

$helperArray = [];
$modArray = [];
$adminArray = [];
$ownerArray = [];


$table = $html->find('table')[0];

$rowData = array();

foreach($table->find('tr') as $row) {
    // initialize array to store the cell data from each row
    $flight = array();
    foreach($row->find('td') as $cell) {
        // push the cell's text to the array
        $flight[] = $cell->plaintext;
    }
    $rowData[] = $flight;
}

echo json_encode($rowData);

?>