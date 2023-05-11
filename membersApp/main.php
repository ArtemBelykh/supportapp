<?php
// Initialize the session
session_start();

// Check if the user is already logged in, if yes then redirect him to welcome page
//if(isset($_SESSION["loggedin"]) && $_SESSION["loggedin"] === true){
//    header("location: logout.php");
//    exit;
//}

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
        //$sql = "SELECT id, login, psswd FROM v_employees_www WHERE login = ?;";
        $sql = "CALL sp_get_employee_by_login( ? );";
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
                            header("location: dashboard.php");
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
      <link rel="stylesheet" type="text/css" href="./css/styles.css">
      <link rel="stylesheet" type="text/css" href="./css/main.css">
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
      <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css">
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
      <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
      <script src="js/min-jquery.js"></script>
      <script src="js/main.js"></script>
      <div id="fb-root"></div>
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
                        <h5 class="right-top__heading">login</h5>
                        <p class="right-top__pre">
                            To view your ESA documents, change personal information,
                            request custom forms and more.
                       </p>
            </div>
                      <div class="form-block">
                        <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" enctype="application/x-www-form-urlencoded" name="login-form" method="post" class="login-form">
                           <!-- Username -->
                          <div class="text-fields <?php echo (!empty($username_err)) ? 'has-error' : ''; ?>">
                            <label class="login-labels" for="username">Login</label>
                            <div class="input-area">
                              <svg xmlns="http://www.w3.org/2000/svg" height="28" viewBox="0 0 28 28" width="28"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                              <input id="username" class="sign-in-form-inputs row login-form__row" type="text" name="username" minlength="3" data-pristine="true" value="<?php echo $username; ?>" required>
                              <span class="warning-icons">
                                <i class="material-icons">error</i>
                              </span>
                              <span class="help-block error-message"><?php echo $username_err; ?>You need type at least 3 symbols</span>
                            </div>
                          </div>
                          <!-- Password -->
                          <div class="text-fields <?php echo (!empty($password_err)) ? 'has-error' : ''; ?>">
                            <label class="login-labels" for="password">Password</label>
                            <div class="input-area">
                              <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12.65 10C11.83 7.67 9.61 6 7 6c-3.31 0-6 2.69-6 6s2.69 6 6 6c2.61 0 4.83-1.67 5.65-4H17v4h4v-4h2v-4H12.65zM7 14c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg>
                              <input id="password" class="sign-in-form-inputs row login-form__row" type="password" name="password" minlength="3" data-pristine="true" required>
                              <span class="warning-icons">
                                <i class="material-icons">error</i>
                              </span>
                              <span class="help-block error-message"><?php echo $password_err; ?>You need type at least 3 symbols</span>
                            </div>
                          </div>

                          <br>
                          <button type="submit" class="btn btn-info" style="width: 100%;">Log In</button>
                          <div id="validate-message" hidden>Should be at least 3 symbols</div>


                          <div class="login-form__socials">
                            <div class="border-or"><span>OR</span></div>
                                <a href="#" class="social-psw">Forgot password ?</a>
                          </div>

                          <fb:login-button
                            scope="public_profile,email"
                            onlogin="checkLoginState();">
                          </fb:login-button>
                   </form>
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
                © 2021 - Support Pets - All rights reserved
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

<script>
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '826604471378221',
      cookie     : true,
      xfbml      : true,
      version    : 'v11.0'
    });

    FB.AppEvents.logPageView();

  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/ru_RU/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
</script>
<div id="fb-root"></div>
<script async src="//connect.facebook.net/ru_RU/sdk.js"></script>
          </body>
</html>