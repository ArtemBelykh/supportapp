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
    
    $(document).ready(function() {

      var table = $('#doctors-list-table').DataTable( {
        //"processing": true,
        //"serverSide": true,
        "ajax": { 
          "url":"../sql/sql_v_licenses_www_01.php",
          "dataSrc": ""//,
          //"dataType": "json",                  
          //"contentType": "application/json; charset=utf-8"
        } ,
        "columns": [
          { "data": "id" }, 
          { "data": "doc_id" ,      "visible": false, "searchable": false }, 
          { "data": "op_doc_id",    "visible": false, "searchable": false },
          { "data": "titleFull" },
          { "data": "titleShort" }, 
          { "data": "licNum" },
          { "data": "licState"},
          { "data": "licStateWght" },
          { "data": "licStart" },
          { "data": "licExpry"}                
        ]
      } );
      
      $('#doctors-list-table tbody').on('click', 'tr', function () {
        var data = table.row( this ).data();
        //alert( 'You clicked on '+data[0]+'\'s row' );
        alert( 'You clicked on #'+data.licNum+' in '+data.licState+' row' );
      } );

    } );
  </script>

  <title>Provider's Licenses</title>
</head>

<body id="doctors-list-page">

  <header class="doctors-list-header-base">
      <div class="logo-container">
        <div class="logo"></div>
        <span>Provider's Licenses</span>
      </div>
      <button id="sign-out-button">Sign Out</button>
  </header>

  <div id="doctors-list-page-main-content">
    <div class="table-wrapper">
      <table id="doctors-list-table" cellpadding="7" cellspacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th class="hide-data">docID</th>
            <th class="hide-data">opDocID</th>                        
            <th>Full Title</th>
            <th>Short Title</th>
            <th>License #</th>
            <th>License State</th>
            <th>License Weight</th>
            <th>Start Date</th>
            <th>Expiry Date</th>
          </tr>
        </thead>       
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