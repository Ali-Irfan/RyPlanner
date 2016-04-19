<?php 
ini_set('display_errors', 1);
error_reporting(E_ALL ^ E_NOTICE);
$name = $_GET["prof"];
$name = urlencode($name);
$url = "http://www.ratemyprofessors.com/search.jsp?query=".$name;
//echo $url;
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

$html = file_get_contents_curl($url);
//echo $html;
$html2;
//parsing begins here:
$doc = new DOMDocument();
@$doc->loadHTML($html);

$counter  = 0;

	foreach ($doc->getElementsByTagName('a') as $node) {
	    $htmlOfProf = $doc->saveHtml($node);
	    if (strpos($htmlOfProf,'Ryerson University') !== false && $counter == 0) {
	    echo "http://www.ratemyprofessors.com".$node->getAttribute( 'href' );
	    $counter = $counter + 1;
	    //echo $html2;
		}
	}
?>
