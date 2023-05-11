(() => {
const apiUrl = `./sql`
$('.main').html();
let table;

function showSpinner() {
	if (!$('.loader').length) {
		$('.main .doctors-list-section .row').find('.wrapper').append('<div class="loader"></div>');
	}
}

function hideSpinner() {
	$('div.loader').remove();
}

showSpinner();
fetch(`${apiUrl}/sql_v_doctors_www_01.php`)
	.then(res => res.json())
	.then(data => {

		console.log(data)
		const activeDoctors = data.filter(doc => doc.isActive === '1');
		const inActiveDoctors = data.filter(doc => doc.isActive === '0');

		$('.main .doctors-list-section .row').find('.wrapper').append(`
			<div class="header-block header-block--wider">
				<div class="header-block__container">
					<h3 class="header-block__title">Doctor List</h3>
				</div>
			</div>
			<br />
			<table id="tblMain" class="table table-condensed table-striped table-hover" cellpadding="7" cellspacing="0">
      </table>
		`);


		function JSONToCSVConvertor(JSONData, ReportTitle, ShowLabel) {

			//If JSONData is not an object then JSON.parse will parse the JSON string in an Object
			var arrData = typeof JSONData != 'object' ? JSONData : JSONData;
			var CSV = '';
			//This condition will generate the Label/Header
			if (ShowLabel) {
				var row = "";

				//This loop will extract the label from 1st index of on array
				for (var index in arrData[0]) {
					//Now convert each value to string and comma-seprated
					row += index + ',';
				}
				row = row.slice(0, -1);
				//append Label row with line break
				CSV += row + '\r\n';
			}

			//1st loop is to extract each row
			for (var i = 0; i < arrData.length; i++) {
				var row = "";
				//2nd loop will extract each column and convert it in string comma-seprated
				for (var index in arrData[i]) {
					row += '"' + arrData[i][index] + '",';
				}
				row.slice(0, row.length - 1);
				//add a line break after each row
				CSV += row + '\r\n';
			}

			if (CSV == '') {
				alert("Invalid data");
				return;
			}

			//this trick will generate a temp "a" tag
			var link = document.createElement("a");
			link.id = "lnkDwnldLnk";

			//this part will append the anchor tag and remove it after automatic click
			document.body.appendChild(link);

			var csv = CSV;
			blob = new Blob([csv], { type: 'text/csv' });
			var csvUrl = window.webkitURL.createObjectURL(blob);
			var filename =  (ReportTitle || 'UserExport') + '.csv';
			$("#lnkDwnldLnk")
				.attr({
					'download': filename,
					'href': csvUrl
				});

			$('#lnkDwnldLnk')[0].click();
			document.body.removeChild(link);
		}


		$('#tblMain').before(`
			<div class="show-active-block">
				<label class="checkbox-inline">
					<input type="checkbox" checked class="input-checkbox">Show active
				</label>
			</div>`
		);
		
		if (!$('#tblMain thead').length) {
			$('#tblMain').append(`
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
			data: activeDoctors,
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
			initComplete: function(oSettings, json) { 
				setTimeout(() => {
					hideSpinner();
					$('#tblMain tbody tr:eq(0)').click(); 
				})
			}
		});

		$('#tblMain tbody').on('click', 'tr', function (e) {
			var row  = this.rowIndex;    
		
			// highlight selection 
			var $row = $('#tblMain tr:eq(' + row + ')');            
			$row.addClass('highlight').siblings().removeClass('highlight');        
			$row[0].scrollIntoView({ behavior: 'smooth', block: 'center' }); // not in Safari
			
		});

		$('#tblMain tbody').on('dblclick', 'tr', function (e) {
			var data = table.row( this ).data();
      //!!!!!!!
      //currDoctorId = data.id;
      //!!!!!!!

      //!!!!!!!
			// var row  = this.rowIndex; 
			// // go on with the click event
			// window.history.pushState({
			// 	id: row
      // }, 'doctor-info', `doctor-info.php?docID=${data.id}`);

      //!!!!!!!
      fetch(`varSet.php?name=selectedId&val=${data.id}`)
								.then(r => r.json())
								.then(data => {
									document.location.href = `doctor-info.php`;
								})
								.catch(err => console.log(err))       
      //!!!!!!!
		})

		$('#tblMain tbody').on( 'click', 'button', function (e) {
			e.stopPropagation();
			var data = table.row( $(this).parents('tr') ).data() || $('#tblMain').DataTable().row($(this).parents('tr')).data();
			// var href = 'licenses-list.php?docID='+data.id+'&fname='+data.fname+'&lname='+data.lname;
			// document.location.href = href ;
      //alert( "Almost redirected to " + data.fname +" "+ data.lname + "'s Licenses"  );
      // !!!!!!!!!!!!!!!!!!!!!!
			// window.history.pushState({
			// 	id: 'id'
			// }, 'licenses-list', `licenses-list.php?docID=${data.id}`);
			fetch(`varSet.php?name=selectedId&val=${data.id}`)
				.then(r => r.json())
				.then(data => {
					document.location.href = `licenses-list.php`;
				})
				.catch(err => console.log(err));  
      // !!!!!!!!!!!!!!!!!!!!!!
		});
		
		$('.input-checkbox').on('change', function(e) {
			if (e.target.checked === true) {
				$('#tblMain').DataTable().clear().rows.add(activeDoctors).draw();
			} else {
				$('#tblMain').DataTable().clear().rows.add(inActiveDoctors).draw();
			}
		})
		
	
	})
	.catch(console.error)



// $('#tblMain tbody').on('click', 'tr', function () {
// 	console.log('click')
// 	var data = table.row( this ).data();        
// 	var row  = this.rowIndex;    

// 	// highlight selection 
// 	var $row = $('#tblMain tr:eq(' + row + ')');            
// 	$row.addClass('highlight').siblings().removeClass('highlight');        
// 	$row[0].scrollIntoView({ behavior: 'smooth', block: 'center' }); // not in Safari
	
// 	// go on with the click event
// 	window.history.pushState({
// 									id: row
// 							}, 'doctor-info', 'doctor-info.html');
// 	clickTable( data );
// } );

// $('#tblMain tbody').on( 'click', 'button', function () {
// 	var data = table.row( $(this).parents('tr') ).data();
// 	var href = 'licenses-list.php?docID='+data.id+'&fname='+data.fname+'&lname='+data.lname;
// 	document.location.href = href ;
// 	//alert( "Almost redirected to " + data.fname +" "+ data.lname + "'s Licenses"  );
// } );
})()


