(() => {
	$('.main').html();

	function showSpinner() {
		if (!$('.loader').length) {
			$('.main .licenses-list-section .row')
			.find('.wrapper')
			.append('<div class="loader"></div>');
		}
	}
	
	function hideSpinner() {
		$('div.loader').remove();
	}

	const apiUrl = './sql'
	// const searchParams = new URLSearchParams(location.search);
	// const docId = searchParams.get('docID');

	let table;

	const validTHeaders = [
		'ID', '', '', 'Full Title', 'Short Title', 'License #', 'License State', 'License Weight', 'Start Date', 'Expiry Date'
	];

	if ($('#tblMain').length) {
		$('#tblMain thead th').each(function(i) {
			if (i >= validTHeaders.length) {
				$(this).remove();
			}
			$(this).text(validTHeaders[i]) 
		})
	}

	showSpinner();

	getData(`${apiUrl}/sql_get_doc_license_by_doc_id.php?doc_id=${selectedId}`)
		.then(data => {
			hideSpinner();
			$('#tblMain').before(`
				<div class="header-block header-block--wider">
					<div class="header-block__container">
						<h3 class="header-block__title">${data[0].fname} ${data[0].lname} licenses</h3>
					</div>
				</div>
				<br />
			`);
			if (!$('#tblMain thead').length) {
				$('#tblMain').append(`
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
				`);
			}
			table = $('#tblMain').DataTable( {
        //"processing": true,
        //"serverSide": true,
        // ajax: { 
        //   url:"../sql/sql_v_licenses_www_01.php?docID=<?php echo $docID; ?>",
        //   dataSrc: ""//,
        //   //dataType: "json",                  
        //   //contentType: "application/json; charset=utf-8"
				// } ,
				destroy: true,
				data,
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
        fnInitComplete: function(oSettings, json) { 
					setTimeout(() => {
						hideSpinner();
						$('#tblMain tbody tr:eq(0)').click(); 
					})
				}
			});

			// fill US States dropdowns
      fillStates();
			
			// highlight row in dataTable onClick event
      $('#tblMain tbody').on('click', 'tr', function () {
        var data = table.row( this ).data() || $('#tblMain').DataTable().row().data();        
        var row  = this.rowIndex;    

        // highlight selection 
        var $row = $('#tblMain tr:eq(' + row + ')');            
        $row.addClass('highlight').siblings().removeClass('highlight');        
        $row[0].scrollIntoView({ behavior: 'smooth', block: 'center' }); // not in Safari
        
        // go on with the click event
        clickTable( data );
      } );               

			if (!$('#frmMain').length) {
				$('.main .licenses-list-section .row').find('.wrapper').append(
					`<div id="frmMain">
						<br />
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
									<div class="input-group date">                   
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
									<div class="input-group date">                   
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
							<div class="col-xs-4">        
								<div class="input-group input-group--checkbox">
								<label for="form_isActive">Is active</label>
								<input  id="form_isActive" type="checkbox" class="form-control input-sm">                  
								</div>
							</div>  

							<div class="col-xs-4">       
								<label for="form_licStateWght">License "Weight"</label>
								<input  id="form_licStateWght" type="number"  min="0" max="100" step="1"  class="form-control input-sm integerInput" required>
							</div>

							<div class="col-xs-4">
								<!--label for="form_test">Test Field</label>
								<input  id="form_test" type="text" class="form-control input-sm"-->   
							</div>
						</div>
						<br />
						<div class="text-center">
							<button type="button" id="btnApply"  class="btn btn-primary btn-s disabled" disabled>Apply</button>
							<button type="button" id="btnCancel" class="btn btn-primary btn-s disabled" disabled>Cancel</button>      
				</div>
					</div> `
				)
			};

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

			$('#btnApply').on('click', clickApply);
  		$('#btnCancel').on('click', clickCancel);
		})

	function clickTable( data ){
		if (data) {
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
		}

	};

	
	
	// ***********************************************************
	function clickApply(){      

		var id            = $('#form_id'           ).val();
		//var docID         = $('#form_docID'        ).val();
		var op_id         = $('#form_op_id'        ).val();      
		
		var titleFull     = $('#form_titleFull'    ).val();
		var titleShort    = $('#form_titleShort'   ).val();
		var isActive      = $('#form_isActive'     ).is(":checked")?'1':'0';

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
		var url = './sql/sql_update_license_01_sql.php';
				url+= '?id='            + id;
				url+= '&op_id='         + op_id;
				url+= '&isActive='      + isActive;

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
	
	async function getData(url) {
		try {
			const res = await fetch(url);
			return await res.json();
		} catch (err) {
			throw new Error(err);
		}
	}

})()