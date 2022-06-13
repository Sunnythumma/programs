<head>
	<link rel="stylesheet" href="style.css" />
</head>

<body>
	<center>
	<h1>LogIn</h1>
	<a href="display.php">DISPLAY</a>
	<a href="add.php">register</a>
	<form method="post" action="login_sql.php">
		<input type="text" name="name" placeholder="User Name" />
		<br />
		<input type="password" name="password" id="myInput" placeholder="Password"/>
		<br />
		<input type="checkbox" onclick="showPassword()" />Show Password
		<br />
		<input type="Submit" name="submit">
	</form>
	</center>
	
	<script>
	$x = document.getElementById["myInput"];
	function showPassword()
	{
		if($x.type =="password")
			x.type="text";
		else
			x.type="password";
	}
</script>
</body>
