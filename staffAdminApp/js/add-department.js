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
						<label for="mod01_depID">Select Parent Department</label>
						<!--input  id="mod01_licState" type="text" class="form-control input-sm"-->           
						<select id="mod01_depID" class="form-control input-sm dep-id"></select>       
					</div>            
					<div class="col-xs-4">        
						<label for="mod01_descFull">New Department Name</label>
						<input  id="mod01_descFull" type="text" class="form-control input-sm">                  
					</div>                               
				</div>      
				<br />
				<button type="button" id="btnAdd" class="btn btn-primary btn-s" data-toggle="modal" data-target="#modal01" >
					<i class="glyphicon glyphicon-plus"></i> Add Department
				</button>  
			</div>`);

		fillDepartments();

		hideSpinner();

		$('#btnAdd').on('click', addDepartment);

		function addDepartment(){
      
			// var docID         = $('#form_docID'       ).val();
			// var docID         = currDoctorId;
	
			var descFull     = $('#mod01_descFull'  ).val();
		
			var parentDepID  = $('#mod01_depID').val();     
			
			if (!descFull.trim()) {
				$('#mod01_descFull').addClass('error');
				$('#mod01_descFull').focus(() => {
					$('#mod01_descFull').removeClass('error');
				})
				return
			}
	
			// create XMLHttpRequest object
			const Http = new XMLHttpRequest();  
	
			// prepare URL with parameters
			var url = './sql/sql_insert_department_01.php';
				
				url+= '?name='     + encodeURIComponent(descFull);

				url+= '&parent_id='  + encodeURIComponent(parentDepID);
	
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
						// location.reload();
						document.location.href = `departments.php?docID=${currDoctorId}`;  
					};   // if                
				};   // if                          
			};
	
			// reset datepicker
			//$('.datepicker').datepicker('option', 'dateFormat', 'mm-dd-yy' );
		};


		$('.integerInput').on('keyup onchange', function() {
			if( parseInt(this.value)>100 ){ this.value=100; return false; }
			if( parseInt(this.value)<0   ){ this.value=0;   return false; }
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

})()