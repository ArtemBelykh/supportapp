<!DOCTYPE html>
<html lang="en">
 <head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

  
  <link rel="stylesheet" href="https://cdn.datatables.net/1.10.20/css/jquery.dataTables.min.css" />
  <script src="https://code.jquery.com/jquery-3.3.1.js"></script>
  <script src="https://cdn.datatables.net/1.10.20/js/jquery.dataTables.min.js"></script>


  <link rel="shortcut icon" href="./assets/img/favicon.png">
  <link rel="stylesheet" type="text/css" href="./assets/css/styles.css">
  <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <script scr="./assets/js/index.js"></script>


  <script>
           
    //        "ajax": "/sql/sql_v_doctors_www_01.php"

    $(document).ready(function() {

      var table = $('#doctors-list-table').DataTable( {
        //"processing": true,
        //"serverSide": true,
        "ajax": { 
          "url":"../sql/sql_v_doctors_www_01.php",
          "dataSrc": ""//,
          //"dataType": "json",                  
          //"contentType": "application/json; charset=utf-8"
        } ,
        "columns": [
          { "data": "id" }, 
          { "data": "fname" }, 
          { "data": "mname",    "visible": false, "searchable": false },
          { "data": "lname" },
          { "data": "IsActive", "visible": false, "searchable": false }, 
          { "data": "login" },
          { "data": "psswd",    "visible": false, "searchable": false },
          { "data": "address" },
          { "data": "city" },
          { "data": "state",    "visible": false, "searchable": false },
          { "data": "ZIP",      "visible": false, "searchable": false },
          { "data": "phoneSMS" },                
          { "data": "phoneService", "visible": false, "searchable": false  },
          { "data": "phonePublic" },
          { "data": "emailService", "visible": false, "searchable": false  },
          { "data": "emailPublic",  "visible": false, "searchable": false  },
          { "data": "NPI" }                
        ]
      } );
      
      $('#doctors-list-table tbody').on('click', 'tr', function () {
        var data = table.row( this ).data();
        //alert( 'You clicked on '+data[0]+'\'s row' );
        alert( 'You clicked on '+data.fname+' '+data.lname+'\'s row' );
      } );

    } );
  </script>

  <title>Providers' Details</title>
</head>

<body id="doctors-list-page">

  <header class="doctors-list-header-base">
      <div class="logo-container">
        <div class="logo"></div>
        <span>Providers' Details</span>
      </div>
      <button id="sign-out-button">Sign Out</button>
  </header>

  <div id="doctors-list-page-main-content">
    <div class="table-wrapper">
      <table id="doctors-list-table" cellpadding="7" cellspacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th class="hide-data">Middle Name</th>
            <th>Last Name</th>
            <th class="hide-data">Is Active</th>
            <th>Login</th>
            <th class="hide-data">Password</th>
            <th>Address</th>
            <th>City</th>
            <th class="us-list">State</th>
            <th class="hide-data">ZIP</th>
            <th>SMS Number</th>            
            <th class="hide-data">Phone (service)</th>
            <th>Phone (public)</th>
            <th class="hide-data">E-mail (service)</th> 
            <th class="hide-data">E-mail (public) </th> 
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
    <div class="doctors-table-list"></div>
  </div>

  <footer>
    <!--div>
      <img id="federal-laws-logos" class="logos" src="./assets/img/Federal_Laws_logos.PNG" alr="Federal Laws logos" />
    </div-->
    <span class="rights-text">© 2019 ESA Verification</span>
  </footer>

</body>
</html>