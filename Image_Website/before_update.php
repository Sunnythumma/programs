<head>
	<link rel="stylesheet" href="style.css" />
</head>


<h1>Update Data</h1>
<a href="display.php"> DISPLAY </a>

<?php
	$conn = mysqli_connect("localhost","root","","demo");
	$qry = "select name,password,pic from stud where id=".$_GET['id'];
	$result = mysqli_query($conn,$qry);
	$row = mysqli_fetch_assoc($result);
	
?>

<form action="update.php?id=<?php echo $_GET['id']; ?>" method="post" enctype="multipart/form-data">
	<br />
	<input type="text" name="name" placeholder="Name" value="<?php echo $row['name']?>"/> 
	<br />
	<input type="password" name="password" id="myInput" placeholder="password" value="<?php echo $row['password']?>"/> 
	<br />
	<input type="checkbox" onclick="myFunction()">Show Password
	<br />
	<img src="images/<?php echo $row['pic']?>" width="100px"/>
	
	<input type="file" name="fileToUpload" required/>
	<br />
	<input type="submit" value="Update" name="btnSubmit" />
</form>

<script>
function myFunction() {
    var x = document.getElementById("myInput");
    if (x.type === "password") {
        x.type = "text";
    } else {
        x.type = "password";
    }
}
</script>

