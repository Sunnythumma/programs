<?php
	//echo $_GET['id'];
	$conn = mysqli_connect("localhost","root","","demo") or die("DataBase NOT CONNECTED");
	$qry="DELETE from stud where id=".$_GET['id'];
	$run = mysqli_query($conn,$qry);
	if($run == true)
		header("location:display.php");
		//echo "<script> alert('insertion SUCESSS');</script>";
	else
		echo "<script>alert('DELETION FAIL');</script>";
			
?>
