<?php
	include("load.php");
	session_start();
	$_SESSION['username']="";
	$_SESSION['password']="";
	header("refresh:2	,url=login.php");
?>