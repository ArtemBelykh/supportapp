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
    if(empty(trim($_POST["email"]))){
        $username_err = "Please enter email.";
    } else{
        $username = trim($_POST["email"]);
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
        // $sql.= " AND isAdmin=1; ";
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
                        if(password_verify($password, $hashed_password)){
                            // Password is correct, so start a new session
                            session_start();
                            
                            // Store data in session variables
                            $_SESSION["loggedin"] = true;
                            $_SESSION["id"] = $id;
                            $_SESSION["username"] = $username;                            
                            
                            // Redirect user to welcome page
                            header("location: doctors-list.php");
                        } else{
                            // Display an error message if password is not valid
                            $password_err = "The password you entered was not valid.";
                        }
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
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Support Pets</title>
    <!-- Styles and Fonts -->
    <link
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="./css/materialize.min.css" />
    <link rel="stylesheet" href="./css/main.css" />
  </head>

  <body>
    <div class="container-fluid">
      <header class="login-header">
        <div class="login-header__top-line"></div>
        <div class=" container center-align login-header__logo-container">
          <img
            class="logo"
            src="./img/logo-form.png"
            alt="support pets members area"
          />
        </div>
      </header>
      <!-- LOGIN FORM SECTION -->
      <section class="login-section">
        <div class="container">
          <div class="row">
            <div class="col m6">
              <div class="login-section__left hide-on-small-only">
                <img src="./img/dog_cat-2.png" alt="support pets cat and dog" />
              </div>
            </div>
            <div class="col m6">
              <div class="login-section__right">
                <div class="center-align right-top">
                  <h5 class="right-top__heading">sign in</h5>
                  <p class="right-top__pre">
                    To view your ESA documents, change personal information,
                    request custom forms and more.
                  </p>
                </div>

                <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" enctype="application/x-www-form-urlencoded" name="login-form" method="post" class="login-form">
                  <div class="row login-form__row">
                    <div class="input-field col s12">
                      <input 
                        id="email"
                        name="email"
                        type="email"
                        class="validate"
                        value="<?php echo $username; ?>" 
                        required/>
                      <label for="email">Email</label>
                    </div>
                  </div>                              
                  <div class="row login-form__row">
                    <div class="input-field col s12">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        class="validate"
                        required />
                      <label for="password">Password</label>
                    </div>
                    <div class="input-field col s12">
                      <button
                        class="btn btn-large btn-register waves-effect waves-light"
                        type="submit"
                        name="action"
                      >
                        Sign In
                      </button>
                    </div>
                  </div>
                  <div class="login-form__socials">
                    <div class="border-or"><span>OR</span></div>
                    <a href="#" class="social-fcb">Log in with Facebook</a>
                    <a href="#" class="social-psw">Forgot password ?</a>
                  </div>
                </form>
              </div>
              <div class="center-align signin-block">
                Don't have an account?
                <a class="signin-link" href="./dashboard.html">Sign Up</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- FOOTER -->
      <footer class="footer">
        <div class="container">
          <div class="row row-revert">
            <div class="col s12 m6 center-align">
              <div class="footer__rights">
                © 2019 - Support Pets - All rights reserved
              </div>
            </div>
            <div class="col s12 m6 center-align">
              <div class="footer__links">
                <a href="#" class="link">Terms & Conditions</a>
                <a href="#" class="link">Privacy Policy</a>
                <a href="#" class="link">Contact Us</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>

    <!-- Scripts  -->
    <script src="js/min-jquery.js"></script>
    <script src="js/materialize.min.js"></script>
    <script src="js/main.js"></script>
    <script src="js/pet-data.js"></script>
  </body>
</html>
