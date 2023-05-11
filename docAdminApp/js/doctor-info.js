(() => {
  const apiUrl = './sql';
 
	$('.main').html();
	
	function showSpinner() {
		if (!$('.loader').length) {
		    $('.main .doctors-info-section .row')
                .find('.wrapper')
                .append('<div class="loader"></div>');
		}
	}
	
	function hideSpinner() {
		$('div.loader').remove();
	}

	showSpinner();
	getData(`${apiUrl}/sql_v_doctors_www_01.php`)
		.then(data => {
			hideSpinner();
			$('.main .doctors-info-section .row').find('.wrapper').append(`
            <div class="header-block">
                <div class="header-block__container">
                    <h3 class="header-block__title">Doctor Info</h3>
                </div>
            </div>
        <br />
      `)

			const doctorData = data.find(el => el.id == selectedId);
			
			if (!$('#frmMain').length) {
				$('.main .doctors-info-section .row').find('.wrapper').append(`
				<div id="frmMain">
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
                        <div class="input-group input-group--checkbox">
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
                  <br />
                  <div class="text-center">
                    <button type="button" id="btnApply"  class="btn btn-primary btn-s disabled" disabled>Apply</button>
                    <button type="button" id="btnCancel" class="btn btn-primary btn-s disabled" disabled>Cancel</button>      
                  </div> 
                </div>`)
			}

			clickTable(doctorData);

			// fill US States dropdowns
      fillStates();
      
      $('#btnApply').on('click', clickApply);
      $('#btnCancel').on('click', clickCancel);

		})

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
    var url = './sql/sql_update_doc_01_sql.php';
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

	function fillStates() {       
		$.ajax({
			url:'./sql/sql_v_us_states_www_01.php',
			dataSrc: '',
			dataType: 'json',
			success: function( json ) {
				$('.us-states').empty();
				$.each(json, function(i, obj){
					$('.us-states').append($('<option>').text(obj.state_name).attr('value', obj.state_code));
				});
			}
		});
	};

	async function getData(url) {
		try {
      const res = await fetch(url);
      return await res.json();
      // !!!!!!!!!!!!!!!!!!!!!!!!
      // fetch vs. ajax - 2 main differences - might be the issue
      // $.ajax({
      //   url: url,
      //   //type:'GET',
      //   //data: 'q=' + param,
      //   dataSrc: '',
      //   dataType: 'json',
      //   success: function( json ) {
      //     return json; 
      //   }
      // });
      // !!!!!!!!!!!!!!!!!!!!!!!!
			
		} catch (err) {
			throw new Error(err);
		}
	}

})()