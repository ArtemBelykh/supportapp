
<!DOCTYPE html>
<html lang="en">
 <head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

  <link rel="stylesheet" href="https://cdn.datatables.net/1.10.20/css/jquery.dataTables.min.css" />

  <link rel="shortcut icon" href="./assets/img/favicon.png">
  <link rel="stylesheet" type="text/css" href="./assets/css/styles.css">
  <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css">

  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" />
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">  

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
  <script src="https://cdn.datatables.net/1.10.20/js/jquery.dataTables.min.js"></script>
  <!--script src="./asset/doctors-list.js"></script-->
  
  <style>
    .highlight { /* dataTable row highlight style */
      background-color:#CFECEC !important;
    }  
  </style>

  <script>

    $(document).ready(function() {

      // fill US States dropdowns
      //fillStates();

      var table = $('#tblMain').DataTable( {
        //"processing": true,
        //"serverSide": true,
        ajax: { 
          url:"./sql/sql_customer_search.php",
          dataSrc: ""//,
          //"dataType": "json",                  
          //"contentType": "application/json; charset=utf-8"
        } ,
        // {"contact_id":"26894","firstname":"Susie","lastname":"Reilly","birthday":null,"email":"susie.reilly77@gmail.com","gender":"0","is_over_18":"1","phone":"+19493750710"}
        columns: [
          { data: "contact_id" }, 
          { data: "firstname" }, 
          { data: "lastname" }, 
          { data: "birthday",    "visible": false, "searchable": false },
          { data: "email" }, 
          { data: "gender",    "visible": false, "searchable": false },          
          { data: "is_over_18", "visible": false, "searchable": false }, 
          { data: "phone" },
          // { data: "psswd",    "visible": false, "searchable": false },          
          // { data: "address",  "visible": false, "searchable": false },
          // { data: "city" ,    "visible": false, "searchable": false },
          // { data: "state",    "visible": false, "searchable": false },
          // { data: "ZIP",      "visible": false, "searchable": false },
          // { data: "phoneSMS" },                
          // { data: "phoneService", "visible": false, "searchable": false  },
          // { data: "phonePublic",  "visible": false, "searchable": false  },
          // { data: "emailService", "visible": false, "searchable": false  },
          // { data: "emailPublic",  "visible": false, "searchable": false  },
          // { data: "NPI" },                
          // { data: "titleFull",  "visible": false, "searchable": false  },
          // { data: "titleShort",  "visible": false, "searchable": false  },
          { data: null }     
        ],
        columnDefs: [ {
            targets: -1,
            data: null,
            defaultContent: "<button><i class='glyphicon glyphicon-search sm'></i> SearchMe</button>"
        } ]
        //fnInitComplete: function(oSettings, json) { $('#tblMain tbody tr:eq(0)').click(); }
      } );
      
      // $('#tblMain tbody').on('click', 'tr', function () {
      //   var data = table.row( this ).data();        
      //   var row  = this.rowIndex;    

      //   // highlight selection 
      //   var $row = $('#tblMain tr:eq(' + row + ')');            
      //   $row.addClass('highlight').siblings().removeClass('highlight');        
      //   $row[0].scrollIntoView({ behavior: 'smooth', block: 'center' }); // not in Safari
        
      //   // go on with the click event
      //   clickTable( data );
      // } );

      // $('#tblMain tbody').on( 'click', 'button', function () {
      //   var data = table.row( $(this).parents('tr') ).data();
      //   var href = 'licenses-list.php?docID='+data.id+'&fname='+data.fname+'&lname='+data.lname;
      //   document.location.href = href ;
      //   //alert( "Almost redirected to " + data.fname +" "+ data.lname + "'s Licenses"  );
      // } );
    } );

  </script>

<title>Test Details</title>
</head>

<body class="doctors-list-page">

  <header class="doctors-list-header-base">
      <div class="logo-container">
        <div class="logo"></div>
        <span>Providers' Details</span>
      </div>      
  </header>
  
  <br>
  <div class="container">          
    <table id="tblMain" class="table table-condensed table-striped table-hover" cellpadding="7" cellspacing="0">
      <thead>
        <tr>
          <th>Contact ID</th>          
          <th>First Name</th>          
          <th>Last Name</th>
          <th attr="hide-data">Bithday</th>
          <th>Email</th>
          <th attr="hide-data">Gender</th>          
          <th attr="hide-data">Is Over 18</th>
          <th>Phone</th>                       
          <th></th>
        </tr>
      </thead>
    </table>
  </div>    
</body>
