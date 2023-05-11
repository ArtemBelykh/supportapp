<?php
// Initialize the session
session_start();
 
// Check if the user is logged in, if not then redirect him to login page
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: login.php");
    exit;
};

require(dirname(__FILE__).'/../config/config.php');

// get docID -- f1858
$docID = 0;
if( isset($_GET["docID"]) ) { 
  $docID = mysqli_real_escape_string($link, $_GET['docID']); 
} else {
  header("location: doctors-list.php");
  exit;
};

// get fname
$fname = '';
if( isset($_GET["fname"]) ) { $fname = mysqli_real_escape_string($link, $_GET['fname']); };

// get lname
$lname = '';
if( isset($_GET["lname"]) ) { $lname = mysqli_real_escape_string($link, $_GET['lname']); };

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
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">  
  <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">

  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
  <script src="https://cdn.datatables.net/1.10.20/js/jquery.dataTables.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.17.1/moment-with-locales.min.js"></script>
  <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>

  <!--script src="./asset/doctors-list.js"></script-->

  <style>
    .highlight { /* dataTable row highlight style */
      background-color:#CFECEC !important;
    }  
  </style>

  <script>
    
    $(document).ready(function() {

      // *********            
      $('#lblName').html( "<h4> <b><?php echo $fname; ?> <?php echo $lname; ?>'s</b> Licenses:</h4>"  );      
      // *********

      // fill US States dropdowns
      fillStates();

      // get data for dataTable
      var table = $('#tblMain').DataTable( {
        //"processing": true,
        //"serverSide": true,
        ajax: { 
          url:"../sql/sql_v_licenses_www_01.php?docID=<?php echo $docID; ?>",
          dataSrc: ""//,
          //dataType: "json",                  
          //contentType: "application/json; charset=utf-8"
        } ,
        columns: [
          { data: "id" }, 
          { data: "doctors_id" ,      visible: false, searchable: false }, 
          { data: "op_id",    visible: false, searchable: false },
          { data: "titleFull" },
          { data: "titleShort" }, 
          { data: "licenseNum" },
          { data: "licenseState" },
          { data: "licenseWeight" },
          { data: "licenseStart",  render: function(data, type, row){ return moment(data).format('MM-DD-YYYY'); }},
          { data: "licenseExpiry", render: function(data, type, row){ return moment(data).format('MM-DD-YYYY'); }}                
        ],
        // now "click" the 1st row of #tblMain
        fnInitComplete: function(oSettings, json) { $('#tblMain tbody tr:eq(0)').click(); }
      } );
      
      // highlight row in dataTable onClick event
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

      //***** masks *****
      $('.datepicker').datepicker({ 
        dateFormat: 'mm-dd-yy',
        beforeShow: function (input) {
                    $(input).css({
                        "position": "relative",
                        "z-index": 999999
                    });
                },
        onClose: function () { $('.datepicker').css({ 'z-index': 0  } ); }
      });
    
      $('.integerInput').on('keyup onchange', function() {
        if( parseInt(this.value)>100 ){ this.value=100; return false; }
        if( parseInt(this.value)<0   ){ this.value=0;   return false; }
      });
      //***** end masks *****


    } );

    // ***********************************************************
    function clickTable( data ){

      var strEnableBtns = "$('#btnApply').removeClass('disabled').removeAttr('disabled','disabled');"
          strEnableBtns+= "$('#btnCancel').removeClass('disabled').removeAttr('disabled','disabled');"

      //id      
      $('#form_id'   ).val( data.id );  
      $('#form_docID').val( data.doctors_id );
      $('#form_op_id').val( data.op_id );

      //titleFull
      $('#form_titleFull').val( data.titleFull );    
      $('#form_titleFull').attr( 'prev', data.titleFull ); 
      $('#form_titleFull').attr( 'onChange', strEnableBtns );

      //titleShort
      $('#form_titleShort').val( data.titleShort );    
      $('#form_titleShort').attr( 'prev', data.titleShort ); 
      $('#form_titleShort').attr( 'onChange', strEnableBtns );

      //licNum
      $('#form_licNum').val( data.licenseNum );    
      $('#form_licNum').attr( 'prev', data.licenseNum ); 
      $('#form_licNum').attr( 'onChange', strEnableBtns );

      //licState
      $('#form_licState').val( data.licenseState );    
      $('#form_licState').attr( 'prev', data.licenseState ); 
      $('#form_licState').attr( 'onChange', strEnableBtns );
      
      //licStateWght
      $('#form_licStateWght').val( data.licenseWeight );    
      $('#form_licStateWght').attr( 'prev', data.licenseWeight ); 
      $('#form_licStateWght').attr( 'onChange', strEnableBtns );

      //licStart
      $('#form_licStart').val( moment( data.licenseStart ).format('MM-DD-YYYY') );    
      $('#form_licStart').attr( 'prev', moment( data.licenseStart ).format('MM-DD-YYYY') ); 
      $('#form_licStart').attr( 'onChange', strEnableBtns );

      //licExpry
      $('#form_licExpry').val( moment( data.licenseExpiry ).format('MM-DD-YYYY') );    
      $('#form_licExpry').attr( 'prev', moment( data.licenseExpiry ).format('MM-DD-YYYY') ); 
      $('#form_licExpry').attr( 'onChange', strEnableBtns );

      //test
      //$('#form_test').val( data.licStart );    
      //$('#form_test').attr( 'prev', data.licStart ); 
      //$('#form_test').attr( 'onChange', strEnableBtns );  

    };

    // ***********************************************************
    function addLicense(){
      
      var docID         = $('#form_docID'       ).val();

      var titleFull     = $('#mod01_titleFull'  ).val();
      var titleShort    = $('#mod01_titleShort' ).val();

      var licNum        = $('#mod01_licNum'     ).val();
      //var licState      = $('#mod01_licState'   ).val();
      var licState      = $('#mod01_licState'     ).find(":selected").val();  
      var licStateWght  = $('#mod01_licStateWght').val();      

      //var licStart      = $('#mod01_licStart'     ).datepicker('option', 'dateFormat', 'yy-mm-dd').val();   
      var arrStart     = $('#mod01_licStart').val().split('-'); // mm-dd-yyyy
      var licStart     = arrStart[2] + '-' +  arrStart[0] + '-' +  arrStart[1]; // yyyy-mm-dd -- MySQl

      //var licExpry      = $('#mod01_licExpry'     ).datepicker('option', 'dateFormat', 'yy-mm-dd').val();
      var arrExpry     = $('#mod01_licExpry').val().split('-'); // mm-dd-yyyy
      var licExpry     = arrExpry[2] + '-' +  arrExpry[0] + '-' +  arrExpry[1]; // yyyy-mm-dd -- MySQl

      // create XMLHttpRequest object
      const Http = new XMLHttpRequest();  

      // prepare URL with parameters
      var url = '../sql/sql_op_insert_license_01.php';
        url+= '?docID='         + docID;

        url+= '&titleFull='     + encodeURIComponent(titleFull);
        url+= '&titleShort='    + encodeURIComponent(titleShort);

        url+= '&licNum='        + encodeURIComponent(licNum);
        url+= '&licState='      + encodeURIComponent(licState);
        url+= '&licStateWght='  + encodeURIComponent(licStateWght);

        url+= '&licStart='      + encodeURIComponent(licStart);
        url+= '&licExpry='      + encodeURIComponent(licExpry);

      //alert( url );
      //$('#form_test'  ).val( url );return;

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

      // reset datepicker
      //$('.datepicker').datepicker('option', 'dateFormat', 'mm-dd-yy' );
    };

    // ***********************************************************
    function clickApply(){      

      var id            = $('#form_id'           ).val();
      //var docID         = $('#form_docID'        ).val();
      var op_id         = $('#form_op_id'        ).val();      
      
      var titleFull     = $('#form_titleFull'    ).val();
      var titleShort    = $('#form_titleShort'   ).val();

      var licNum        = $('#form_licNum'       ).val();      
      var licState      = $('#form_licState'     ).find(":selected").val();
      var licStateWght  = $('#form_licStateWght' ).val();
      
      //var licStart      = $('#form_licStart'     ).datepicker('option', 'dateFormat', 'yy-mm-dd').val();   
      var arrStart     = $('#form_licStart').val().split('-'); // mm-dd-yyyy
      var licStart     = arrStart[2] + '-' +  arrStart[0] + '-' +  arrStart[1]; // yyyy-mm-dd -- MySQl

      //var licExpry      = $('#form_licExpry'     ).datepicker('option', 'dateFormat', 'yy-mm-dd').val();
      var arrExpry     = $('#form_licExpry').val().split('-'); // mm-dd-yyyy
      var licExpry     = arrExpry[2] + '-' +  arrExpry[0] + '-' +  arrExpry[1]; // yyyy-mm-dd -- MySQl

      // create XMLHttpRequest object
      const Http = new XMLHttpRequest();  

      // prepare URL with parameters
      var url = '../sql/sql_op_update_license_01.php';
          url+= '?id='            + id;
          url+= '&op_id='         + op_id;

          url+= '&titleFull='     + encodeURIComponent(titleFull);
          url+= '&titleShort='    + encodeURIComponent(titleShort);

          url+= '&licNum='        + encodeURIComponent(licNum);
          url+= '&licState='      + encodeURIComponent(licState);
          url+= '&licStateWght='  + encodeURIComponent(licStateWght);

          url+= '&licStart='      + encodeURIComponent(licStart);
          url+= '&licExpry='      + encodeURIComponent(licExpry);

      //alert ( url );
      //return;

      Http.open( "GET", url );                
      Http.send();                    
      Http.onreadystatechange=(e)=>{     

        if ( Http.readyState == 4 && Http.status == 200 ){
          //alert( Http.responseText ); 
          var response = JSON.parse(Http.responseText);                       

          if ( !response ) {
            alert('Something is wrong..');                    
          } else { 
            //alert ('Succeeded! ->' + response );
            // redraw dataTable
            $('#tblMain').DataTable().ajax.reload();
          } // if                
        } // if                
      }

      // reset datepicker format
      //$('.datepicker').datepicker('option', 'dateFormat', 'mm-dd-yy' );

      // disable buttons
      $('#btnApply' ).addClass('disabled').attr('disabled','disabled');
      $('#btnCancel').addClass('disabled').attr('disabled','disabled');

    };

    // ***********************************************************
    function clickCancel(){     
      
      // reset values to previous 'prev' value
      $('#form_titleFull'   ).val(  $('#form_titleFull'   ).attr('prev') );    
      $('#form_titleShort'  ).val(  $('#form_titleShort'  ).attr('prev') );    

      $('#form_licNum'      ).val(  $('#form_licNum'      ).attr('prev') );          
      $('#form_licState'    ).val(  $('#form_licState'    ).attr('prev') );          
      $('#form_licStateWght').val(  $('#form_licStateWght').attr('prev') );          

      $('#form_licStart'    ).val(  $('#form_licStart'    ).attr('prev') );    
      $('#form_licExpry'    ).val(  $('#form_licExpry'    ).attr('prev') );    

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

  <title>Provider's Licenses</title>
</head>

<body id="doctors-list-page">

  <header class="doctors-list-header-base">
      <div class="logo-container">
        <div class="logo"></div>
        <span>Provider's Licenses</span>
      </div>
      <button id="sign-out-button" onclick="document.location.replace('logout.php');">Sign Out</button>
  </header>

  <br>  
  <div class="row">
    <div class="col-xs-2">      
      <button type="button" class="btn btn-primary btn-s" onclick="document.location.href = 'doctors-list.php'">
        <i class="glyphicon glyphicon-chevron-left btn-sm"></i> Providers
      </button>
    </div>
    <div class="col-xs-8 text-center">      
      <label class="" id="lblName"><h4>Provider's Licenses:</h4></label>
    </div> 
    <div class="col-xs-2"></div>
  </div>

  <br>  
  <div class="container">          
    <table id="tblMain" class="table table-condensed table-striped table-hover" cellpadding="7" cellspacing="0">
      <thead>
        <tr>
          <th>ID</th>
          <th attr="hide-data">docID</th>
          <th attr="hide-data">opID</th>                        
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
  
  <div class="text-center">
    <button type="button" id="btnAdd" class="btn btn-primary btn-s" data-toggle="modal" data-target="#modal01" >
      <i class="glyphicon glyphicon-plus"></i> Add License
    </button>          
  </div>

  <br>
  <div class="container" id="frmMain">
    <input id="form_id"    type="hidden" value="0">
    <input id="form_docID" type="hidden" value="<?php echo $docID; ?>">
    <input id="form_op_id" type="hidden" value="0">    

    <div class="row">        
      <div class="col-xs-4">        
          <label for="form_titleFull">Full Title</label>
          <input  id="form_titleFull" type="text" class="form-control input-sm">                  
      </div>              
      <div class="col-xs-4">        
          <div class="input-group">
            <label for="form_licNum">License #</label>
            <input  id="form_licNum" type="text" class="form-control input-sm">                  
          </div>
      </div>              
      <div class="col-xs-4">        
          <label for="form_licStart">Start Date</label>
          <!--input  id="form_licStart" type="text" placeholder="mm-dd-yyyy" autocomplete="rutjfkde" class="form-control input-sm"-->  
          <div class="input-group date" >                   
            <input  id="form_licStart" 
              class="form-control input-sm datepicker" 
              type="text"
              placeholder="mm-dd-yyyy"
              
              autocomplete="anyrndcrap"
              required>       
            <div class="input-group-addon">
              <span class="glyphicon glyphicon-th"></span>
            </div>
          </div>  
      </div>              

    </div>      

    <div class="row">    
      <div class="col-xs-4">        
          <label for="form_titleShort">Short Title</label>
          <input  id="form_titleShort" type="text" class="form-control input-sm">                  
      </div>    
      <div class="col-xs-4">        
          <label for="form_licState">License State</label>
          <select id="form_licState" class="form-control input-sm us-states"></select>
      </div>
      <div class="col-xs-4">        
          <label for="form_licExpry">Expiry Date</label>
          <!--input  id="form_licExpry" type="text" class="form-control input-sm"-->                  
          <div class="input-group date" >                   
            <input id="form_licExpry"
              class="form-control input-sm datepicker" 
              type="text" 
              placeholder="mm-dd-yyyy" 
              autocomplete="anyrndcrap" 
              data-date-format="mm-dd-yyyy"
              required>       
            <div class="input-group-addon">
              <span class="glyphicon glyphicon-th"></span>
            </div>
          </div>          
      </div>
    </div>  

    <div class="row">        
      <div class="col-xs-4"></div>

      <div class="col-xs-4">       
        <label for="form_licStateWght">License "Weight"</label>
        <input  id="form_licStateWght" type="number"  min="0" max="100" step="1"  class="form-control input-sm integerInput" required>
      </div>

      <div class="col-xs-4">
        <!--label for="form_test">Test Field</label>
        <input  id="form_test" type="text" class="form-control input-sm"-->   
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
          <h3 class="modal-title">Insert License data <span class="glyphicon glyphicon-pencil small"></span></h3>
        </div>
        
        <div class="modal-body">                       

          <div class="row">        
            <div class="col-xs-4">        
                <label for="mod01_titleFull">Full Title</label>
                <input  id="mod01_titleFull" type="text" class="form-control input-sm">                  
            </div>              
            <div class="col-xs-4">        
                <div class="input-group">
                  <label for="mod01_licNum">License #</label>
                  <input  id="mod01_licNum" type="text" class="form-control input-sm">                  
                </div>
            </div>              
            <div class="col-xs-4">        
                <label for="mod01_licStart">Start Date</label>
                <!--input  id="mod01_licStart" type="text" class="form-control input-sm"-->  
                <div class="input-group date" >                   
                  <input id="mod01_licStart"
                    class="form-control input-sm datepicker" 
                    type="text" 
                    placeholder="mm-dd-yyyy" 
                    autocomplete="anyrndcrap" 
                    data-date-format="mm-dd-yyyy"
                    required>
                  <div class="input-group-addon">
                    <span class="glyphicon glyphicon-th"></span>
                  </div>
                </div>      
            </div>              

          </div>      

          <div class="row">    
            <div class="col-xs-4">        
                <label for="mod01_titleShort">Short Title</label>
                <input  id="mod01_titleShort" type="text" class="form-control input-sm">                  
            </div>    
            <div class="col-xs-4">        
                <label for="mod01_licState">License State</label>
                <!--input  id="mod01_licState" type="text" class="form-control input-sm"-->           
                <select id="mod01_licState" class="form-control input-sm us-states"></select>       
            </div>
            <div class="col-xs-4">        
                <label for="mod01_licExpry">Expiry Date</label>
                <!--input  id="mod01_licExpry" type="text" class="form-control input-sm"-->
                <div class="input-group date" >                   
                  <input id="mod01_licExpry"
                    class="form-control input-sm datepicker" 
                    type="text" 
                    placeholder="mm-dd-yyyy" 
                    autocomplete="anyrndcrap" 
                    data-date-format="mm-dd-yyyy"
                    required>       
                  <div class="input-group-addon">
                    <span class="glyphicon glyphicon-th"></span>
                  </div>
                </div>      
            </div>
          </div>  

          <div class="row">        
            <div class="col-xs-4"></div>

            <div class="col-xs-4">       
                <label for="mod01_licStateWght">License "Weight"</label>
                <input  id="mod01_licStateWght" type="number"  min="0" max="100" step="1"  class="form-control input-sm integerInput" required>                  
            </div>      

            <div class="col-xs-4"></div>
          </div>  

        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal" onclick="addLicense();">Insert</button>
        </div>
        
      </div> <!-- Modal content-->            
    </div>
  </div><!-- Modal --> 

  <br>
  <footer>
    <!--div>
      <img id="federal-laws-logos" class="logos" src="./assets/img/Federal_Laws_logos.PNG" alr="Federal Laws logos" />
    </div-->
    <span  class="text-center rights-text">© 2019 ESA Verification</span>
  </footer>

</body>
</html>