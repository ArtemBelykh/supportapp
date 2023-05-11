(() => {
  const apiUrl = './sql'
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  // const searchParams = new URLSearchParams(location.search);
  //const docId = searchParams.get('docID');
  if ( currDoctorId==0 ){
    const searchParams = new URLSearchParams(location.search);
    const docId = searchParams.get('docID');  
  }
  const docId = currDoctorId;
  // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  
	$('.main').html();
	
	function showSpinner() {
		if (!$('.loader').length) {
			$('.main').append('<div class="loader"></div>');
		}
	}
	
	function hideSpinner() {
		$('div.loader').remove();
	}

	showSpinner();
	getData(`${apiUrl}/sql_get_employee_by_id.php?id=${docId}`)
		.then(data => {
      console.log('data', data)
			hideSpinner();
			$('.main').append(`
				<div class="header-block header-block--wider">
					<div class="header-block__container">
						<h3 class="header-block__title">Employee Info</h3>
					</div>
				</div>
      `);
      // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      // console.log('docId', docId);
      // console.log('data', data);
      // !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
			// const doctorData = data.find(el => el.employee_id == docId);
			// console.log('doctorData', doctorData);
			
			if (!$('#frmMain').length) {
				$('.main').append(`
				<div id="frmMain">
          <input id="form_id"    type="hidden" value="0" />
          <input id="form_op_id" type="hidden" value="0" />
    
          <div class="row">        
            <div class="col-xs-4">        
                <label for="form_fname">First name</label>
                <input  id="form_fname" type="text" class="form-control input-sm">                  
            </div>              
            <div class="col-xs-4">        
                <label for="form_lname">Last name</label>
                <input  id="form_lname" type="text" class="form-control input-sm">                  
            </div>
            <div class="col-xs-4">        
              <label for="form_birthDay">Birthday</label>
              <!--input  id="mod01_licStart" type="text" class="form-control input-sm"-->  
              <div class="input-group date">                   
                <input id="form_birthDay"
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
                <div class="input-group input-group--checkbox">
                  <label for="form_isActive">Is Active</label>
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
							<label for="form_managerID">Select Manager</label>
							<!--input  id="form_licState" type="text" class="form-control input-sm"-->           
							<select id="form_managerID" class="form-control input-sm manager-id"></select>       
						</div>
						<div class="col-xs-4">        
							<label for="form_depID">Select Department</label>
							<!--input  id="form_licState" type="text" class="form-control input-sm"-->           
							<select id="form_depID" class="form-control input-sm dep-id"></select>       
						</div>
          </div> 

          <div class="row">                     
						<div class="col-xs-4">        
								<label for="form_email">Email</label>
								<input  id="form_email" type="email" class="form-control input-sm">                  
						</div>
						<div class="col-xs-4">        
								<label for="form_phone">Phone</label>
								<input  id="form_phone" type="tel" class="form-control input-sm">                  
						</div>
						<!-- <div class="col-xs-4">        
								<label for="form_depName">Department Name</label>
								<input  id="form_depName" type="text" class="form-control input-sm">                  
						</div> -->
					</div>  
          
       
          <br />
          <div class="text-center">
            <button type="button" id="btnApply"  class="btn btn-primary btn-s disabled" disabled>Apply</button>
            <button type="button" id="btnCancel" class="btn btn-primary btn-s disabled" disabled>Cancel</button>      
          </div> 
        </div>`)
      };

      

      $('.datepicker').datepicker({ 
        dateFormat: 'mm-dd-yy',
        beforeShow: function (input) {
          $(input).css({
              "position": "relative",
              "z-index": 999999
          });
        },
        onClose: function () { 
          $('.datepicker').css({ 'z-index': 0  } ); 
        }
      });

      fillDepartments(() => clickTable(data[0]));
      fillManagers();
      
      
      $('#btnApply').on('click', clickApply);
      $('#btnCancel').on('click', clickCancel);

      $('input[type=tel]').mask('(999) 999-9999');

		})

	function clickTable( data ){
      console.log('clickTable', data);
      var strEnableBtns = "$('#btnApply').removeClass('disabled').removeAttr('disabled','disabled');"
          strEnableBtns+= "$('#btnCancel').removeClass('disabled').removeAttr('disabled','disabled');"
      //id      
      $('#form_id').val( data.id );
      $('#form_op_id').val( data.op_id );

      //fname
      $('#form_fname').val( data.fname );    
      $('#form_fname').attr( 'prev', data.fname ); 
      $('#form_fname').attr( 'onChange', strEnableBtns );

      //lname
      $('#form_lname').val( data.lname );    
      $('#form_lname').attr( 'prev', data.lname ); 
      $('#form_lname').attr( 'onChange', strEnableBtns );

      //bday
      const [yyyy, mm, dd] = data.bday.split('-');
      $('.datepicker').datepicker('setDate', `${mm}-${dd}-${yyyy}`);
      $('#form_birthDay').attr( 'prev', `${mm}-${dd}-${yyyy}` ); 
      $('#form_birthDay').attr( 'onChange', strEnableBtns );

      if ( data.is_active==0 ) {
        $('#form_isActive').prop( "checked", false );    
      } else {
        $('#form_isActive').prop( "checked", true );    
      };      
      $('#form_isActive').attr( 'prev', data.is_active ); 
      $('#form_isActive').attr( 'onChange', strEnableBtns );

      //login
      $('#form_login').val( data.login );    
      $('#form_login').attr( 'prev', data.login ); 
      $('#form_login').attr( 'onChange', strEnableBtns );

      //psswd
      $('#form_psswd').val( "*****" );    
      $('#form_psswd').attr( 'prev', data.psswd ); 
      $('#form_psswd').attr( 'onChange', strEnableBtns );

      //manager id
      $('#form_managerID').val(data.manager_id)
      $('#form_managerID').attr( 'prev', data.manager_id ); 
      $('#form_managerID').attr( 'onChange', strEnableBtns );

      //department id
      $('#form_depID').val(data.department_id );
      $('#form_depID').attr( 'prev', data.department_id );
      $('#form_depID').attr( 'onChange', strEnableBtns );
      
      //phone
      $('#form_phone').val( data.phone );
      // $('#form_phone').attr( 'curr', data.phone );   
      $('#form_phone').attr( 'prev', data.phone ); 
      $('#form_phone').attr( 'onChange', strEnableBtns );

      //email
      $('#form_email').val( data.email );    
      $('#form_email').attr( 'prev', data.email ); 
      $('#form_email').attr( 'onChange', strEnableBtns );

      const field = $('#form_psswd');
      const hiddenChar = '*';
      const timeout = 500;
      const letters = new Array();
      field.keypress(function(e){
          setTimeout(hideLetter, timeout);
          letters.push(String.fromCharCode(e.which));
      });
      function hideLetter() {
          field.val(field.val().replace(/[^\*]/, hiddenChar));
      }

      $('input[type=tel]').trigger('input');

  };

  
  
  function clickApply(){
           
    const fname = $('#form_fname').val();
			const lname = $('#form_lname').val();
			const [mm, dd, yyyy] = $('#form_birthDay').val().split('-');

			const isActive      = $('#form_isActive').is(":checked")?'1':'0';
			const login = $('#form_login').val();
			const psswd = $('#form_psswd').val();

			const managerId = $('#form_managerID').val();
			const departmentId = $('#form_depID').val();
			// $('#form_isActive'     ).is(":checked")?'1':'0'

			const email = $('#form_email').val();
			const phone = $('#form_phone').val().replace(/\D/g, '');
    
    // create XMLHttpRequest object
    const Http = new XMLHttpRequest();  
    
    // prepare URL with parameters
    var url = './sql/sql_update_employee_01.php';
    //var url = '../sql/sql_update_doc_01.php';
    url+='?id='             + encodeURIComponent(currDoctorId);
    url+= '&fname='         + encodeURIComponent(fname);
    url+= '&lname='         + encodeURIComponent(lname);
    url+= '&bday='          + encodeURIComponent(`${yyyy}-${mm}-${dd}`);

    url+= '&is_active='      + isActive;
    url+= '&login='      + encodeURIComponent(login);
    url+= '&psswd='      + encodeURIComponent(psswd);
    if (departmentId) {
      url+= '&id_department='      + encodeURIComponent(departmentId);
    }
    if (managerId) {
      url+= '&id_manager='       + encodeURIComponent(managerId);
    }

    url+= '&email='           + encodeURIComponent(email);
    url+= '&phone='     + encodeURIComponent(phone);
    
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
    $('#form_lname').val(  $('#form_lname').attr( 'prev') );     
    
    $('.datepicker').datepicker('setDate', $('.datepicker').attr('prev'));
    
    if ( $('#form_isActive').attr( 'prev' )==0 ) {
      $('#form_isActive').prop( "checked", false );    
    } else {
      $('#form_isActive').prop( "checked", true );    
    };      

    $('#form_login'   ).val(  $('#form_login'   ).attr( 'prev') );          
    $('#form_psswd'   ).val(  '*****' );          
     
    $('#form_managerID'    ).val(  $('#form_managerID'    ).attr( 'prev') ); 
    $('#form_depID'    ).val(  $('#form_depID'    ).attr( 'prev') ); 
    $('#form_phone'    ).val(  $('#form_phone'    ).attr( 'prev') );   
    $('#form_email'    ).val(  $('#form_email'    ).attr( 'prev') );
    // disable buttons
    $('#btnApply' ).addClass('disabled').attr('disabled','disabled');
    $('#btnCancel').addClass('disabled').attr('disabled','disabled');

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

  
  
  function fillDepartments(cb) {       
    $.ajax({
      url:'./sql/sql_v_departments_01.php',
      //type:'GET',
      //data: 'q=' + param,
      dataSrc: '',
      dataType: 'json',
      success: function( json ) {
        //$('#form_licState').empty();
        $('.dep-id').empty();        
        $.each(json, function(i, obj){
          //$('#form_licState').append($('<option>').text(obj.state_name).attr('value', obj.state_code));
          $('.dep-id').append($('<option>').text(obj.text).attr('value', obj.id));
        });
        cb();
      }
    });
  };

  function fillManagers(currManagerId) {       
    $.ajax({
      url:`./sql/sql_get_managers_by_employee_id.php?id=${currDoctorId}`,
      //type:'GET',
      //data: 'q=' + param,
      dataSrc: '',
      dataType: 'json',
      success: function( json ) {
        //$('#form_licState').empty();
        $('.manager-id').empty();
        
        $.each(json, function(i, obj){
          //$('#form_licState').append($('<option>').text(obj.state_name).attr('value', obj.state_code));
          $('.manager-id').append($('<option>').text(`${obj.fname} ${obj.lname}`).attr('value', obj.id));
        });
      }
    });
  };

})()