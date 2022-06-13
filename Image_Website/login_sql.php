<?php
	session_start();	//step1

	$conn = mysqli_connect("localhost","root","","demo") or die("DB not Connected");
	$_SESSION['username'] = $_POST['name'];
	$_SESSION['password'] = $_POST['password'];
	$qry = "select * from stud where name='".$_POST['name']."' and password=".$_POST['password'];
	//echo $qry;	
	//echo $qry;
	$result = mysqli_query($conn,$qry);
	if(mysqli_num_rows($result)>0)
	{
		$row =  mysqli_fetch_assoc($result);
		
		echo "<head>
				<link rel='stylesheet' href='style.css' />
			</head>
			<a href='display.php'>DISPLAY</a>
			<a href='add.php'>register</a>
			<a href='logout.php'>Logout</a>";
	
		
		echo "<ul><li>ID : ".$row['id'];
		echo "<li>NAME : ".$row['name'];
		echo "<li>PASSWORD : ".$row['password'];
		echo "<li>IMAGE : <img src='images/".$row['pic']."' width='100px'/>";
	}
	else
	{
		echo "<script type='text/javascript'> alert('No records of ".$_POST['name']."');</script>";
		header("refresh:0,url=login.php");
	}
?>