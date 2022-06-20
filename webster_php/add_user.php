<!DOCTYPE html>
<html lang="en">
<head>
  <title>Bootstrap Example</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css">
  <script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.slim.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.bundle.min.js"></script>
</head>
<body>

<div class="container">
  <h2>Add New User</h2>
  <form method="post" action=""  enctype="multipart/form-data">
  <div class="form-group">
      <label>Name:</label>
      <input type="text" class="form-control" placeholder="Enter name" name="user_name">
    </div>
    <div class="form-group">
      <label>Email:</label>
      <input type="email" class="form-control" placeholder="Enter email" name="user_email">
    </div>
    <div class="form-group">
      <label>Password:</label>
      <input type="password" class="form-control" placeholder="Enter password" name="user_password">
    </div>
	<div class="form-group">
      <label>Image:</label>
      <input type="file" class="form-control" name="user_image">
    </div>
	<div class="form-group">
      <label>Details:</label>
      <textarea class="form-control" name="user_details"></textarea>
    </div>
    
    <button type="submit" class="btn btn-primary" name="insert-btn">Submit</button>
  </form>
  
<?php 
$conn = mysqli_connect('localhost','root','','webster');

/* if(mysqli_connect_errno()){
echo "connection fail";
}
else{
	echo "Connection OK";
	} */
	
	if(isset($_POST['insert-btn'])){
	$user_name = $_POST['user_name'];
	$user_email = $_POST['user_email'];
	$user_password = $_POST['user_password'];	
	$user_details = $_POST['user_details'];
	$image = $_FILES['user_image']['name'];
	$tmp_name = $_FILES['user_image']['tmp_name'];
	
	$insert = "INSERT INTO user(user_name,user_email,user_password,user_image,user_details)
				VALUES('$user_name','$user_email','$user_password','$image','$user_details')";
				
    $run_insert = mysqli_query($conn,$insert);

	if($run_insert === true){
	echo  "Inserted";
	move_uploaded_file($tmp_name,"upload/$image");
	}
	else{
	echo "Not Inserted";
	}
	
	}
?>
</div>


</body>
</html>
