<?php
$servername = "localhost";
$username = "ali";
$password = "Ali440134";
$dbname = "ryerson_data1";
ini_set('max_execution_time', 300); //300 seconds = 5 minutes
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 


		$data = file_get_contents("dataset.json");
		$data = json_decode($data, true);

		for ($i=0; $i<sizeof($data["pages"]); $i++){

		$lengthOfResults = sizeof($data["pages"][$i]["results"]);

			for ($y=0; $y<$lengthOfResults; $y++){
				 $code = $data["pages"][$i]["results"][$y]["coursecode_value"];
				 echo $code;
				 $num = $data["pages"][$i]["results"][$y]["coursecode_number/_source"];
				 $description = $data["pages"][$i]["results"][$y]["coursedesc_content"];
				 $requisite = $data["pages"][$i]["results"][$y]["courseprereq_content"];
				 $weight = $data["pages"][$i]["results"][$y]["courseprereq_flag_2"];
				 $weeklyHours = $data["pages"][$i]["results"][$y]["courseprereq_flag_1"];

				 $weight = substr($weight, 14, 17);
				 $description = mysql_real_escape_string($description);
				 if (strpos($weeklyHours,'3') !== false) {
					    $weeklyHours = "3";
				 }

				 $forNewDB = $num." -";
			$sql = "UPDATE all_data 
				    SET description = '$description', requisite = '$requisite', weight = '$weight', weeklyHours = '$weeklyHours' 
				    WHERE course_number LIKE '%$num%' AND course_code = '$code'";


		if ($conn->multi_query($sql) === TRUE) {
		    echo "New records created successfully";
		} else {
		    echo "Error: " . $sql . "<br>" . $conn->error;
		}
		//ENDING OF INSERTING VARIABLES




	}//BIG FOR

}




echo "Connected successfully";
$conn->close();
?>