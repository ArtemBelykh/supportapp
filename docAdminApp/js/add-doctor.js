(() => {
    showSpinner()
$('#container .main').html('');
    $('#tblMain').DataTable().destroy(true);
    
    function showSpinner() {
        if (!$('.loader').length) {
						$('.main .add-doctor-section .row')
						.find('.wrapper')
						.append('<div class="loader"></div>');
        }
    }
    
    function hideSpinner() {
        $('div.loader').remove();
    }


    $('.main .add-doctor-section .row').find('.wrapper').append(`
        <div>
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
								<label for="mod01_licState">State</label>
								<!-- <input  id="mod01_licState" type="text" class="form-control input-sm us-states"> -->
								<select id="mod01_licState" class="form-control input-sm us-states"></select>             
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
					<br />
					<button type="button" id="btnAdd" class="btn btn-primary btn-s" data-toggle="modal" data-target="#modal01" >
						<i class="glyphicon glyphicon-plus"></i> Add Doctor
					</button>
				</div>
		`);
		
		fillStates();
            
		hideSpinner();

		// // test data
		// $('#mod01_fname'        ).val('QWERTY NAME');
		// $('#mod01_mname'        ).val('QWERTY MNAME');
		// $('#mod01_lname'        ).val('QWERTY LNAME');

		// // $('#mod01_isActive'     ).is(":checked")?'1':'0'
		// $('#mod01_login'        ).val('ASDASDASD');
		// $('#mod01_psswd'        ).val(111111);

		// $('#mod01_address'      ).val('zczxczcx');
		// $('#mod01_city'         ).val('london');
		// $('#mod01_state'        ).val('AK');

		// $('#mod01_ZIP'          ).val('00000');  
		// $('#mod01_phoneSMS'     ).val('+1 800 12345678')
		// $('#mod01_phoneService' ).val('+1 800 12345678');

		// $('#mod01_phonePublic'  ).val('+1 800 12345678');
		// $('#mod01_emailService' ).val('qwe@qwe.com');
		// $('#mod01_emailPublic'  ).val('qwe@qwe.com');

		// $('#mod01_NPI'          ).val('ASDASD123321');
		// $('#mod01_titleFull'    ).val('MEDICAL DOCTOR');
		// $('#mod01_titleShort'   ).val('MD');
						
  
		$('#btnAdd').on('click', addProvider);

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
      var url = './sql/sql_insert_doc_01_sql.php';
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
		
		function fillStates() {       
			$.ajax({
				url:'./sql/sql_v_us_states_www_01.php',
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

})()