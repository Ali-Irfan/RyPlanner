<?php
$servername = "localhost";
$username = "ali";
$password = "Ali440134";
$dbname = "ryerson";
ini_set('max_execution_time', 300); //300 seconds = 5 minutes
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 



$timingData = file_get_contents("timingSet2.json");
$timingData = json_decode($timingData, true);

for ($i=0; $i<sizeof($timingData["pages"]); $i++){
echo $i;
$lengthOfResults = sizeof($timingData["pages"][$i]["results"]);


	for ($y=0; $y<$lengthOfResults; $y++){
		 $ogString = $timingData["pages"][$i]["results"][$y]["course_name/_alt"];
		 $betterString = str_replace("Collapse section ", "", $ogString);
		 echo "<br><br><Br><Br><br> ADDING ".$betterString."<br><br><br>";



		 //GET COURSE CODE AND NUMBER
		 $courseCode = substr($betterString, 0, 3);
		 $courseCodeNum = substr($betterString, 4, 6);
		 $courseName = substr($betterString, strpos($betterString, "-") + 1);
		 //END OF COURSE CODE AND NUMBER




		 //GET CLASS AND SECTION INFO
		 $classnumVariable = null;
		 $sectionnumVariable = null;
		 $classNumbers = [];
		 $sectionNumbers = [];

		 if (!is_array($timingData["pages"][$i]["results"][$y]["class_number/_text"])){
			array_push($classNumbers, $timingData["pages"][$i]["results"][$y]["class_number/_text"]);
			array_push($sectionNumbers, $timingData["pages"][$i]["results"][$y]["section_number/_text"]);
		} else {
		 if (isset($timingData["pages"][$i]["results"][$y]["class_number/_text"])){
		 	 $multiple = true;
			 $classnumVariable = $timingData["pages"][$i]["results"][$y]["class_number/_text"];
			 $sectionnumVariable = $timingData["pages"][$i]["results"][$y]["section_number/_text"];
		 }
		 
		 
		 if ($multiple){
			for ($x=0; $x < sizeof($classnumVariable); $x++){
				array_push($classNumbers, $classnumVariable[$x]);
			}
			for ($x=0; $x < sizeof($sectionnumVariable); $x++){
				array_push($sectionNumbers, $sectionnumVariable[$x]);
			}
		}
	}


		//ENDING OF GETTING CLASS AND SECTION INO





		//GET INSTRUCTOR INFO
		$instructorVariable = $timingData["pages"][$i]["results"][$y]["instructor"];
		$instructorList = [];
		if (is_array($instructorVariable)){
		for ($x=0; $x < sizeof($instructorVariable); $x++){
				array_push($instructorList, $instructorVariable[$x]);
			}
		} else {
			array_push($instructorList, $instructorVariable);
		}
		//END OF GETTING INSTRUCTOR INFO



		//GET TIMING INFO(CORRESPONDING TO THE INTRUCTOR DATA)
		$timeVariable = $timingData["pages"][$i]["results"][$y]["days_times"];
		$timeList = [];
		if (is_array($timeVariable)){
		for ($x=0; $x < sizeof($timeVariable); $x++){
				array_push($timeList, $timeVariable[$x]);
			}	
		} else {
			array_push($timeList, $timeVariable);
		}
		//END OF GETTING TIMING INFO




		//GET ROOM INFORMATION(CORRESPONDING TO INSTRUCTOR DATA)
		$roomVariable = $timingData["pages"][$i]["results"][$y]["room"];
		$roomList = [];
		if (is_array($timingData["pages"][$i]["results"][$y]["room"])){
		for ($x=0; $x < sizeof($roomVariable); $x++){
				array_push($roomList, $roomVariable[$x]);
			}	
		} else {
			array_push($roomList, $timingData["pages"][$i]["results"][$y]["room"]);
		}
		//END OF GETTING ROOM INFORMATION


			$classNumbers = base64_encode(serialize($classNumbers));
			echo $classNumbers;
			$instructorList = base64_encode(serialize($instructorList));
			$sectionNumbers = base64_encode(serialize($sectionNumbers));
			$timeList = base64_encode(serialize($timeList));
			$roomList = base64_encode(serialize($roomList));

			$classNumbers = mysql_real_escape_string($classNumbers);
			$instructorList = mysql_real_escape_string($instructorList);
			$sectionNumbers = mysql_real_escape_string($sectionNumbers);
			$timeList = mysql_real_escape_string($timeList);
			$roomList = mysql_real_escape_string($roomList);




		//INSERT VARIABLES INTO DATABASE
		$sql = "UPDATE all_data (class_number, instructor, course_name, section_number, timings, room, course_code, course_number)
		VALUES ('$classNumbers', '$instructorList', '$courseName', '$sectionNumbers', '$timeList', '$roomList', '$courseCode', '$courseCodeNum')";




		if ($conn->multi_query($sql) === TRUE) {
		    echo "New records created successfully<br>";
		} else {
		    echo "Error: " . $sql . "<br>" . $conn->error;
		}
		//ENDING OF INSERTING VARIABLES




	}//BIG FOR

}




echo "Connected successfully";
$conn->close();
?>