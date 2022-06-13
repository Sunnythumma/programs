<?php	
	$name = $_POST['name'];
	$pwd = $_POST['password'];
	$img = $_FILES['fileToUpload']['name'];
	//echo $name;
	//echo $img;
	
	$target_dir = "images/";
	$target_file = $target_dir.basename($_FILES["fileToUpload"]["name"]);
	$uploadOk = 1;
	$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
// Check if image file is a actual image or fake image
	if(isset($_POST["submit"])) 
	{
		$check = getimagesize($_FILES["fileToUpload"]["tmp_name"]);
		if($check !== false) 
		{
			echo "File is an image - " . $check["mime"] . ".";
			$uploadOk = 1;
		} 
		else 
		{
			echo "File is not an image.";
			$uploadOk = 0;
		}
	}
	
	// Check if $uploadOk is set to 0 by an error
	if ($uploadOk == 0) 
	{
		echo "Sorry, your file was not uploaded.";
		// if everything is ok, try to upload file
	}
	else 
	{
		if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) 
		{
			echo "The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded.";
		}
		else 
		{
			echo "Sorry, there was an error uploading your file.";
		}
	}
	
	

	$conn = mysqli_connect("localhost","root","","demo") or die("DataBase NOT CONNECTED");
	$qry="INSERT INTO `stud`(`name`,`password`, `pic`) VALUES ('$name','$pwd','$img')";
	$run = mysqli_query($conn,$qry);
	if($run == true)
		header("location:display.php");
		//echo "<script> alert('insertion SUCESSS');</script>";
	else
		echo "<script>alert('insertion FAIL');</script>";
			
?>
