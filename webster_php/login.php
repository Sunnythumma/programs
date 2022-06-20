<?php session_start(); ?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
<title>Bootstrap Simple Login Form</title>

<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css">
  <script src="https://cdn.jsdelivr.net/npm/jquery@3.6.0/dist/jquery.slim.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.bundle.min.js"></script>
<style>
.login-form {
    width: 340px;
    margin: 50px auto;
  	font-size: 15px;
}
.login-form form {
    margin-bottom: 15px;
    background: #f7f7f7;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    padding: 30px;
}
.login-form h2 {
    margin: 0 0 15px;
}
.form-control, .btn {
    min-height: 38px;
    border-radius: 2px;
}
.btn {        
    font-size: 15px;
    font-weight: bold;
}
</style>
</head>
<body>
<div class="login-form">
    <form action="" method="post">
        <h2 class="text-center">Log in</h2>       
        <div class="form-group">
            <input type="text" class="form-control" name="email" placeholder="Username" required="required">
        </div>
        <div class="form-group">
            <input type="password" class="form-control" name="password" placeholder="Password" required="required">
        </div>
        <div class="form-group">
            <input type="submit" class="btn btn-primary btn-block" value="Login" name="login-btn">
        </div>
             
    </form>
    <?php 
	$conn = mysqli_connect('localhost','root','','webster');
	
	if(isset($_POST['login-btn'])){
		$email = $_POST['email'];
		$password = $_POST['password'];
		
		$select = "SELECT * FROM user WHERE user_email='$email'";
	$run = mysqli_query($conn,$select);
	$row_user = mysqli_fetch_array($run);
		
		$db_email = $row_user['user_email'];
		$db_password = $row_user['user_password'];
		if($email == $db_email && $password == $db_password){
			echo "<script>window.open('index.php','_self')</script>";
			$_SESSION['email'] = $db_email;
		}
		else{
			echo "not ok";
		}
	}
	?>
	
</div>
</body>
</html>