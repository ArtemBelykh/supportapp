<?php
// Initialize the session
session_start();
 
// Check if the user is logged in, if not then redirect him to login page
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: login.php");
    exit;
}

header("Expires: Tue, 01 Jan 2000 00:00:00 GMT");
header("Last-Modified: " . gmdate("D, d M Y H:i:s") . " GMT");
header('Cache-Control: no-store, no-cache, must-revalidate');
header('Cache-Control: post-check=0, pre-check=0', false);
header('Pragma: no-cache'); 

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Available clients</title>
    
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
    <link
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">

    <script src="js/min-jquery.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.19.2/dist/jquery.validate.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/jquery-validation@1.19.2/dist/additional-methods.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery.mask/1.14.16/jquery.mask.min.js"></script>
    <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.17.1/moment-with-locales.min.js"></script>
    <!-- <link rel="stylesheet" href="css/materialize.min.css" /> -->
    <link rel="stylesheet" href="css/main.css" />
</head>
<body>
    <div class="container">
        <main class="app-block">
                <header class="app-block__header">
                    <a href="app.php" class="app-block__link">
                        <p class="app-block__title">ESA Physician Portal</p>
                    </a>
                    <button type="button" class="app-block__btn">
                        <img src="assets/icons/menu-black-18dp.svg" alt="menu" srcset="">
                    </button> 
                </header>
                <div class="app-block__menu hidden-el">
                    <ul class="list">
                        <li class="list__item">
                            <a href="app.php" class="list__link">
                                Home
                            </a>
                        </li>
                        <li class="list__item">
                            <a href="statistics.php" class="list__link">
                                Statistics
                            </a>
                        </li>
                        <li class="list__item">
                            <a href="search.php" class="list__link">
                                Search ESA
                            </a>
                        </li>
                        <li class="list__item">
                            <a href="tutorial.php" class="list__link">
                                Tutorial Video
                            </a>
                        </li>
                        <li class="list__item">
                            <a href="logout.php" class="list__link">
                                LogOut
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="app-block__review-title">
                    <h3>Statistics</h3>
                </div>
                <section class="statistics-block"></section>
        </main>
        
        <!-- <div id="submitModal" class="modal">
            <form id="form">
              <div class="modal-content">
                <input name="id" type="text" placeholder="Enter Doctor ID#" class="modal-input">
                <i class="modal-content__icon-close material-icons">close</i>
              </div>
              <div class="modal-footer">
                <div class="modal-footer__buttons">
                  <button type="submit" class="btn modal-submitBtn">Submit Order Status</button>
                  <button type="button" class="btn modal-cancelBtn">Cancel</button>
                </div>
                <div class="additional-info">
                  <p>Please call the customer if you have additional questions.</p>
                  <p>
                    <sup>***</sup>
                      By submitting you are giving your professional recommendation
                    <sup>***</sup>
                  </p>
                </div>
              </div>
            </form>
        </div> -->
        <div class="loadingio-spinner-spinner-rb9wwyg8sp hidden"><div class="ldio-06wtkhb3zfoe">
            <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
            </div></div>
    </div>
    <script src="js/statistics.js"></script>
</body>
</html>