<?php
$mysqli = new MySQLi("localhost", "ali", "Ali440134" ,"ryerson_data");
/* Connect to database and set charset to UTF-8 */
if($mysqli->connect_error) {
  echo 'Database connection failed...' . 'Error: ' . $mysqli->connect_errno . ' ' . $mysqli->connect_error;
  exit;
} else {
  $mysqli->set_charset('utf8');
}
/* retrieve the search term that autocomplete sends */
$term = trim(strip_tags($_GET['term'])); 
$a_json = array();
$a_json_row = array();
if ($data = $mysqli->query("SELECT * from all_data where course_name LIKE '%term%' OR course_code LIKE '%term%' OR course_number like '%term%' OR course_digit LIKE '%term%'")) {
		$coursename = htmlentities(stripslashes($row['course_name']));
		$coursedigit = htmlentities(stripslashes($row['course_digit']));
		$code = htmlentities(stripslashes($row['course_code']));
		$a_json_row["id"] = $code;
		$a_json_row["value"] = $coursename.' '.$coursedigit;
		$a_json_row["label"] = $coursename.' '.$coursedigit;
		array_push($a_json, $a_json_row);
	}

// jQuery wants JSON data
echo json_encode($a_json);
flush();
 
$mysqli->close();
?>