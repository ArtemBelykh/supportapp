<?php
session_set_cookie_params(0);

// Initialize the session
session_start();

$_SESSION['lastActivity'] = time();

// Check if the user is already logged in, if yes then redirect him to welcome page
if( isset( $_SESSION["loggedin"] ) && $_SESSION["loggedin"] === true ){
    header( "location: app.php" );    
    exit;
}
 
// Include config file
require( dirname(__FILE__).'/../config/config.php' );

// Define variables and initialize with empty values
$username = $password = "";
$username_err = $password_err = "";
 
// Processing form data when form is submitted
if( $_SERVER["REQUEST_METHOD"] == "POST" ){
    
  // Check if username is empty
  if( empty( trim($_POST["username"]) )){
      $username_err = "Please enter username.";
  } else{
      $username = trim( $_POST["username"] );
  }

  // Check if password is empty
  if( empty( trim( $_POST["password"] ))){
      $password_err = "Please enter your password.";
  } else {
      $password = trim( $_POST["password"] );
  }

  // Validate credentials
  if( empty( $username_err ) && empty( $password_err )){

    // Prepare a select statement
    $sql = "SELECT id, login, psswd FROM v_doctors_www_01 WHERE login = ?";
    
    if( $stmt = mysqli_prepare( $link, $sql )){

      // Bind variables to the prepared statement as parameters
      mysqli_stmt_bind_param( $stmt, "s", $param_username );
      
      // Set parameters
      $param_username = $username;      
      
      // Attempt to execute the prepared statement
      if( mysqli_stmt_execute( $stmt )){

        // Store result
        mysqli_stmt_store_result( $stmt );
        
        // Check if username exists, if yes then verify password
        if( mysqli_stmt_num_rows( $stmt ) == 1 ){                                

          // Bind result variables
          mysqli_stmt_bind_result( $stmt, $id, $username, $hashed_password );

          if( mysqli_stmt_fetch( $stmt )){

            if( password_verify( $password, $hashed_password )){
              // Password is correct, so start a new session
              session_start();
              
              // Store data in session variables
              $_SESSION["loggedin"] = true;
              $_SESSION["id"] = $id;
              $_SESSION["username"] = $username;                            
              
              // Redirect user to welcome page
              header( "location: app.php" );
            } else {
              // Display an error message if password is not valid
              $password_err = "The password you entered was not valid.";
            }
            
          }

        } else {
          // Display an error message if username doesn't exist
          $username_err = "No account found with that username.";
        }
      } else{
          echo "Oops! Something went wrong. Please try again later.";
      }
    }
      
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
    <title>Login</title>    
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    
    <!-- Latest compiled and minified CSS -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">
    <!-- Optional theme -->
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap-theme.min.css">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <!-- DataTables -->
    <!--link rel="stylesheet" href="https://cdn.datatables.net/1.10.16/css/dataTables.bootstrap.min.css"-->

    <style type="text/css">
        
        body {
        background: #E8E8E8;
        font-family: Arial, Helvetica, sans-serif;
        }
        .mobile-container {
        max-width: 480px;
        margin: auto;
        background-color: #787878;
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
					margin: 0 auto;
        }
				.wrapper h2 {
					margin-top: 10px;
				}
				
				/* New header */
				.header-block {
					height: 52px;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          background-color: #0066ff;
          border-bottom: 1px solid #404040;
				}
				.header-block__link {
					width: calc(100% - 52px);
					height: 100%;
					line-height: 3.1;
					padding: 0 0 0 15px;
					text-decoration: none;
				}
				.header-block__link:hover {
					background-color: #ddd;
					text-decoration: none;
				}
				.header-block__title {
					margin: 0;
					color: #fff;
					font-size: 17px;
				}
				.header-block__title:hover {
						color: #000;
				}
				.header-block__btn {
					width: 52px;
					height: 51px;
					display: flex;
					justify-content: center;
					align-items: center;
					color: #fff;
					background-color: #787878;
					border: none;
					cursor: pointer;
					outline: 0;
				}
				.header-block__btn:hover {
					background-color: #ddd;
				}
				.header-block__btn:hover i {
					color: #000;
				}
				.header-block__btn > i {
					font-size: 30px;
				}


				.header-block__menu {
					display: block!important;
					height: 0;
					width: 100%;
					background-color: #585858;
					transition: height 0.3s ease-out;
					overflow: hidden;
				}
				.header-block__menu .list {
					list-style: none;
					height: 55px;
					margin: 0;
				}
				.header-block__menu .list__item {
					color: #fff;
				}
				.header-block__menu .list__item:hover {
          background-color: #ddd;
        }
        .header-block__menu .list__item:hover > a {
          color: #000;
					text-decoration: none;
        }
				.header-block__menu .list__item > a {
					display: block;
					padding: 15px 0 15px 15px;
					font-size: 17px;
        }
				.header-block__menu .list__link {
          color: #fff;
        }


	

    </style>
</head>
<body>

<!-- Simulate a smartphone / tablet -->
<div class="mobile-container">

    <!-- Top Navigation Menu 
    
    <div class="topnav">
        <a href="#home" class="active">ESA DocApp</a>
        <div id="myLinks">
            <a href="register.php">SignUp</a>-->
            <!--a href="#contact">Messages</a-->
            <!--<a href="logout.php">LogOut</a>
        </div>
        <a href="javascript:void(0);" class="icon" onclick="menuClick()">
            <i class="fa fa-bars"></i>
        </a>
    </div>-->
    <header class="header-block">
				<a href="#" class="header-block__link">
						<p class="header-block__title">ESA Physician Portal</p>
				</a>
				<button type="button" class="header-block__btn">
            <!--img src="./../filesForLogin.php/icons/menu-black-18dp.svg" alt="menu" srcset=""-->
            <img src="assets/icons/menu-black-18dp.svg" alt="menu" srcset="">
            
				</button> 
		</header>
		<div class="header-block__menu" style="height: 0px">
				<ul class="list">
						<li class="list__item">
								<a href="logout.php" class="list__link">
										LogOut
								</a>
						</li>
				</ul>
		</div>
    <!-- Main Body -->
    <div class="wrapper">
        <h2>Login</h2>
        <p>Please fill in your credentials to login.</p>
        <form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
            <div class="form-group <?php echo (!empty($username_err)) ? 'has-error' : ''; ?>">
                <label>Username</label>
                <input type="text" name="username" class="form-control" value="<?php echo $username; ?>">
                <span class="help-block"><?php echo $username_err; ?></span>
            </div>    
            <div class="form-group <?php echo (!empty($password_err)) ? 'has-error' : ''; ?>">
                <label>Password</label>
                <input type="password" name="password" class="form-control">
                <span class="help-block"><?php echo $password_err; ?></span>
            </div>
            <div class="form-group">
                <input type="submit" class="btn btn-primary btn_md" value="Login">
            </div>
            <!-- <p>Don't have an account? <a href="register.php">Sign up now</a>.</p> -->
        </form>
    </div>

<!-- End smartphone / tablet look -->
</div>
<script src="./../filesForLogin.php/min-jquery.js"></script>

<script>

// function menuClick() {
	$('.header-block__btn').on('click', () => {
		const slideDown = element => element.style.height = element.style.height === `0px` ?`${element.scrollHeight}px` : `0px`;
		slideDown(document.querySelector('.header-block__menu'));
	});
//     var x = document.getElementById("myLinks");
//     if (x.style.display === "block") {
//         x.style.display = "none";
//     } else {
//         x.style.display = "block";
//     }

// }

</script>
</body>
</html>
