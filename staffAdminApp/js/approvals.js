(() => {
	const apiUrl = './sql';
	let firstShow = true;

	showSpinner();
	// const encodedId = encodeURIComponent(currDoctorId);
	// const encodedTime = encodeURIComponent(`dt_start=${moment().format('MM-DD-YYYY')}`);
	console.log('${moment()', `${moment().format('YYYY-MM-DD')}`)
	getData(`${apiUrl}/sql_get_approved_by_date_by_doc_id.php?doc_id=${currDoctorId}&dt_start=${moment().format('YYYY-MM-DD')}`)
		.then(data => {
			$('.main').append(`
				${generateHeader()}
				<table id="tblMain" class="table table-condensed table-striped table-hover" cellpadding="7" cellspacing="0">
				</table>
				`
			);

			console.log('data', data.length)
			$('#tblMain').before(`
				<div class="col-xs-4">        
					<label for="form_licStart">Date</label>
					<div class="input-group date">                   
						<input  id="form_licStart" 
							class="form-control input-sm datepicker" 
							type="text"
							placeholder="mm-dd-yyyy"
							
							autocomplete="anyrndcrap"
							required
						>       
						<div class="input-group-addon">
							<span class="glyphicon glyphicon-th"></span>
						</div>
					</div>  
				</div>  
				<br />
			`);

			$('.datepicker').datepicker({ 
        dateFormat: 'mm-dd-yy',
        beforeShow: function (input) {
                    $(input).css({
                        "position": "relative",
                        "z-index": 999999
                    });
                },
				onClose: function () { $('.datepicker').css({ 'z-index': 0  } ); },
				onSelect: function (dateText) {
					console.log('dateText', dateText)
					const [mm, dd, yyyy] = dateText.split('-');
					// const newEncodedTime = encodeURIComponent(`dt_start=${moment(dateText).format('MM-DD-YYYY')}`); 
					getData(`${apiUrl}/sql_get_approved_by_date_by_doc_id.php?doc_id=${currDoctorId}&dt_start=${moment(`${yyyy}-${dd}-${mm}`).format('YYYY-MM-DD')}`)
						.then(data => {
							console.log('new data', data.length)
							$('#tblMain').DataTable().clear().rows.add(data).draw();
						})
					
				}
      })

			$('#form_licStart').val( moment().format('MM-DD-YYYY') );

			if (!$('#tblMain thead').length) {
				$('#tblMain').append(`
					<thead>
						<tr>
							<th>Contact ID</th>
							<th>First Name</th>
							<th>Last Name</th>
							<th>Purchase ID</th>
							<th>Request Date</th>
							<th>Review Date</th>
							<th>Review Status</th>

						</tr>
					</thead>
				`)
			}
			table = $('#tblMain').DataTable( {
				//"processing": true,
				//"serverSide": true,
				// ajax: { 
				// 	url:"./sql/sql_v_doctors_www_01.php",
				// 	dataSrc: ""//,
				// 	//"dataType": "json",                  
				// 	//"contentType": "application/json; charset=utf-8"
				// } ,
				destroy: true,
				data,
				columns: [
					{ data: "op_contact_id"},
					{ data: "firstname" }, 
					{ data: "lastname" },
					{ data: "purchase_id" },
					{ data: "email_date"},   
					{ data: "review_date"},   
					{ data: "review_status"},   

				],
				// columnDefs: [ {
				// 		targets: -1,
				// 		data: null,
				// 		defaultContent: "<button><i class='glyphicon glyphicon-search sm'></i> Licenses</button>"
				// } ],
				// initComplete: function(oSettings, json) { 
				// 	setTimeout(() => {
				// 		hideSpinner();
				// 		$('#tblMain tbody tr:eq(0)').click(); 
				// 	})
				// }
			});


		})
		.catch(console.error)
		.finally(hideSpinner);



	
	
	

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

function generateHeader() {
		return `
			<div class="header-block">
				<div class="header-block__container">
					<h3 class="header-block__title">Approvals</h3>
				</div>
			</div>
		`;
	}
			
			
	function showSpinner() {
			if (!$('.loader').length) {
					$('.main').append('<div class="loader"></div>');
			}
	}
			
	function hideSpinner() {
			$('div.loader').remove();
	}

	async function getData(url) {
		try {
      
      const res = await fetch(url);
      return await res.json();
			
		} catch (err) {
			throw new Error(err);
		}
	}

})()