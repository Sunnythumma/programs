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
  
  <script>
  function ck()
  {
	  var s =true;
	  document.getElementById("s1").innerHTML = "";
	  document.getElementById("s2").innerHTML = "";
	  document.getElementById("s3").innerHTML = "";
	  document.getElementById("s4").innerHTML = "";
	  document.getElementById("s5").innerHTML = "";
	  document.getElementById("cpass").innerHTML = "";
	  
	  
	  var n = document.f1.emp_name.value;
	  var n1 =  /^[A-Za-z ]+$/;
	  
	  if(n==0){
		  document.getElementById("s1").innerHTML = "Enter Name";
		  s = false;
	  }
	  else if(!n1.test(n)){
		  document.getElementById("s1").innerHTML = "Enter Character Only";
		  s = false;
	  }
	  
	  var em = document.f1.emp_email.value;
	  var em1 = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	  
	  if(em==0){
		  document.getElementById("s2").innerHTML = "Enter Email";
		  s = false;
	  }
	  else if(!em1.test(em)){
		  document.getElementById("s2").innerHTML = "Enter Correct Email Only";
		  s = false;
	  }
	  
	  var pa = document.f1.emp_password.value;
	  var pa1 = /^[A-Za-z0-9@#$ ]+$/;
	  
	  if(pa==0){
		  document.getElementById("s3").innerHTML = "Enter Password";
		  s = false;
	  }
	  else if(!pa1.test(pa)){
		  document.getElementById("s3").innerHTML = "Enter Correct Password Only";
		  s = false;
	  
	  }
	  
	  var cpa = document.f1.cfm_password.value;
	  
	  
	  if(pa==0){
		  document.getElementById("cpass").innerHTML = "Enter CPassword";
		  s = false;
	  }
	  if(pa != cpa){
		  document.getElementById("cpass").innerHTML = "Password Do not match";
		  s= false;
	  }
	  
	  
	  var sa = document.f1.emp_salary.value;
	  var sa1 =  /^[0-9]+$/;
	  
	  if(sa==0){
		  document.getElementById("s4").innerHTML = "Enter Salary";
		  s = false;
	  }
	  else if(!sa1.test(sa)){
		  document.getElementById("s4").innerHTML = "Enter Numbers Only";
		  s = false;
	  }
	  
	  return s;
  }
  </script>
</head>
<body>

<div class="container">
  <h2>Add New Employee</h2>
  <a href="view_emp.php">View</a>
  <form method="post" name="f1" enctype="multipart/form-data" onSubmit="return ck()">
  <div class="form-group">
      <label>Name:</label>
      <input type="text" class="form-control" id="emp_name" placeholder="Enter name" name="emp_name">
	  <span id="s1" style="color:red;">
    </div>
    <div class="form-group">
      <label>Email:</label>
      <input type="email" class="form-control" id="emp_email" placeholder="Enter email" name="emp_email">
	  <span id="s2" style="color:red;">
    </div>
    <div class="form-group">
      <label>Password:</label>
      <input type="password" class="form-control" id="emp_password" placeholder="Enter password" name="emp_password">
	  <span id="s3" style="color:red;">
    </div>
	<div class="form-group">
      <label>Confirm Password:</label>
      <input type="password" class="form-control" id="cfm_password" placeholder="Enter confirm password" >
	  <span id="cpass" style="color:red;">
    </div>
	<div class="form-group">
      <label>Salary:</label>
      <input type="text" class="form-control" id="emp_salary" placeholder="Enter salary" name="emp_salary">
	  <span id="s4" style="color:red;">
    </div>
	<div class="form-group">
      <label>Image:</label>
      <input type="file" class="form-control" id="emp_image" name="emp_image">
	  <span id="s5" style="color:red;">
    </div>
	<button type="submit" id="insert-btn" class="btn btn-primary" name="insert-btn">Submit</button>
  </form>
  <?php
  
  $conn = mysqli_connect('localhost','root','','webster');
  // if(mysqli_connect_error()){
	  // echo "Error";
  // }
  // else{
	  // echo "OK";
  // }
  
  if(isset($_POST['insert-btn'])){
	  $name = $_POST['emp_name'];
	  $email = $_POST['emp_email'];
	  $password = $_POST['emp_password'];
	  $salary = $_POST['emp_salary'];
	  $image = $_FILES['emp_image']['name'];
	  $tmp_image = $_FILES['emp_image']['tmp_name'];
	  
	  $insert = "insert into employee(emp_name,emp_email,emp_password,emp_salary,emp_image) 
	  values('$name','$email','$password','$salary','$image')";
	  
	  $run_insert = mysqli_query($conn,$insert);
	  if($run_insert === true){
		  // echo "inserted";
		  move_uploaded_file($tmp_image,"images/$image");
	  }
	  else{
		  // echo "not inserted";
	  }
	  
  }
  
  
  
  ?>
</div>
</body>
</html>
