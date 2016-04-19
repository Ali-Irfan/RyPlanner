<?php

// We will use PDO to execute database stuff. 
// This will return the connection to the database and set the parameter
// to tell PDO to raise errors when something bad happens
function getDbConnection() {
  $db = new PDO(DB_DRIVER . ":dbname=" . DB_DATABASE . ";host=" . DB_SERVER , DB_USER, DB_PASSWORD);
  $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); 
  return $db;
}


// This is the 'search' function that will return all possible rows starting with the keyword sent by the user
function searchForKeyword($key) {
    $db = getDbConnection();
    $stmt = $db->prepare("SELECT * from all_data where course_name LIKE '%{$key}%' OR course_digit LIKE '%{$key}%' OR FROM_BASE64(class_number) LIKE '%{$key}%'");

    $keyword = $key . '%';
    $stmt->bindParam(1, $keyword, PDO::PARAM_STR, 100);

    $isQueryOk = $stmt->execute();
  
    $results = array();
    $arr = array();
    if ($isQueryOk) {
      $results = $stmt->fetchAll();
      foreach($results as $row){
      	array_push($arr, array('course_name' => $row['course_name'], 
      						   'course_code' => $row['course_digit'],
      						   'course_description' => $row['description'],
      						   'course_instructors' => unserialize(base64_decode($row['instructor'])),
      						   'course_rooms' => unserialize(base64_decode($row['room'])),
      						   'course_timings' => unserialize(base64_decode($row['timings'])),
      						   'class_numbers' => unserialize(base64_decode($row['class_number'])),
      						   'course_requisite' => $row['requisite'],
      						   'course_hours' => $row['weeklyHours']
      						   ));
      	//array_push($arr, $row['course_digit']);
      }
      
    } else {
      trigger_error('Error executing statement.', E_USER_ERROR);
    }

    $db = null; 

    return $arr;
}
?>