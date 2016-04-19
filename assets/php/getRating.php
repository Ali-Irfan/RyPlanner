<?php 
$url = $_GET["url"];
ini_set('display_errors', 1);
error_reporting(E_ALL ^ E_NOTICE);
function file_get_contents_curl($url)
{
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_HEADER, 0);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);

    $data = curl_exec($ch);
    curl_close($ch);

    return $data;
}

$arr = array();

$html = file_get_contents_curl($url);
//parsing begins here:
$doc = new DOMDocument();
@$doc->loadHTML($html);
$classname = "grade";
$xpath = new DOMXPath($doc);
$results = $xpath->query("//*[@class='" . $classname . "']");

if ($results->length > 0) {
    //echo $review = $results->item(1)->nodeValue;
    array_push($arr,  $results->item(1)->nodeValue);
}

$classname2 = "rating-slider";
$xpath2 = new DOMXPath($doc);
$results2 = $xpath2->query("//*[@class='" . $classname2 . "']");

if ($results->length > 0) {
    //echo $review = $results2->item(0)->nodeValue;
    array_push($arr, $results2->item(0)->nodeValue);
    array_push($arr, $results2->item(1)->nodeValue);
    array_push($arr, $results2->item(2)->nodeValue);

}

echo json_encode($arr);

?>
