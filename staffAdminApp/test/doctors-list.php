<?php
// Initialize the session
session_start();
 
// Check if the user is logged in, if not then redirect him to login page
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: login.php");
    exit;
};
?>

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
      fillStates();

      var table = $('#tblMain').DataTable( {
        //"processing": true,
        //"serverSide": true,
        ajax: { 
          url:"../sql/sql_v_doctors_www_01.php",
          dataSrc: ""//,
          //"dataType": "json",                  
          //"contentType": "application/json; charset=utf-8"
        } ,
        columns: [
          { data: "id" }, 
          { data: "op_id",    "visible": false, "searchable": false },
          { data: "fname" }, 
          { data: "mname",    "visible": false, "searchable": false },
          { data: "lname" },
          { data: "isActive", "visible": false, "searchable": false }, 
          { data: "login" },
          { data: "psswd",    "visible": false, "searchable": false },          
          { data: "address",  "visible": false, "searchable": false },
          { data: "city" ,    "visible": false, "searchable": false },
          { data: "state",    "visible": false, "searchable": false },
          { data: "ZIP",      "visible": false, "searchable": false },
          { data: "phoneSMS" },                
          { data: "phoneService", "visible": false, "searchable": false  },
          { data: "phonePublic",  "visible": false, "searchable": false  },
          { data: "emailService", "visible": false, "searchable": false  },
          { data: "emailPublic",  "visible": false, "searchable": false  },
          { data: "NPI" },                
          { data: "titleFull",  "visible": false, "searchable": false  },
          { data: "titleShort",  "visible": false, "searchable": false  },
          { data: null }     
        ],
        columnDefs: [ {
            targets: -1,
            data: null,
            defaultContent: "<button><i class='glyphicon glyphicon-search sm'></i> Licenses</button>"
        } ],
        fnInitComplete: function(oSettings, json) { $('#tblMain tbody tr:eq(0)').click(); }
      } );
      
      $('#tblMain tbody').on('click', 'tr', function () {
        var data = table.row( this ).data();        
        var row  = this.rowIndex;    

        // highlight selection 
        var $row = $('#tblMain tr:eq(' + row + ')');            
        $row.addClass('highlight').siblings().removeClass('highlight');        
        $row[0].scrollIntoView({ behavior: 'smooth', block: 'center' }); // not in Safari
        
        // go on with the click event
        clickTable( data );
      } );

      $('#tblMain tbody').on( 'click', 'button', function () {
        var data = table.row( $(this).parents('tr') ).data();
        var href = 'licenses-list.php?docID='+data.id+'&fname='+data.fname+'&lname='+data.lname;
        document.location.href = href ;
        //alert( "Almost redirected to " + data.fname +" "+ data.lname + "'s Licenses"  );
      } );

    } );

    // ***********************************************************
    function clickTable( data ){

      var strEnableBtns = "$('#btnApply').removeClass('disabled').removeAttr('disabled','disabled');"
          strEnableBtns+= "$('#btnCancel').removeClass('disabled').removeAttr('disabled','disabled');"
      //id      
      $('#form_id').val( data.id );
      $('#form_op_id').val( data.op_id );

      //fname
      $('#form_fname').val( data.fname );    
      $('#form_fname').attr( 'prev', data.fname ); 
      $('#form_fname').attr( 'onChange', strEnableBtns );

      //mname
      $('#form_mname').val( data.mname );    
      $('#form_mname').attr( 'prev', data.mname ); 
      $('#form_mname').attr( 'onChange', strEnableBtns );

      //lname
      $('#form_lname').val( data.lname );    
      $('#form_lname').attr( 'prev', data.lname ); 
      $('#form_lname').attr( 'onChange', strEnableBtns );
      
      if ( data.isActive==0 ) {
        $('#form_isActive').prop( "checked", false );    
      } else {
        $('#form_isActive').prop( "checked", true );    
      };      
      $('#form_isActive').attr( 'prev', data.isActive ); 
      $('#form_isActive').attr( 'onChange', strEnableBtns );

      //login
      $('#form_login').val( data.login );    
      $('#form_login').attr( 'prev', data.login ); 
      $('#form_login').attr( 'onChange', strEnableBtns );

      //psswd
      $('#form_psswd').val( "*****" );    
      $('#form_psswd').attr( 'prev', data.psswd ); 
      $('#form_psswd').attr( 'onChange', strEnableBtns );
      
      //address
      $('#form_address').val( data.address );    
      $('#form_address').attr( 'prev', data.address ); 
      $('#form_address').attr( 'onChange', strEnableBtns );
      
      //city
      $('#form_city').val( data.city );    
      $('#form_city').attr( 'prev', data.city ); 
      $('#form_city').attr( 'onChange', strEnableBtns );
      
      //state
      $('#form_state').val( data.state );    
      $('#form_state').attr( 'prev', data.state ); 
      $('#form_state').attr( 'onChange', strEnableBtns );
      
      //ZIP
      $('#form_ZIP').val( data.ZIP );    
      $('#form_ZIP').attr( 'prev', data.ZIP ); 
      $('#form_ZIP').attr( 'onChange', strEnableBtns );
      
      //phoneSMS
      $('#form_phoneSMS').val( data.phoneSMS );    
      $('#form_phoneSMS').attr( 'prev', data.phoneSMS ); 
      $('#form_phoneSMS').attr( 'onChange', strEnableBtns );
      
      //phoneService
      $('#form_phoneService').val( data.phoneService );    
      $('#form_phoneService').attr( 'prev', data.phoneService ); 
      $('#form_phoneService').attr( 'onChange', strEnableBtns );
      
      //phonePublic
      $('#form_phonePublic').val( data.phonePublic );    
      $('#form_phonePublic').attr( 'prev', data.phonePublic ); 
      $('#form_phonePublic').attr( 'onChange', strEnableBtns );

      //emailService
      $('#form_emailService').val( data.emailService );    
      $('#form_emailService').attr( 'prev', data.emailService ); 
      $('#form_emailService').attr( 'onChange', strEnableBtns );

      //emailPublic
      $('#form_emailPublic').val( data.emailPublic );    
      $('#form_emailPublic').attr( 'prev', data.emailPublic ); 
      $('#form_emailPublic').attr( 'onChange', strEnableBtns );

      //NPI
      $('#form_NPI').val( data.NPI );    
      $('#form_NPI').attr( 'prev', data.NPI ); 
      $('#form_NPI').attr( 'onChange', strEnableBtns );      
      
      //titleFull
      $('#form_titleFull').val( data.titleFull );    
      $('#form_titleFull').attr( 'prev', data.titleFull ); 
      $('#form_titleFull').attr( 'onChange', strEnableBtns );      
      
      //titleShort
      $('#form_titleShort').val( data.titleShort );    
      $('#form_titleShort').attr( 'prev', data.titleShort ); 
      $('#form_titleShort').attr( 'onChange', strEnableBtns );      
    };

     // ***********************************************************
    function addProvider(){
      
      var fname         = $('#mod01_fname'        ).val();
      var mname         = $('#mod01_mname'        ).val();
      var lname         = $('#mod01_lname'        ).val();
      
      var isActive      = $('#mod01_isActive'     ).is(":checked")?'1':'0';
      var login         = $('#mod01_login'        ).val();
      var psswd         = $('#mod01_psswd'        ).val();      
      
      var address       = $('#mod01_address'      ).val();
      var city          = $('#mod01_city'         ).val();
      var state         = $('#mod01_state'        ).val();
      
      var zip           = $('#mod01_ZIP'          ).val();
      var phoneSMS      = $('#mod01_phoneSMS'     ).val();
      var phoneService  = $('#mod01_phoneService' ).val();      

      var phonePublic   = $('#mod01_phonePublic'  ).val();      
      var emailService  = $('#mod01_emailService' ).val();
      var emailPublic   = $('#mod01_emailPublic'  ).val();

      var npi           = $('#mod01_NPI'          ).val();
      var titleFull     = $('#mod01_titleFull'    ).val();
      var titleShort    = $('#mod01_titleShort'   ).val();
            
      //alert( 'isNaN(NPI) ' + isNaN(NPI) );
      //if ( !isNaN(NPI) ) { return; }

      // create XMLHttpRequest object
      const Http = new XMLHttpRequest();  
      
      // prepare URL with parameters
      var url = '../sql/sql_op_insert_doc_01.php';
      //var url = '../sql/sql_insert_doc_01.php';
          url+= '?fname='         + encodeURIComponent(fname);
          url+= '&mname='         + encodeURIComponent(mname);
          url+= '&lname='         + encodeURIComponent(lname);

          url+= '&isActive='      + isActive;
          url+= '&login='         + encodeURIComponent(login);
          url+= '&psswd='         + encodeURIComponent(psswd);

          url+= '&address='       + encodeURIComponent(address);
          url+= '&city='          + encodeURIComponent(city);
          url+= '&state='         + encodeURIComponent(state);
          url+= '&zip='           + encodeURIComponent(zip);

          url+= '&smsNum='        + encodeURIComponent(phoneSMS);
          url+= '&phoneService='  + encodeURIComponent(phoneService);
          url+= '&phonePublic='   + encodeURIComponent(phonePublic);

          url+= '&emailService='  + encodeURIComponent(emailService);
          url+= '&emailPublic='   + encodeURIComponent(emailPublic);

          url+= '&npi='           + encodeURIComponent(npi);
          url+= '&titleFull='     + encodeURIComponent(titleFull);
          url+= '&titleShort='    + encodeURIComponent(titleShort);
      
      // alert( url );
      Http.open( "GET", url );                
      Http.send();                    
      Http.onreadystatechange=(e)=>{

        if (Http.readyState == 4 && Http.status == 200){
          //alert( Http.responseText ); 
          var response = JSON.parse(Http.responseText);                       

          if (!response) {
            alert('Something is wrong..');                    
          } else { 
            //alert ('Succeeded! ->' + response )
            // redraw dataTable
            $('#tblMain').DataTable().ajax.reload( function (json) {
                $('#tblMain tbody tr:eq(0)').click();
            } );
          };   // if                
        };   // if                
      };
    };

    // ***********************************************************
    function clickApply(){
           
      var id            = $('#form_id'           ).val();
      var op_id         = $('#form_op_id'        ).val();

      var fname         = $('#form_fname'        ).val();
      var mname         = $('#form_mname'        ).val();
      var lname         = $('#form_lname'        ).val();
      
      var isActive      = $('#form_isActive'     ).is(":checked")?'1':'0';
      var login         = $('#form_login'        ).val();
      var psswd         = $('#form_psswd'        ).val();      
      
      var address       = $('#form_address'      ).val();
      var city          = $('#form_city'         ).val();
      var state         = $('#form_state'        ).val();
      
      var zip           = $('#form_ZIP'          ).val();
      var phoneSMS      = $('#form_phoneSMS'     ).val();
      var phoneService  = $('#form_phoneService' ).val();      

      var phonePublic   = $('#form_phonePublic'  ).val();                  
      var emailService  = $('#form_emailService' ).val();
      var emailPublic   = $('#form_emailPublic'  ).val();

      var npi           = $('#form_NPI'          ).val();
      var titleFull     = $('#form_titleFull'    ).val();
      var titleShort    = $('#form_titleShort'   ).val();
      
      // create XMLHttpRequest object
      const Http = new XMLHttpRequest();  
      
      // prepare URL with parameters
      var url = '../sql/sql_op_update_doc_01.php';
      //var url = '../sql/sql_update_doc_01.php';
          
          url+= '?id='            + id;
          url+= '&op_id='         + op_id;
          
          url+= '&fname='         + encodeURIComponent(fname);
          url+= '&mname='         + encodeURIComponent(mname);
          url+= '&lname='         + encodeURIComponent(lname);
          
          url+= '&isActive='      + isActive;
          url+= '&login='         + encodeURIComponent(login);
          url+= '&psswd='         + encodeURIComponent(psswd);
          
          url+= '&address='       + encodeURIComponent(address);
          url+= '&city='          + encodeURIComponent(city);
          url+= '&state='         + encodeURIComponent(state);
          url+= '&zip='           + encodeURIComponent(zip);
          
          url+= '&smsNum='        + encodeURIComponent(phoneSMS);
          url+= '&phoneService='  + encodeURIComponent(phoneService);
          url+= '&phonePublic='   + encodeURIComponent(phonePublic);
          
          url+= '&emailService='  + encodeURIComponent(emailService);
          url+= '&emailPublic='   + encodeURIComponent(emailPublic);
          
          url+= '&npi='           + encodeURIComponent(npi);
          url+= '&titleFull='     + encodeURIComponent(titleFull);
          url+= '&titleShort='    + encodeURIComponent(titleShort);
      
      //alert( url );

      Http.open( "GET", url );                
      Http.send();                    
      Http.onreadystatechange=(e)=>{     
      
        if (Http.readyState == 4 && Http.status == 200){
          //alert( Http.responseText ); 
          var response = JSON.parse(Http.responseText);                       

          if (!response) {
            alert('Something is wrong..');                    
          } else { 
            //alert ('Succeeded! ->' + response );

            // redraw dataTable
            $('#tblMain').DataTable().ajax.reload();
          };   // if                
        };   // if                          
      };

      // disable buttons
      $('#btnApply' ).addClass('disabled').attr('disabled','disabled');
      $('#btnCancel').addClass('disabled').attr('disabled','disabled');

    };

    // ***********************************************************
    function clickCancel(){
            
      // reset values to previous 'prev' value
      $('#form_fname').val(  $('#form_fname').attr( 'prev') );    
      $('#form_mname').val(  $('#form_mname').attr( 'prev') );    
      $('#form_lname').val(  $('#form_lname').attr( 'prev') );          
      
      if ( $('#form_isActive').attr( 'prev' )==0 ) {
        $('#form_isActive').prop( "checked", false );    
      } else {
        $('#form_isActive').prop( "checked", true );    
      };      

      $('#form_login'   ).val(  $('#form_login'   ).attr( 'prev') );          
      $('#form_psswd'   ).val(  '*****' );          
      
      $('#form_address' ).val(  $('#form_address' ).attr( 'prev') );    
      $('#form_city'    ).val(  $('#form_city'    ).attr( 'prev') );    
      $('#form_state'   ).val(  $('#form_state'   ).attr( 'prev') );   
      $('#form_ZIP'     ).val(  $('#form_ZIP'     ).attr( 'prev') );   
       
      $('#form_phoneSMS'    ).val(  $('#form_phoneSMS'    ).attr( 'prev') );   
      $('#form_phoneService').val(  $('#form_phoneService').attr( 'prev') );   
      $('#form_phonePublic' ).val(  $('#form_phonePublic' ).attr( 'prev') );   

      $('#form_emailService').val(  $('#form_emailService').attr( 'prev') );   
      $('#form_emailPublic' ).val(  $('#form_emailPublic' ).attr( 'prev') );   
      $('#form_NPI'         ).val(  $('#form_NPI'         ).attr( 'prev') );   

      $('#form_titleFull'   ).val(  $('#form_titleFull'   ).attr( 'prev') );   
      $('#form_titleShort'  ).val(  $('#form_titleShort'  ).attr( 'prev') );   
  
      // disable buttons
      $('#btnApply' ).addClass('disabled').attr('disabled','disabled');
      $('#btnCancel').addClass('disabled').attr('disabled','disabled');

    };

    // ***********************************************************
    function fillStates() {       
      $.ajax({
        url:'../sql/sql_v_us_states_www_01.php',
        //type:'GET',
        //data: 'q=' + param,
        dataSrc: '',
        dataType: 'json',
        success: function( json ) {
          //$('#form_licState').empty();
          $('.us-states').empty();
          $.each(json, function(i, obj){
            //$('#form_licState').append($('<option>').text(obj.state_name).attr('value', obj.state_code));
            $('.us-states').append($('<option>').text(obj.state_name).attr('value', obj.state_code));
          });
        }
      });
    };


  </script>

<title>Providers' Details</title>
</head>

<body class="doctors-list-page">

  <header class="doctors-list-header-base">
      <div class="logo-container">
        <div class="logo"></div>
        <span>Providers' Details</span>
      </div>
      <button id="sign-out-button" onclick="document.location.replace('logout.php');">Sign Out</button>
  </header>
  
  <br>
  <div class="container">          
    <table id="tblMain" class="table table-condensed table-striped table-hover" cellpadding="7" cellspacing="0">
      <thead>
        <tr>
          <th>ID</th>
          <th attr="hide-data">OP ID</th>
          <th>First Name</th>
          <th attr="hide-data">Middle Name</th>
          <th>Last Name</th>
          <th attr="hide-data">Is Active</th>
          <th attr="hide-data">Login</th>
          <th attr="hide-data">Password</th>
          <th attr="hide-data">Address</th>
          <th attr="hide-data">City</th>
          <th attr="us-list">State</th>
          <th attr="hide-data">ZIP</th>
          <th >SMS Number</th>            
          <th attr="hide-data">Phone (service)</th>
          <th attr="hide-data">Phone (public)</th>
          <th attr="hide-data">E-mail (service)</th> 
          <th attr="hide-data">E-mail (public) </th> 
          <th>NPI</th>
          <th attr="hide-data">Title Full </th> 
          <th attr="hide-data">Title Short </th> 
          <th></th>
        </tr>
      </thead>
    </table>
  </div>    
  
  <div class="text-center">
    <button type="button" id="btnAdd" class="btn btn-primary btn-s" data-toggle="modal" data-target="#modal01" >
      <i class="glyphicon glyphicon-plus"></i> Add Provider
    </button>          
  </div>

  <br>
  <div class="container" id="frmMain">
    <input id="form_id"    type="hidden" value="0" />
    <input id="form_op_id" type="hidden" value="0" />

    <div class="row">        
      <div class="col-xs-4">        
          <label for="form_fname">First name</label>
          <input  id="form_fname" type="text" class="form-control input-sm">                  
      </div>              
      <div class="col-xs-4">        
          <label for="form_mname">Middle name</label>
          <input  id="form_mname" type="text" class="form-control input-sm">                  
      </div>
      <div class="col-xs-4">        
          <label for="form_lname">Last name</label>
          <input  id="form_lname" type="text" class="form-control input-sm">                  
      </div>
    </div>      

    <div class="row">        
      <div class="col-xs-4">        
          <div class="input-group">
            <label for="form_isActive">Is active</label>
            <input  id="form_isActive" type="checkbox" class="form-control input-sm">                  
          </div>
      </div>              
      <div class="col-xs-4">        
          <label for="form_login">Login</label>
          <input  id="form_login" type="text" class="form-control input-sm">                  
      </div>
      <div class="col-xs-4">        
          <label for="form_psswd">Password</label>
          <input  id="form_psswd" type="text" class="form-control input-sm">                  
      </div>
    </div>  

    <div class="row">        
      <div class="col-xs-4">        
          <label for="form_address">Address</label>
          <input  id="form_address" type="text" class="form-control input-sm">                  
      </div>              
      <div class="col-xs-4">        
          <label for="form_city">City</label>
          <input  id="form_city" type="text" class="form-control input-sm">                  
      </div>
      <div class="col-xs-4">        
          <label for="form_state">State</label>
          <!--input  id="form_state" type="text" class="form-control input-sm"-->  
          <select id="form_state" class="form-control input-sm us-states"></select>                
      </div>
    </div>  

    <div class="row">        
      <div class="col-xs-4">        
          <label for="form_ZIP">ZIP</label>
          <input  id="form_ZIP" type="text" class="form-control input-sm">                  
      </div>              
      <div class="col-xs-4">        
          <label for="form_phoneSMS">SMS number</label>
          <input  id="form_phoneSMS" type="text" class="form-control input-sm">                  
      </div>
      <div class="col-xs-4">        
          <label for="form_phoneService">Phone (service)</label>
          <input  id="form_phoneService" type="text" class="form-control input-sm">                  
      </div>
    </div>  

    <div class="row">        
      <div class="col-xs-4">        
          <label for="form_phonePublic">Phone (public)</label>
          <input  id="form_phonePublic" type="text" class="form-control input-sm">                  
      </div>              
      <div class="col-xs-4">        
          <label for="form_emailService">E-mail (service)</label>
          <input  id="form_emailService" type="text" class="form-control input-sm">                  
      </div>
      <div class="col-xs-4">        
          <label for="form_emailPublic">E-mail (public)</label>
          <input  id="form_emailPublic" type="text" class="form-control input-sm">                  
      </div>
    </div>  

    <div class="row">        
      <div class="col-xs-4">        
          <label for="form_NPI">NPI</label>
          <input  id="form_NPI" type="text" class="form-control input-sm">                  
      </div>              
      <div class="col-xs-4">        
          <label for="form_titleFull">Title Full</label>
          <input  id="form_titleFull" type="text" class="form-control input-sm">                  
      </div>              
      <div class="col-xs-4">        
          <label for="form_titleShort">Title Short</label>
          <input  id="form_titleShort" type="text" class="form-control input-sm">                  
      </div>              
    </div>  
  </div> 
  
  <br>
  <div class="text-center">
    <button type="button" id="btnApply"  class="btn btn-primary btn-s disabled" onclick="clickApply();" >Apply</button>
    <button type="button" id="btnCancel" class="btn btn-primary btn-s disabled" onclick="clickCancel();">Cancel</button>      
  </div>
  
  <!-- Modal01 -->
  <div id="modal01" class="modal fade" role="dialog">
    <div class="modal-dialog">        
      <!-- Modal01 content-->
      <div class="modal-content">
      
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal">&times;</button>
          <h3 class="modal-title">Insert Provider data <span class="glyphicon glyphicon-pencil small"></span></h3>
        </div>
        
        <div class="modal-body">                       

          <div class="row">        
            <div class="col-xs-4">        
                <label for="mod01_fname">First name</label>
                <input  id="mod01_fname" type="text" class="form-control input-sm">                  
            </div>              
            <div class="col-xs-4">        
                <label for="mod01_mname">Middle name</label>
                <input  id="mod01_mname" type="text" class="form-control input-sm">                  
            </div>
            <div class="col-xs-4">        
                <label for="mod01_lname">Last name</label>
                <input  id="mod01_lname" type="text" class="form-control input-sm">                  
            </div>
          </div>      

          <div class="row">        
            <div class="col-xs-4">        
                <div class="input-group">
                  <label for="mod01_isActive">Is active</label>
                  <input  id="mod01_isActive" type="checkbox" class="form-control pull-left input-sm">                  
                </div>
            </div>              
            <div class="col-xs-4">        
                <label for="mod01_login">Login</label>
                <input  id="mod01_login" type="text" class="form-control input-sm">                  
            </div>
            <div class="col-xs-4">        
                <label for="mod01_psswd">Password</label>
                <input  id="mod01_psswd" type="text" class="form-control input-sm">                  
            </div>
          </div>  

          <div class="row">        
            <div class="col-xs-4">        
                <label for="mod01_address">Address</label>
                <input  id="mod01_address" type="text" class="form-control input-sm">                  
            </div>              
            <div class="col-xs-4">        
                <label for="mod01_city">City</label>
                <input  id="mod01_city" type="text" class="form-control input-sm">                  
            </div>
            <div class="col-xs-4">        
                <label for="mod01_state">State</label>
                <input  id="mod01_state" type="text" class="form-control input-sm">                  
            </div>
          </div>  

          <div class="row">        
            <div class="col-xs-4">        
                <label for="mod01_ZIP">ZIP</label>
                <input  id="mod01_ZIP" type="text" class="form-control input-sm">                  
            </div>              
            <div class="col-xs-4">        
                <label for="mod01_phoneSMS">SMS number</label>
                <input  id="mod01_phoneSMS" type="text" class="form-control input-sm">                  
            </div>
            <div class="col-xs-4">        
                <label for="mod01_phoneService">Phone (service)</label>
                <input  id="mod01_phoneService" type="text" class="form-control input-sm">                  
            </div>
          </div>  

          <div class="row">        
            <div class="col-xs-4">        
                <label for="mod01_phonePublic">Phone (public)</label>
                <input  id="mod01_phonePublic" type="text" class="form-control input-sm">                  
            </div>              
            <div class="col-xs-4">        
                <label for="mod01_emailService">E-mail (service)</label>
                <input  id="mod01_emailService" type="text" class="form-control input-sm">                  
            </div>
            <div class="col-xs-4">        
                <label for="mod01_emailPublic">E-mail (public)</label>
                <input  id="mod01_emailPublic" type="text" class="form-control input-sm">                  
            </div>
          </div>

          <div class="row">             
            <div class="col-xs-4">        
                <label for="mod01_NPI">NPI*</label>
                <input  id="mod01_NPI" type="text" class="form-control input-sm">                  
            </div>
            <div class="col-xs-4">        
                <label for="mod01_titleFull">Title Full</label>
                <input  id="mod01_titleFull" type="text" class="form-control input-sm">                  
            </div>
            <div class="col-xs-4">        
                <label for="mod01_titleShort">Title Short</label>
                <input  id="mod01_titleShort" type="text" class="form-control input-sm">                  
            </div>
          </div>  

        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal" onclick="addProvider();">Insert</button>
        </div>
        
      </div> <!-- Modal content-->            
    </div>
  </div><!-- Modal --> 

  <br>
  <footer>
    <div>
      <!--img id="federal-laws-logos" class="logos" src="./assets/img/Federal_Laws_logos.PNG" alr="Federal Laws logos" /-->    
      <span class="text-center rights-text">© 2019 ESA Verification</span>
    </div>
  </footer>

</body>
</html>
