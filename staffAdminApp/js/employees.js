(() => {
console.log('EMPLOYEES LIST')
$('.main').html();
let table;
// if ($('#tblMain').length) {
// 	$('#tblMain thead').html('');
// }

function showSpinner() {
	if (!$('.loader').length) {
		$('.main').append('<div class="loader"></div>');
	}
}

function hideSpinner() {
	$('div.loader').remove();
}

showSpinner();
fetch("./sql/sql_v_employees_01.php")
	.then(res => res.json())
	.then(data => {
		const activeEmployees = data.filter(doc => doc.is_active === '1');
		const inActiveEmployees = data.filter(doc => doc.is_active === '0');
		console.log('activeDoctors', activeEmployees);
		console.log('inActiveDoctors', inActiveEmployees);

		$('.main').append(`
			<div class="header-block header-block--wider">
				<div class="header-block__container">
					<h3 class="header-block__title">Employees List</h3>
				</div>
			</div>
			<table id="tblMain" class="table table-condensed table-striped table-hover" cellpadding="7" cellspacing="0">
      </table>
		`);

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
						<th>First Name</th>
						<th>Last Name</th>
						<th>Birthday</th>
						<th>Is Active</th>
						<th attr="hide-data">Department ID</th>
						<th attr="hide-data">Manager ID</th>
						<th>Login</th>
						<th>Phone</th>        
						<th>Email</th>
						<th>Department Name</th>
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
			data: activeEmployees,
			columns: [
				{ data: "employee_id", "visible": false, "searchable": false }, 
				{ data: "fname" }, 
				{ data: "lname" },
				{ data: "bday" },
				{ data: "is_active" },
				{ data: "department_id",    "visible": false, "searchable": false },
				{ data: "manager_id",    "visible": false, "searchable": false },
				{ data: "login" },
				{ data: "phone", className: 'td-phone' },                
				{ data: "email" },
				{ data: "department_name"},
				// { data: null }     
			],
			// columnDefs: [ {
			// 		targets: -1,
			// 		data: null,
			// 		defaultContent: "<button><i class='glyphicon glyphicon-search sm'></i> Licenses</button>"
			// } ],
			initComplete: function(oSettings, json) {
				$('tbody .td-phone').mask('(999) 999-9999')
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
      console.log('data.id', data.employee_id)
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
      document.location.href = `employee-details.php?docID=${data.employee_id}`;      
      //!!!!!!!
		})

		$('#tblMain tbody').one( 'click', 'button', function (e) {
			e.stopPropagation();
			var data = table.row( $(this).parents('tr') ).data() || $('#tblMain').DataTable().row($(this).parents('tr')).data();
			console.log('CLICK')
			// var href = 'licenses-list.php?docID='+data.id+'&fname='+data.fname+'&lname='+data.lname;
			// document.location.href = href ;
      //alert( "Almost redirected to " + data.fname +" "+ data.lname + "'s Licenses"  );
      // !!!!!!!!!!!!!!!!!!!!!!
			// window.history.pushState({
			// 	id: 'id'
      // }, 'licenses-list', `licenses-list.php?docID=${data.id}`);
      document.location.href = `licenses-list.php?docID=${data.id}`;      
      // !!!!!!!!!!!!!!!!!!!!!!
		});
		
		$('.input-checkbox').on('change', function(e) {
			if (e.target.checked === true) {
				$('#tblMain').DataTable().clear().rows.add(activeEmployees).draw();
			} else {
				$('#tblMain').DataTable().clear().rows.add(inActiveEmployees).draw();
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


