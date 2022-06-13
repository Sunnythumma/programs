<head>
	<link rel="stylesheet" href="style.css" />
</head>


<h1>Add Data</h1>
 <a href="display.php"> DISPLAY </a>
 &nbsp; &nbsp; 
 <a href="login.php"> login </a>

<form action="insert.php" method="post" enctype="multipart/form-data">
	<br />
	<input type="text" name="name" placeholder="Name" required/> 
	<br />
	<input type="password" name="password" id="myInput" placeholder="Password" required/> 
	<br />
	<input type="checkbox" onclick="myFunction()">Show Password
	<br />
	<input type="file" name="fileToUpload" required/>
	<br />
	<input type="submit" name="btnSubmit" />
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

