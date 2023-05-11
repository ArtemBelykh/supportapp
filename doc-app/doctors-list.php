<!DOCTYPE html>
<html lang="en">
 <head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <link rel="stylesheet" href="https://cdn.datatables.net/1.10.20/css/jquery.dataTables.min.css" />
  <link rel="shortcut icon" href="./assets/img/favicon.png">
  <link rel="stylesheet" type="text/css" href="./assets/css/styles.css">
  <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <script src="https://code.jquery.com/jquery-3.3.1.js"></script>
  <script src="https://cdn.datatables.net/1.10.20/js/jquery.dataTables.min.js"></script>
  <script scr="./assets/js/doctors-list.js"></script>
  <title>ESA Verification</title>
</head>
<body id="doctors-list-page">
  <header class="doctors-list-header-base">
      <div class="logo-container">
        <div class="logo"></div>
        <span>ESA Verification Portal</span>
      </div>
      <button id="sign-out-button">Sign Out</button>
  </header>
  <div id="doctors-list-page-main-content">
    <div class="table-wrapper">
      <table id="doctors-list-table" cellpadding="7" cellspacing="0">
        <thead>
          <tr>
            <!--th class="hide-data">ID</th-->
            <th>First Name</th>
            <!--th class="hide-data">Middle Name</th-->
            <th>Last Name</th>
            <!--th class="is-active">Is Active</th-->
            <th>Login</th>
            <!--th class="hide-data">Password</th-->
            <th>Address</th>
            <th>City</th>
            <!--th class="us-list">State</th-->
            <!--th class="hide-data">ZIP</th-->
            <th>SMS Number</th>
            <th>Phone (public)</th>
            <!--th class="hide-data">Phone (service)</th-->
            <!--th class="hide-data">E-mail (service)</th--> 
            <!--th class="hide-data">E-mail (public) </th--> 
            <th>NPI</th>
          </tr>
        </thead>
        <!--tbody>
          <tr>
            <td></td>
            <td class="hide-data"></td>
            <td></td>
            <td class="is-active">
              <input type="checkbox">
            </td>
            <td class="hide-data"></td>
            <td></td>
            <td></td>
            <td></td>
            <td class="us-list">
              <select>
                <option></option>
              </select>
            </td>
            <td class="hide-data"></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody-->  
      </table>
    </div>
    <div class="form-wrapper">
      <form id="current-doctors-list-data-form" action="" name="current-doctors-list-data" method="post" enctype="application/x-www-form-urlencoded">
        <div class="form-columns-one">
          <label for="form-first-name">First name</label>
          <input id="form-first-name" form="current-doctors-list-data-form" class="form-input" name="form-first-name" type="text">
          <label for="form-middle-name">Middle name</label>
          <input id="form-middle-name" form="current-doctors-list-data-form" class="form-input" name="form-middle-name" type="text">
          <label for="form-last-name">Last name</label>
          <input id="form-last-name" form="current-doctors-list-data-form" class="form-input" name="form-last-name" type="text">
          <label for="is-active">Is active</label>
          <input id="form-is-active" form="current-doctors-list-data-form" class="form-input" name="form-is-active" type="checkbox">
          <label for="form-login">Login</label>
          <input id="form-login" form="current-doctors-list-data-form" class="form-input" name="form-login" type="text">
        </div>
        <div class="form-columns-two">
          <label for="form-password">Password</label>
          <input id="form-password" form="current-doctors-list-data-form" class="form-input" name="form-password" type="text">
          <label for="form-address">Address</label>
          <input id="form-address" form="current-doctors-list-data-form" class="form-input" name="form-address" type="text">
          <label for="form-city">City</label>
          <input id="form-city" form="current-doctors-list-data-form" class="form-input" name="form-city" type="text">
          <label for="form-state">State</label>
          <input id="form-state" form="current-doctors-list-data-form" class="form-input" name="form-state" type="text">
          <label for="form-zip">ZIP</label>
          <input id="form-zip" form="current-doctors-list-data-form" class="form-input" name="form-zip" type="text">
        </div>
        <div class="form-columns-three">
          <label for="form-sms-number">SMS number</label>
          <input id="form-sms-number" form="current-doctors-list-data-form" class="form-input" name="form-sms-number" type="text">
          <label for="form-phone-service">Phone (service)</label>
          <input id="form-phone-service" form="current-doctors-list-data-form" class="form-input" name="form-phone-service" type="text">
          <label for="form-phone-public">Phone (public)</label>
          <input id="form-phone-public" form="current-doctors-list-data-form" class="form-input" name="form-phone-public" type="text">
          <label for="form-email-service">E-mail (service)</label>
          <input id="form-email-service" form="current-doctors-list-data-form" class="form-input" name="form-email-service" type="text">
          <label for="form-email-public">E-mail (public)</label>
          <input id="form-email-public" form="current-doctors-list-data-form" class="form-input" name="form-email-public" type="text">
        </div>  
      </form>
    </div> 
    <div class="doctors-table-list"></div>
    <div class="action-block">
      <button id="add-button" class="action-buttons" name="add-button" type="button"><i class="fa fa-plus plus-icon"></i> Add doctor</button>
      <button id="edit-button" class="action-buttons" name="edit-button" type="button">Edit doctor`s info</button>
      <button id="show-license" class="action-buttons" name="show-license" type="button">Show license</button>
    </div>
  </div>
  <footer>
    <div>
      <img id="federal-laws-logos" class="logos" src="./assets/img/Federal_Laws_logos.PNG" alr="Federal Laws logos" />
    </div>
    <span class="rights-text">© 2019 ESA Verification</span>
  </footer>
</body>
</html>