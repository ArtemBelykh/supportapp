<?php
 
// Define variables and initialize with empty values
$username = $password =  $param_password = $confirm_password = "";
$username_err = $password_err = $confirm_password_err = "";
$id=$param_id=0;
 
// Processing form data when form is submitted
if( $_SERVER["REQUEST_METHOD"] == "POST" ){ 
    
  // Validate username
  if( empty( trim( $_POST["username"] ))){
      $username_err = "Please enter a username.";    
  } else {
      $username = $param_username = trim($_POST["username"]);    
  }

  // Validate password
  if( empty( trim($_POST["password"]) )){
      $password_err = "Please enter a password.";     
  } elseif ( strlen( trim($_POST["password"])) < 6 ){
      $password_err = "Password must have atleast 6 characters.";
  } else {
      $password = trim( $_POST["password"] );
  }

  // Validate confirm password
  if( empty( trim($_POST["confirm_password"]) )){
      $confirm_password_err = "Please confirm password.";     
  } else {
      $confirm_password = trim( $_POST["confirm_password"] );
      if ( empty( $password_err ) && ( $password != $confirm_password) ){
          $confirm_password_err = "Password did not match.";
      }
  }
      
  // Check input errors before working with database
  if ( empty( $username_err ) && empty( $password_err ) && empty( $confirm_password_err )) {

    // Include config file
    require(dirname(__FILE__).'/../config/config.php');

    // Prepare a select statement
    $sql = "SELECT id, login FROM v_doctors_www_01 WHERE login = ?";

    if( $stmt = mysqli_prepare( $link, $sql ) ){ 

      // Bind variables to the prepared statement as parameters
      mysqli_stmt_bind_param( $stmt, "s", $param_username );

      // Attempt to execute the prepared statement
      if( mysqli_stmt_execute( $stmt ) ){      

        // Store result
        mysqli_stmt_store_result( $stmt );

        // Check if username exists, if yes then verify password
        if( mysqli_stmt_num_rows( $stmt ) == 1 ){ 

          // Bind result variables
          mysqli_stmt_bind_result( $stmt, $id, $username );  //, $hashed_password

          if( mysqli_stmt_fetch( $stmt )){
            // Prepare statement
            //$sql = "INSERT INTO doctors (username, password) VALUES (?, ?)";
            $sql = "CALL sp_update_doc_psswd_01( ?, ? );";
                
            if( $stmt = mysqli_prepare($link, $sql) ){ 

              // Bind variables to the prepared statement as parameters
              mysqli_stmt_bind_param($stmt, "ss", $param_id, $param_password);

              // Set parameters
              $param_id = $id;
              $param_password = password_hash( $password, PASSWORD_DEFAULT); // Creates a password hash

              // Attempt to execute the prepared statement
              if( mysqli_stmt_execute( $stmt )){

                // Redirect to login page
                header("location: login.php");

              } else { echo "mysqli_stmt_execute of sp went wrong."; }     

            } else { echo "Oops! mysqli_prepare for sp went wrong."; }

          } else { echo "Oops! mysqli_stmt_fetch for sp went wrong."; }

        } else { echo "Oops! mysqli_stmt_num_rows != 1 "; }    

      } else { echo "Oops! mysqli_stmt_execute went wrong."; }    

    } else { echo "Oops! mysqli_prepare went wrong."; }

    // Close statement
    mysqli_stmt_close($stmt);    
    // Close connection
    mysqli_close($link);
  }
}
?>
 
<!DOCTYPE html>
<html lang="en">
<head>    
    <title>Sign Up</title>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
    <!-- Optional theme -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    
    <style type="text/css">
        
        body {
        font-family: Arial, Helvetica, sans-serif;
        }
        .mobile-container {
        max-width: 480px;
        margin: auto;
        background-color: #555;
        height: auto;
        color: white;
        border-radius: 10px;
        }
        .topnav {
        overflow: hidden;
        background-color: #333;
        position: relative;
        }
        .topnav #myLinks {
        display: none;
        }
        .topnav a {
        color: white;
        padding: 14px 16px;
        text-decoration: none;
        font-size: 17px;
        display: block;
        }
        .topnav a.icon {
        background: black;
        display: block;
        position: absolute;
        right: 0;
        top: 0;
        }
        .topnav a:hover {
        background-color: #ddd;
        color: black;
        }
        .active {
        background-color: #0066ff;
        color: grey;
        }
        .wrapper{ 
            width: 350px; 
            padding: 20px; 
        }
    </style>
</head>
<body>

<!-- Simulate a smartphone / tablet -->
<div class="mobile-container">

    <!-- Top Navigation Menu -->
    <div class="topnav">
    <a href="#home" class="active">ESA DocApp</a>
    <div id="myLinks">
        <!--a href="login.php">Login</a-->
        <!--a href="#contact">Messages</a-->
        <a href="logout.php">LogOut</a>
    </div>
    <a href="javascript:void(0);" class="icon" onclick="menuClick()">
        <i class="fa fa-bars"></i>
    </a>
    </div>
    
    <!-- Main Body -->

    <div class="wrapper">
        <h2>Update</h2>
        <!--p>Please fill this form to create an account.</p-->
        <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
            <div class="form-group <?php echo (!empty($username_err)) ? 'has-error' : ''; ?>">
                <label>Username</label>
                <input type="text" name="username" class="form-control" value="<?php echo $username; ?>">
                <span class="help-block"><?php echo $username_err; ?></span>
            </div>    
            <div class="form-group <?php echo (!empty($password_err)) ? 'has-error' : ''; ?>">
                <label>Password</label>
                <input type="password" name="password" class="form-control" value="<?php echo $password; ?>">
                <span class="help-block"><?php echo $password_err; ?></span>
            </div>
            <div class="form-group <?php echo (!empty($confirm_password_err)) ? 'has-error' : ''; ?>">
                <label>Confirm Password</label>
                <input type="password" name="confirm_password" class="form-control" value="<?php echo $confirm_password; ?>">
                <span class="help-block"><?php echo $confirm_password_err; ?></span>
            </div>
            <div class="form-group">
                <input type="submit" class="btn btn-primary" value="Submit">
                <!--input type="reset" class="btn btn-default" value="Reset"-->
            </div>
            <!--p>Already have an account? <a href="login.php">Login here</a>.</p-->
        </form>
    </div>    

<!-- End smartphone / tablet look -->
</div>

<script>

function menuClick() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
        x.style.display = "none";
    } else {
        x.style.display = "block";
    }
}

</script>


</body>
</html>