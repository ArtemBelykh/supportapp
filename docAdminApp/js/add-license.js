(() => {
		showSpinner()
    $('#container .main').html('');
		$('#tblMain').DataTable().destroy(true);
		
		function showSpinner() {
			if (!$('.loader').length) {
				$('.main .add-license-section .row')
				.find('.wrapper')
				.append('<div class="loader"></div>');
			}
		}
		
		function hideSpinner() {
			$('div.loader').remove();
		}


		$('.main .add-license-section .row').find('.wrapper').append(`
			<div>
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
						<div class="input-group date" >                   
							<input id="mod01_licStart" class="form-control input-sm datepicker" type="text" placeholder="mm-dd-yyyy" autocomplete="anyrndcrap" data-date-format="mm-dd-yyyy" required>
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
						<select id="mod01_licState" class="form-control input-sm us-states"></select>
				</div>
				<div class="col-xs-4">
						<label for="mod01_licExpry">Expiry Date</label>
						<div class="input-group date">
							<input id="mod01_licExpry" class="form-control input-sm datepicker" type="text" placeholder="mm-dd-yyyy" autocomplete="anyrndcrap" data-date-format="mm-dd-yyyy" required>
							<div class="input-group-addon">
								<span class="glyphicon glyphicon-th"></span>
							</div>
						</div>
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
						<label for="mod01_licStateWght">License "Weight"</label>
						<input  id="mod01_licStateWght" type="number"  min="0" max="100" step="1"  class="form-control input-sm integerInput" required>
				</div>
				<div class="col-xs-4"></div>
			</div>
			<br>
			<button type="button" id="btnAdd" class="btn btn-primary btn-s" data-toggle="modal" data-target="#modal01">
			<i class="glyphicon glyphicon-plus"></i> Add License</button>
		</div>`);
		fillStates()
				
		hideSpinner();

		$('#btnAdd').on('click', addLicense);

		function addLicense(){
      
			// var docID         = $('#form_docID'       ).val();
			var docID         = currDoctorId;
	
			var titleFull     = $('#mod01_titleFull'  ).val();
			var titleShort    = $('#mod01_titleShort' ).val();
			var isActive      = $('#form_isActive'     ).is(":checked")?'1':'0';
	
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
			var url = './sql/sql_insert_license_01_sql.php';
				url+= '?docID='         + docID;
	
				url+= '&titleFull='     + encodeURIComponent(titleFull);
				url+= '&titleShort='    + encodeURIComponent(titleShort);
				url+= '&isActive='      + isActive;
				
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
	
		$('.integerInput').on('keyup onchange', function() {
			if( parseInt(this.value)>100 ){ this.value=100; return false; }
			if( parseInt(this.value)<0   ){ this.value=0;   return false; }
		});

		function fillStates() {
			$.ajax({
				url:'./sql/sql_v_us_states_www_01.php',
				//type:'GET',
				//data: 'q=' + param,
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
})()