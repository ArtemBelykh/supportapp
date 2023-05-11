<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Support Pets</title>
    <link rel="stylesheet" href="./fonts/montserrat/Montserrat.css" />
    <link
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="./css/materialize.min.css" />
    <link rel="stylesheet" href="./css/main.css" />
  </head>

  <body>
    <div class="container-fluid main-wrapper">
      <header class="header">
        <!-- -------------------  Left menu ----------------------->
        <ul class="left-menu sidenav sidenav-fixed " id="left-menu">
          <a href="#" class="left-menu-logo"></a>
          <li class="left-menu__item">
            <a
              href="./dashboard.html"
              class="menu-link tooltipped"
              data-position="right"
              data-tooltip="My Profile"
            >
              <span class="link-icon icon-profile"></span>
              <span class="menu-link__heading">My Profile</span>
            </a>
          </li>
          <li class="left-menu__item">
            <a
              href="./refer.html"
              class="menu-link tooltipped"
              data-position="right"
              data-tooltip="Refer a Friend"
            >
              <span class="link-icon icon-money"></span>
              <span class="menu-link__heading">Refer a Friend</span>
            </a>
          </li>
          <li class="left-menu__item">
            <a
              href="#"
              class="menu-link tooltipped"
              data-position="right"
              data-tooltip="My Pets"
            >
              <span class="link-icon icon-palm"></span>
              <span class="menu-link__heading">My Pets</span>
            </a>
          </li>
          <li class="left-menu__item">
            <a
              href="./store.html"
              class="menu-link tooltipped"
              data-position="right"
              data-tooltip="Store"
            >
              <span class="link-icon icon-cart"></span>
              <span class="menu-link__heading">Store</span>
            </a>
          </li>
          <li class="left-menu__item">
            <a
              href="#"
              class="menu-link tooltipped"
              data-position="right"
              data-tooltip="Orders"
            >
              <span class="link-icon icon-box"></span>
              <span class="menu-link__heading">Orders</span>
            </a>
          </li>
          <li class="left-menu__item">
            <a
              href="#"
              class="menu-link tooltipped"
              data-position="right"
              data-tooltip="My ESA Documents"
            >
              <span class="link-icon icon-file"></span>
              <span class="menu-link__heading">My ESA Documents</span>
            </a>
          </li>
          <li class="left-menu__item">
            <a
              href="#"
              class="menu-link tooltipped"
              data-position="right"
              data-tooltip="New Landlord/Airline
                  Request"
            >
              <span class="link-icon icon-edit"></span>
              <span class="menu-link__heading  border: 1px solid;"
                >New Landlord/Airline Request</span
              >
            </a>
          </li>
          <li class="left-menu__item">
            <a
              href="#"
              class="menu-link tooltipped"
              data-position="right"
              data-tooltip="Support"
            >
              <span class="link-icon icon-msg"></span>
              <span class="menu-link__heading">Support</span>
            </a>
          </li>
          <li class="left-menu__item">
            <a
              href="#"
              class="menu-link tooltipped"
              data-position="right"
              data-tooltip="Sign Out"
            >
              <span class="link-icon icon-signout"></span>
              <span class="menu-link__heading">Sign Out</span>
            </a>
          </li>
        </ul>
      </header>

      <main class="main">
        <div class="container-fluid dashboard-wrapper">
          <!-- SIDEBAR TOGGLE -->
          <a href="#" class="openLeftMenu hide-on-med-and-down"></a>

          <div class="container-fluid">
            <!-- PROFILE SECTION -->
            <section class="profile">
              <div class="profile-head valign-wrapper">
                <div class="row">
                  <div class="col s12">
                    <h3 class="profile-head__welcome">
                      Welcome back
                      <span id="welcome-name">Andrew!</span>
                    </h3>
                  </div>
                </div>
              </div>
              <!-- PROFILE MAIN FORM -->
              <form id="profile-form">
                <div class="row profile-photo m-top-3">
                  <div class="col s12 m4">
                    <!-- CHOOSE PET'S PHOTO BLOCK -->
                    <div class="file-field input-field profile-photo__pic ">
                      <p class="pic-pre">Photo of Pet</p>

                      <div class="pic-edit">
                        <img
                          id="petPhoto"                          
                          alt="your pet's photo"  
                          class="hidden"                        
                        />
                        <span class="edit-sign">
                          <input type="file" onchange="readURL(this);" />+
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="hide-on-small-only col  m8">
                    <div class="profile-picture center-align">
                      <img src="./img/dog_cat.png" alt="" />
                    </div>
                  </div>
                </div>
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
                        <input
                          id="firstname"
                          type="text"
                          class="validate input-outlined"
                          required
                        />
                        <label for="firstname">First Name</label>
                      </div>
                      <div class="input-field col s10 m4">
                        <input
                          id="lastname"
                          type="text"
                          class="validate"
                          required
                        />
                        <label for="lastname">Last Name</label>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Tabs  -->
                <ul class="collapsible expandable">
                  <!-- HANDLER INFO --> 
                  <li class="form-block active">
                    <div class="collapsible-header">
                      <p class="form-block__heading">Handler Info</p>
                    </div>
                    <div class="collapsible-body">
                      <div class="row">
                        <div class="col s12">
                          <div class="row inputs-container">
                            <div class="input-field col s10 m7">
                              <input
                                id="email"
                                type="email"
                                class="validate"
                                required
                              />
                              <label for="email">Email</label>
                            </div>
                          </div>
                          <div class="row inputs-container">
                            <div class="input-field col s10 m7">
                              <input
                                type="text"
                                name="birthday"
                                id="birthday"
                                class="datepicker"
                                required
                              />
                              <label for="birthday">Date of Birth</label>
                            </div>
                          </div>
                          <div class="row inputs-container">
                            <div class="input-field col s10 m7">
                              <input
                                id="phoneNumber"
                                type="tel"
                                class="validate"
                                required
                              />
                              <label for="phoneNumber">Mobile Phone</label>
                            </div>
                          </div>
                          <div class="row inputs-container">
                            <div class="input-field col s10 m7">
                              <div class="gender-group">
                                <span class="gender-group__radio">
                                  <label>
                                    <input
                                      class="with-gap"
                                      name="gender"
                                      type="radio"
                                      id="male"
                                      checked
                                      required
                                    />
                                    <span>Male</span>
                                  </label>
                                </span>
                                <span class="gender-group__radio">
                                  <label>
                                    <input
                                      class="with-gap"
                                      name="gender"
                                      type="radio"
                                      id="female"
                                      required
                                    />
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
                              <input id="streetAddres1" type="text" required />
                              <label for="streetAddres1"
                                >Street Address 1</label
                              >
                            </div>
                          </div>
                          <div class="row inputs-container">
                            <div class="input-field col s10 m5 l7">
                              <input id="streetAddres2" type="text" required />
                              <label for="streetAddres2"
                                >Street Address 2</label
                              >
                            </div>
                          </div>
                          <div class="row inputs-container">
                            <div class="input-field col s10 m3 l3">
                              <input
                                id="city"
                                type="text"
                                class="validate"
                                required
                              />
                              <label for="city">City</label>
                            </div>
                            <div class="input-field col s10 m5 l2">
                              <select>
                                <option value="California" disabled selected
                                  >California</option
                                >
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
                              <input
                                id="zip"
                                type="text"
                                class="validate"
                                required
                              />
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
                              <input
                                id="ShippingStreetAddres1"
                                type="text"
                                required
                              />
                              <label for="ShippingStreetAddres1"
                                >Street Address 1</label
                              >
                            </div>
                          </div>
                          <div class="row inputs-container">
                            <div class="input-field col s10 m5 l7">
                              <input
                                id="ShippingStreetAddres2"
                                type="text"
                                required
                              />
                              <label for="ShippingStreetAddres2"
                                >Street Address 2</label
                              >
                            </div>
                          </div>
                          <div class="row inputs-container">
                            <div class="input-field col s10 m3 l3">
                              <input
                                id="shippingCity"
                                type="text"
                                class="validate"
                                required
                              />
                              <label for="shippingCity">City</label>
                            </div>
                            <div class="input-field col s10 m3 l2">
                              <select id="shippingState">
                                <option value="California" disabled selected
                                  >California</option
                                >
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
                              <input
                                id="shippingZip"
                                type="text"
                                class="validate"
                                required
                              />
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
                              <input
                                id="password"
                                type="password"
                                class="validate"
                                required
                              />
                              <label for="password">Password</label>
                            </div>
                          </div>
                          <div class="row inputs-container">
                            <div class="input-field col s10 m5">
                              <input
                                id="confirmPasword"
                                type="password"
                                class="validate"
                                required
                              />
                              <label for="pconfirmPasword"
                                >Confirm Password</label
                              >
                            </div>
                          </div>
                          <div
                            class="row inputs-container valign-wrapper"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>

                <div class="input-field col s6">
                  <button
                    class="btn btn-large btn-register waves-effect waves-light profile-submit-btn"
                    type="submit"
                    name="action"
                  >
                    Submit
                  </button>
                </div>
              </form>
              <!-- END OF PROFILE FORM -->
            </section>
            <!-- END OF PROFILE SECTION -->
          </div>
        </div>
      </main>
    </div>

    <script src="js/min-jquery.js"></script>
    <script src="js/materialize.min.js"></script>
    <script src="js/main_04.js"></script>
    <script src="js/pet-data.js"></script>
  </body>
</html>
