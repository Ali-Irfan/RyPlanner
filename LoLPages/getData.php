<?php

$name=$_GET['name'];

$conn = mysqli_connect("localhost","ali","Ali440134","ryerson_data");


// Check connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }


//$name = str_replace("_", " ", $name);
//$name = $conn->real_escape_string($name);
$sql = "SELECT * FROM all_data WHERE TRIM(course_name) LIKE TRIM('$name')";
$result = $conn->query($sql);


$array = array();

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
        $timings = $row['timings'];
        $timings = unserialize($timings);
        //$timings = json_encode($timings);

        $room = $row['room'];
        $room = unserialize($room);
        //$room = json_encode($room;)

        $instructor = $row['instructor'];
        $instructor = unserialize($instructor);
        //$instructor = json_encode($instructor);

        $class_number = $row['class_number'];
        $class_number = unserialize($class_number);
       // $class_number = json_encode($class_number);

        $array = array('course_name' => $row["course_name"], 'course_code' => $row["course_code"], 'course_number' => $row["course_number"], 'description' => $row["description"], 'requisite' => $row["requisite"], 'timings' => $timings, 'room' => $room, 'instructor' => $instructor, 'class_number' => $class_number);
   

    }
} else {
    echo "0 results";
}


echo json_encode($array);

$conn->close();



?>