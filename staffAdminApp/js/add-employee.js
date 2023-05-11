(() => {
    showSpinner()
$('#container .main').html('');
    $('#tblMain').DataTable().destroy(true);
    
    function showSpinner() {
        if (!$('.loader').length) {
            $('.main').append('<div class="loader"></div>');
        }
    }
    
    function hideSpinner() {
        $('div.loader').remove();
    }


    $('.main').append(`
        <div>
					<div class="row">        
						<div class="col-xs-4">        
								<label for="mod01_fname">First Name</label>
								<input  id="mod01_fname" type="text" class="form-control input-sm">                  
						</div>              
						<div class="col-xs-4">        
								<label for="mod01_lname">Last Name</label>
								<input  id="mod01_lname" type="text" class="form-control input-sm">                  
						</div>
						<div class="col-xs-4">        
							<label for="mod01_birthDay">Birthday</label>
							<!--input  id="mod01_licStart" type="text" class="form-control input-sm"-->  
							<div class="input-group date">                   
								<input id="mod01_birthDay"
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
									<label for="mod01_isActive">Is Active</label>
									<input  id="mod01_isActive" type="checkbox" class="form-control pull-left input-sm" checked>                  
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
							<label for="mod01_managerID">Select Manager</label>
							<!--input  id="mod01_licState" type="text" class="form-control input-sm"-->           
							<select id="mod01_managerID" class="form-control input-sm manager-id"></select>       
						</div>
						<div class="col-xs-4">        
							<label for="mod01_depID">Select Department</label>
							<!--input  id="mod01_licState" type="text" class="form-control input-sm"-->           
							<select id="mod01_depID" class="form-control input-sm dep-id"></select>       
						</div>
					</div>

					<div class="row">                     
						<div class="col-xs-4">        
								<label for="mod01_email">Email</label>
								<input  id="mod01_email" type="email" class="form-control input-sm">                  
						</div>
						<div class="col-xs-4">        
								<label for="mod01_phone">Phone</label>
								<input  id="mod01_phone" type="tel" class="form-control input-sm">                  
						</div>
						<!-- <div class="col-xs-4">        
								<label for="mod01_depName">Department Name</label>
								<input  id="mod01_depName" type="text" class="form-control input-sm">                  
						</div> -->
					</div>  
					<br />
					<button type="button" id="btnAdd" class="btn btn-primary btn-s" data-toggle="modal" data-target="#modal01" >
						<i class="glyphicon glyphicon-plus"></i> Add Employee
					</button>
				</div>
		`);
		
		fillDepartments();
		fillManagers();

		$('input[type=tel]').mask('(999) 999-9999');
           
		hideSpinner();

		// // test data
		// $('#mod01_fname').val('QWERTY NAME');
		// $('#mod01_lname').val('QWERTY LNAME');
		// $('#mod01_birthDay').val('12-01-2020');

		// $('#mod01_managerID').val(1);
		// $('#mod01_managerID'     ).find(":selected").val('');
		// $('#mod01_mod01_mfname').val('Test Name');
		// $('#mod01_mod01_mlname').val('Test LastName');

		// // $('#mod01_isActive'     ).is(":checked")?'1':'0'
		// $('#mod01_login').val('login');
		// $('#mod01_psswd').val('password')

		// $('#mod01_email').val('test@test.com')
		// $('#mod01_phone').val('+1800 1234567');
						
  
		$('#btnAdd').on('click', addEmployee);
		// // trigger phone mask
		$('input[type=tel]').trigger('input') 

		function addEmployee(){

			// test data
			const fname = $('#mod01_fname').val();
			const lname = $('#mod01_lname').val();
			const [mm, dd, yyyy] = $('#mod01_birthDay').val().split('-');

			const isActive      = $('#mod01_isActive'     ).is(":checked")?'1':'0';
			const login = $('#mod01_login').val();
			const psswd = $('#mod01_psswd').val();

			const managerId = $('#mod01_managerID').val();
			const departmentId = $('#mod01_depID').val();
			// $('#mod01_isActive'     ).is(":checked")?'1':'0'

			const email = $('#mod01_email').val();
			const phone = $('#mod01_phone').val();
      				
      //alert( 'isNaN(NPI) ' + isNaN(NPI) );
      //if ( !isNaN(NPI) ) { return; }

      // create XMLHttpRequest object
      const Http = new XMLHttpRequest();  
      
      // prepare URL with parameters
      var url = './sql/sql_insert_employee_01.php';
			//var url = '../sql/sql_insert_doc_01.php';
					// url+= '?empID='         + empID;

				url+= '?fname='         + encodeURIComponent(fname);
				url+= '&lname='         + encodeURIComponent(lname);
				url+= '&bday='         + encodeURIComponent(`${yyyy}-${mm}-${dd}`);

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
            // $('#tblMain').DataTable().ajax.reload( function (json) {
            //     $('#tblMain tbody tr:eq(0)').click();
						// } );
						// console.log('response', response)
						document.location.href = `employee-details.php?docID=${response[0].result}`;
          };   // if                
        };   // if                
      };
		};
		
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
		
		function fillDepartments() {       
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
				}
			});
		};

		function fillManagers() {       
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