<?php
$servername = "localhost";
$username = "ali";
$password = "Ali440134";
$dbname = "pkh";

$notes = urldecode($_GET['q']);
$ip = $_SERVER['REMOTE_ADDR'];
// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
} 

$sql = "INSERT INTO notes (ip, note)
VALUES ('$ip', '$notes') ON DUPLICATE KEY UPDATE ip = '$ip', note = '$notes'";

if ($conn->query($sql) === TRUE) {
    echo "New record created successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}
$conn->close();
?>
