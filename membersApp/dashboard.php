<?php
// Initialize the session
session_start();

//Check if the user is logged in, if not then redirect him to login page
//if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
//    header("location: login.php");
//    exit;
//};

$userId = $_SESSION["id"] || 2240;
if ( !isset($_SESSION["selectedId"]) ) { $_SESSION["selectedId"]=0; }
$selectedId = $_SESSION["selectedId"] || 2240;

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
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script src="https://cdn.jsdelivr.net/jquery.validation/1.16.0/jquery.validate.min.js"></script>
    <script src="https://cdn.jsdelivr.net/jquery.validation/1.16.0/additional-methods.min.js"></script>
    <script src="https://cdn.datatables.net/1.10.22/js/jquery.dataTables.min.js"></script>
    <script src="js/jquery.mask.min.js"></script>

    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
<link rel="stylesheet" href="./css/materialize.min.css" />
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
    <link href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" rel="stylesheet">
    <link rel="stylesheet" href="js/nav/nav.css">
		<link rel="stylesheet" href="css/main.css" /> 
		<link rel="stylesheet" href="css/styles.css" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.17.1/moment-with-locales.min.js"></script>
    <script src="js/materialize.min.js"></script>
    <script src="js/main.js"></script>
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
          <section id="profile-section" class="tab-section profile-section">

                      <!-- PROFILE MAIN FORM -->
                      <form id="profile-form">
 <!--<div class="row profile-photo m-top-3">-->
 <!--  <div class="col s12 m4">-->
 <!--    &lt;!&ndash; CHOOSE PET'S PHOTO BLOCK &ndash;&gt;-->
 <!--<div class="file-field input-field profile-photo__pic ">-->
 <!--  <p class="pic-pre">Photo of Pet</p>-->

 <!--  <div class="pic-edit">-->
 <!--    <img id="petPhoto" class="hidden" alt="your pet's photo">-->
 <!--    <span class="edit-sign">-->
 <!--                                  <input type="file" onchange="readURL(this);" />+-->
 <!--                                </span>-->
 <!--  </div>-->
 <!--</div>-->
 <!--</div>-->
 <!--<div class="hide-on-small-only col  m8">-->
 <!--  <div class="profile-picture center-align">-->
 <!--    <img src="./img/dog_cat.png" alt="" />-->
 <!--  </div>-->
 <!--</div>-->
 <!--</div>-->
                        <!-- Tabs  -->
                        <br>
                        <ul class="collapsible expandable">
                        <br>
                          <!-- HANDLER INFO -->
                          <li class="form-block active">

                            <div class="collapsible-header">
                              <p class="form-block__heading">Handler Info</p>
                            </div>
                            <div class="collapsible-body">

                            <!-- FIRST NAME / LAST NAME -->
                            <div class="row">
                              <div class="col s12 form-block">
                                <div class="row inputs-container">
                                  <div class="input-field col s8 m2">
                                    <select>
                                      <option value="Mr." selected>Mr.</option>
                                      <option value="Ms.">Ms.</option>
                                    </select>
                                    <label>Prefix</label>
                                  </div>

                                  <div class="input-field col s10 m4">
                                    <input id="firstname" type="text" class="validate input-outlined" required>
                                    <label for="firstname">First Name</label>
                                  </div>
                                  <div class="input-field col s10 m4">
                                    <input id="lastname" type="text" class="validate" required>
                                    <label for="lastname">Last Name</label>
                                  </div>
                                </div>
                              </div>
                            </div>

                              <div class="row">
                                <div class="col s12">
                                  <div class="row inputs-container">
                                    <div class="input-field col s10 m7">
                                      <input id="email" type="email" class="validate" required>
                                      <label for="email">Email</label>
                                    </div>
                                  </div>
                                  <div class="row inputs-container">
                                    <div class="input-field col s10 m7">
                                      <input type="date" data-provide="datepicker" name="birthday" id="birthday" required>
                                      <label for="birthday">Date of Birth</label>
                                    </div>
                                  </div>
                                  <div class="row inputs-container">
                                    <div class="input-field col s10 m7">
                                      <input id="phoneNumber" type="tel" class="validate" required>
                                      <label for="phoneNumber">Mobile Phone</label>
                                    </div>
                                  </div>
                                  <div class="row inputs-container">
                                    <div class="input-field col s10 m7">
                                      <div class="gender-group">
                                        <span class="gender-group__radio">
                                          <label>
                                            <input class="with-gap" name="gender" type="radio" id="male" checked required>
                                            <span>Male</span>
                                          </label>
                                        </span>
                                        <span class="gender-group__radio">
                                          <label>
                                            <input class="with-gap" name="gender" type="radio" id="female" required>
                                            <span>Female</span>
                                          </label>
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                          <!-- BILLING ADDRESS  -->
                          <li class="form-block">
                            <div class="collapsible-header">
                              <p class="form-block__heading">Billing Address</p>
                            </div>
                            <div class="collapsible-body">
                              <div class="row">
                                <div class="col s12 ">
                                  <div class="row inputs-container">
                                    <div class="input-field col s10 m5 l7">
                                      <input id="streetAddres1" type="text" required>
                                      <label for="streetAddres1">Street Address 1</label>
                                    </div>
                                  </div>
                                  <div class="row inputs-container">
                                    <div class="input-field col s10 m5 l7">
                                      <input id="streetAddres2" type="text" required>
                                      <label for="streetAddres2">Street Address 2</label>
                                    </div>
                                  </div>
                                  <div class="row inputs-container">
                                    <div class="input-field col s10 m3 l3">
                                      <input id="city" type="text" class="validate" required>
                                      <label for="city">City</label>
                                    </div>
                                    <div class="input-field col s10 m5 l2">
                                      <select>
                                        <option value="California" disabled selected>California</option>
                                        <option value="Alabama">Alabama</option>
                                        <option value="Arizona">Arizona</option>
                                        <option value="Maine">Maine</option>
                                        <option value="Nevada">Nevada</option>
                                      </select>
                                      <label>State</label>
                                    </div>
                                  </div>
                                  <div class="row inputs-container">
                                    <div class="input-field col s7 m3">
                                      <input id="zip" type="text" class="validate" required>
                                      <label for="zip">Zip</label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>
                          <!-- SHIPPING ADDRESS  -->
                          <li class="form-block">
                            <div class="collapsible-header">
                              <p class="form-block__heading">Shipping Address</p>
                            </div>
                            <div class="collapsible-body">
                              <div class="row">
                                <div class="col s12 ">
                                  <div class="row inputs-container">
                                    <div class="input-field col s10 m5 l7">
                                      <input id="ShippingStreetAddres1" type="text" required>
                                      <label for="ShippingStreetAddres1">Street Address 1</label>
                                    </div>
                                  </div>
                                  <div class="row inputs-container">
                                    <div class="input-field col s10 m5 l7">
                                      <input id="ShippingStreetAddres2" type="text" required>
                                      <label for="ShippingStreetAddres2">Street Address 2</label>
                                    </div>
                                  </div>
                                  <div class="row inputs-container">
                                    <div class="input-field col s10 m3 l3">
                                      <input id="shippingCity" type="text" class="validate" required>
                                      <label for="shippingCity">City</label>
                                    </div>
                                    <div class="input-field col s10 m3 l2">
                                      <select id="shippingState">
                                        <option value="California" disabled selected>California</option>
                                        <option value="Alabama">Alabama</option>
                                        <option value="Arizona">Arizona</option>
                                        <option value="Maine">Maine</option>
                                        <option value="Nevada">Nevada</option>
                                      </select>
                                      <label>State</label>
                                    </div>
                                  </div>
                                  <div class="row inputs-container">
                                    <div class="input-field col s7 m3 l2">
                                      <input id="shippingZip" type="text" class="validate" required>
                                      <label for="shippingZip">Zip</label>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </li>

                          <!-- PASSWORD -->
                          <li class="form-block">
                            <div class="collapsible-header">
                              <p class="form-block__heading">Password</p>
                            </div>
                            <div class="collapsible-body">
                              <div class="row">
                                <div class="col s12 ">
                                  <div class="row inputs-container">
                                    <div class="input-field col s10 m5">
                                      <input id="password" type="password" class="validate" required>
                                      <label for="password">Password</label>
                                    </div>
                                  </div>
                                  <div class="row inputs-container">
                                    <div class="input-field col s10 m5">
                                      <input id="confirmPasword" type="password" class="validate" required>
                                      <label for="pconfirmPasword">Confirm Password</label>
                                    </div>
                                  </div>
                                  <div class="row inputs-container valign-wrapper"></div>
                                </div>
                              </div>
                            </div>
                          </li>
                        </ul>

                        <div class="input-field col s6">
                          <button class="btn btn-large btn-register waves-effect waves-light profile-submit-btn" type="submit" name="action">
                            Submit
                          </button>
                        </div>
                      </form>
                      <!-- END OF PROFILE FORM -->
                    </section>
                    <!-- END OF PROFILE SECTION -->
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
