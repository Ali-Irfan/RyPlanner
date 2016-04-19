<?php

$htmlString = $_GET['q'];

$dom = new DOMDocument();
$dom->loadHTML($htmlString);


$xpath = new DOMXpath($dom);
$result = $xpath->query('//div[@class="d2l-datalist-container"]');
if ($result->length > 0) {
    var_dump($result->item(0)->nodeValue);
}

echo $result;

?>