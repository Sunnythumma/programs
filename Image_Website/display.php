
<head>
	<link rel="stylesheet" href="style.css" />
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
	<style>
		* {    box-sizing: border-box; 	}
		form input[type=text] 
		{
			padding: 10px;
			font-size: 13px;
			border: 1px solid grey;
			float: left;
			width: 20%;
			background: #f1f1f1;
			}
		form button 
		{
			float: left;
			width: 5%;
			padding: 10px;
			background: #2196F3;
			color: white;
			font-size: 15px;
			border: 1px solid grey;
			border-left: none;
			cursor: pointer;
		}

		form button:hover 
		{
			background: #0b7dda;
		}

		form::after 
		{
			content: "";
			clear: both;
			display: table;
		}


	</style>
</head>


<h1>Display Data</h1>
<a href="add.php"> ADD DATA </a>
&nbsp; &nbsp;
<a href="login.php"> LOG IN </a>
&nbsp; &nbsp;
<form method="post">
	<input type="text" placeholder="search.." />
	<button type="submit"><i class="fa fa-search"></i></button>
</form>
<table border=1>
	<tr>
		<th> ID </th>
		<th> NAME </th>
		<th> PASSWORD </th>
		<th> IMAGE </th>
		<th colspan=2> ACTION </th>
	</tr>
<?php
	$conn = mysqli_connect("localhost","root","","demo");
	$qry = "select * from stud";
	$result = mysqli_query($conn, $qry);
	if(mysqli_num_rows($result)>0)
	{
		while($row = mysqli_fetch_assoc($result))
		{
			echo "<tr><td>".$row['id']."</td>";
			echo "<td>".$row['name']."</td>";
			echo "<td>".$row['password']."</td>";
			if($row['pic']=="")
				$row['pic']="noimg.png";
			echo "<td><img src='images/".$row['pic']."' width='50px'></td>";
			
			echo "<td> <a href='before_update.php?id=".$row['id']."'>UPDATE </a></td>";
			echo "<td> <a href='delete.php?id=".$row['id']."'>DELETE  </a></td></tr>";
		}
	}
	else
		echo "No records found";
?>
</table>
<style>
	td{
		width:10%;
		text-align:center;
	}
</style>