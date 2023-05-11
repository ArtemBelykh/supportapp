<?php
// Initialize the session
session_start();

//Check if the user is logged in, if not then redirect him to login page
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: login.php");
    exit;
};

$userId = $_SESSION["id"];
if ( !isset($_SESSION["selectedId"]) ) { $_SESSION["selectedId"]=0; }
$selectedId = $_SESSION["selectedId"];

header('Expires: Tue, 01 Jan 2000 00:00:00 GMT');
header('Last-Modified: ' . gmdate("D, d M Y H:i:s") . ' GMT');
header('Cache-Control: no-store, no-cache, must-revalidate');
header('Cache-Control: post-check=0, pre-check=0', false);
header('Pragma: no-cache'); 

?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Support Pets</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.datatables.net/1.10.20/css/jquery.dataTables.min.css" />
    <link
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <script src="js/min-jquery.js"></script>
    <script src="https://cdn.jsdelivr.net/jquery.validation/1.16.0/jquery.validate.min.js"></script>
    <script src="https://cdn.jsdelivr.net/jquery.validation/1.16.0/additional-methods.min.js"></script>
    <script src="https://cdn.datatables.net/1.10.22/js/jquery.dataTables.min.js"></script>
    <script src="js/jquery.mask.min.js"></script>

    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
    <link href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" rel="stylesheet">
    <link rel="stylesheet" href="js/nav/nav.css">
		<link rel="stylesheet" href="css/main.css" /> 
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.17.1/moment-with-locales.min.js"></script>

  </head>

  <body>
    <div id="main-wrapper" class="container-fluid main-wrapper">
      <header class="header header--shadow">
				<a href="#" class="left-menu-logo"></a>
				<div id="menu" class="menu left-menu sidenav sidenav-fixed ">
					
				</div>
			</header>
        
      <main class="main">
				<div id="dashboard-wrapper" class="container-fluid dashboard-wrapper">
          <section id="search-section" class="tab-section search-section">
            <div class="row">
              <div class="wrapper col-xs-12 col-sm-6 col-md-12">  
                <div class="row header-block header-block--wider">
                  <div class="header-block__container">
                    <h3 class="header-block__title">Search</h3>
                  </div>
                </div>
                <br >

                <form id="profile-form" class="profile-form">
                  <div class="row">
                    <div class="wrapper form-block">
                        <div class='form-block__inputs-wrapper'>
                          <div class="row">
                            <div class="col-xs-12 col-sm-6 col-md-6 form-block"> 
                              <div class="input-group">
                                <div class="input-group-addon">
                                  <i class="fas fa-at fa-lg"></i>
                                </div>
                                <input placeholder="email" id="email" type="text" class="validate form-control form-input__input form-input__input--email">
                                <div class="input-group-addon">
                                  <p class="form-input__checkbox">
                                    <label>
                                        <input name="search-group" type="radio" checked class="with-gap" />
                                        <span></span>
                                    </label>
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div class="col-xs-12 col-sm-6 col-md-6 form-block"> 
                              <div class="input-group">
                                <div class="input-group-addon">
                                  <i class="fas fa-user fa-lg"></i>
                                </div>
                                <input placeholder="name" id="name" type="text" class="validate form-control form-input__input form-input__input--fn">
                                <div class="input-group-addon">
                                  <p class="form-input__checkbox">
                                    <label>
                                      <input name="search-group" type="radio" class="with-gap" />
                                      <span></span>
                                    </label>
                                  </p>
                                </div>
                              </div>
                            </div>
                        </div>
                        <div class="row">
                          <div class="col-xs-12 col-sm-6 col-md-6 form-block">
                            <div class="input-group">
                              <div class="input-group-addon">
                                <i class="fas fa-mobile-alt fa-lg"></i>
                              </div>
                              <input placeholder="phone" id="phone" type="text" class="validate form-control form-input__input form-input__input--phone">
                              <div class="input-group-addon">
                                <p class="form-input__checkbox">
                                  <label>
                                    <input name="search-group" type="radio" class="with-gap" />
                                    <span></span>
                                  </label>
                                </p>
                              </div>
                            </div>
                          </div>
                          <div class="col-xs-12 col-sm-6 col-md-6 form-block">
                            <div class="input-group">
                              <div class="input-group-addon">
                                <i class="fas fa-id-card fa-lg"></i>
                              </div>
                              <input placeholder="esa #" id="id" type="text" class="validate form-control form-input__input form-input__input--id">
                              <div class="input-group-addon">
                                <p class="form-input__checkbox">
                                  <label>
                                    <input name="search-group" type="radio" />
                                    <span></span>
                                  </label>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div class="row">
                            <div class="btns-block">
                                <button class="btn btn-primary btn-s align-self-start btns-block__btn-search client-search">Search</button>
                            </div>
                        </div>
                      </div>
                    </div>
                  </div>            
                </form>	
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
    <script>
      const selectedId = <?php echo $selectedId; ?>;   
      const userId = <?php echo $userId; ?>;
    </script>
    <!-- <script src=js/menu.js></script> -->
    <script src="js/getPermissionsAndNotifications.js"></script>
    <script>
      $('input[type="text"]').on('click', function (e) {
        const radio = $(this).parent().find('input[type="radio"]')
        radio.prop('checked', true)
      })
    </script>
  </body>
</html>
