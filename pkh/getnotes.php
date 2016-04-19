<?php
$servername = "localhost";
$username = "ali";
$password = "Ali440134";
$dbname = "pkh";

$ip = $_SERVER['REMOTE_ADDR'];
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "SELECT note FROM notes WHERE ip = '$ip'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    // output data of each row
    while($row = $result->fetch_assoc()) {
      echo $row['note'];
    }
} else {
    echo "";
}
$conn->close();
?>