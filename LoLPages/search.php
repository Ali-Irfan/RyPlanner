<?php
    $key=$_GET['key'];
    $array = array();
    $con=mysql_connect("localhost","ali","Ali440134");
    $db=mysql_select_db("ryerson_data",$con);
    $query=mysql_query("select * from all_data where course_name LIKE '%{$key}%' OR course_code LIKE '%{$key}%' OR course_number like '%{$key}%' OR course_digit LIKE '%{$key}%'");


    //$array = array();

    while($row=mysql_fetch_assoc($query))
    {
      $array[] = $row['course_name'];
        //array_push($array,array('CourseName'=>$row['course_name'],'courseCode'=>$row['course_code'],'courseNumber'=>$row['course_number']));
    }
    echo json_encode($array);
?>
