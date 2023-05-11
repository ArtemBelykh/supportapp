<?php
// Initialize the session
session_start();
 
// Check if the user is already logged in, if yes then redirect him to welcome page
if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){
    header("location: welcome.php");
    exit;
}
 
// Include config file - $link or $sql originates there
//  require_once "config.php";
require(dirname(__FILE__).'/../config/config.php');
 
// Define variables and initialize with empty values
$username = $password = "";
$username_err = $password_err = "";
 
// Processing form data when form is submitted
if($_SERVER["REQUEST_METHOD"] == "POST"){
    
    // Check if username is empty
    if(empty(trim($_POST["username"]))){
        $username_err = "Please enter username.";
    } else{
        $username = trim($_POST["username"]);
    }
    
    // Check if password is empty
    if(empty(trim($_POST["password"]))){
        $password_err = "Please enter your password.";
    } else{
        $password = trim($_POST["password"]);
    }

    // Validate credentials
    if(empty($username_err) && empty($password_err)){

        // Prepare a select statement
        $sql = "SELECT id, login, psswd FROM v_doctors_www_01 WHERE login = ?";
        //$sql.= " AND isAdmin=1; ";
        if($stmt = mysqli_prepare($link, $sql)){
            // Bind variables to the prepared statement as parameters
            mysqli_stmt_bind_param($stmt, "s", $param_username);
            
            // Set parameters
            $param_username = $username;
            
            // Attempt to execute the prepared statement
            if(mysqli_stmt_execute($stmt)){
                // Store result
                mysqli_stmt_store_result($stmt);
                
                // Check if username exists, if yes then verify password
                if(mysqli_stmt_num_rows($stmt) == 1){                    
                    // Bind result variables
                    mysqli_stmt_bind_result($stmt, $id, $username, $hashed_password);
                    if(mysqli_stmt_fetch($stmt)){
                        //if(password_verify($password, $hashed_password)){
                            // Password is correct, so start a new session
                            session_start();
                            
                            // Store data in session variables
                            $_SESSION["loggedin"] = true;
                            $_SESSION["id"] = $id;
                            $_SESSION["username"] = $username;                            
                            
                            // Redirect user to welcome page
                            header("location: welcome.php");
                        //} else{
                        //    // Display an error message if password is not valid
                        //    $password_err = "The password you entered was not valid.";
                        //}
                    }
                } else{
                    // Display an error message if username doesn't exist
                    $username_err = "The account you entered was not valid.";
                }
            } else{
                echo "Oops! Something went wrong. Please try again later.";
            }
        }
        
        // Close statement
        mysqli_stmt_close($stmt);
    }
    
    // Close connection
    mysqli_close($link);
}
?>
 
 <!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <link rel="stylesheet" type="text/css" href="./assets/css/styles.css">
  <link rel="shortcut icon" href="./assets/img/favicon.png">
  <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <script type="text/javascript" src="./assets/js/login.js"></script>
  <title>ESA Verification</title>
</head>

<body>
  <div class="sign-in">
    <div class="heading">
      <p class="heading-label">ESA Verification Portal</p>
      <img id="esa-logo" class="logos" src="./assets/img/ESA_logo.PNG" alt="ESA logo" />
    </div>
    <div class="form-block">
      <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" enctype="application/x-www-form-urlencoded" name="login-form" method="post" class="sign-in-form">
         <!-- Username -->
        <div class="text-fields <?php echo (!empty($username_err)) ? 'has-error' : ''; ?>">
          <label class="login-labels" for="username">Handler's Last Name</label>
          <div class="input-area">
            <input id="username" class="sign-in-form-inputs" type="text" name="username" minlength="3" data-pristine="true" value="<?php echo $username; ?>" required>
            <span class="warning-icons">
              <i class="material-icons">error</i>
            </span>
            <span class="help-block error-message"><?php echo $username_err; ?>You need type at least 3 symbols</span>
          </div>
        </div>
        <!-- Password -->
        <div class="text-fields <?php echo (!empty($password_err)) ? 'has-error' : ''; ?>">
          <label class="login-labels" for="password">ESA Verification</label>
          <div class="input-area">
            <input id="password" class="sign-in-form-inputs" type="password" name="password" minlength="3" data-pristine="true" required>
            <span class="warning-icons">
              <i class="material-icons">error</i>
            </span>
            <span class="help-block error-message"><?php echo $password_err; ?>You need type at least 3 symbols</span>
          </div>
        </div>
        <input id="verify" type="submit" value="Submit To Verify">
        <div id="validate-message" hidden>Should be at least 3 symbols</div>
      </form>
    </div>
    <footer>
      <div>
        <img id="federal-laws-logos" class="logos" src="./assets/img/Federal_Laws_logos.PNG" alr="Federal Laws logos" />
      </div>
      <span class="rights-text">© 2019 ESA Verification</span>
    </footer>
  </div>
</body>

</html>
