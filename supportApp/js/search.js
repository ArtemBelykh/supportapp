$(document).ready(() => {

	// Spinner
	function showSpinner() {
		$('.main .form-block__inputs-wrapper').append('<div class="loader loader--bg loader--white"></div>');
	}

	function hideSpinner() {
		$('div.loader').hide();
	}

	$('#profile-form .client-search').click((e) => {
		e.preventDefault();
		if (!$('#myTable').length) {
			$('.form-block__inputs-wrapper').append(
				`<table id="myTable" class="display" style="width:100%">
					<thead>
						<tr>
							<th>Contact ID</th>          
							<th>First Name</th>          
							<th>Last Name</th>
							<th attr="hide-data">Bithday</th>
							<th>Email</th>
							<th attr="hide-data">Gender</th>          
							<th attr="hide-data">Is Over 18</th>
							<th>Phone</th>
						</tr>
					</thead>
				</table>
				`
			);
		}

		search(e);
	});		

	$('input[type="text"]').on('click', function (e) {
		const radio = $(this).parent().find('input[type="radio"]')
		radio.prop('checked', true)
	})

	function search(e) {
		e.preventDefault();

		const field = $('input[name="search-group"]:checked').closest('.form-input__checkbox').parent().prev().attr('id');
		const value = $(`#${field}`).val().toLowerCase().replace('ESA369'.toLowerCase(), '');
		if (field) {
			if ($('#myTable tbody').length) {
				$('#myTable_wrapper').css('display', 'none');
				showSpinner();
				fetch(`./sql/sql_search_contacts_by_${field}.php?value=${value}`)
					.then(r => r.json())
					.then(data => {
						$('#myTable_wrapper').css('display', 'block');
						hideSpinner();
						$('#myTable').DataTable().clear().rows.add(data).draw();
					})
			} else {
				showSpinner();
				fetch(`./sql/sql_search_contacts_by_${field}.php?value=${value}`)
					.then(r => r.json())
					.then(data => {
						hideSpinner();
						$('#myTable').DataTable({
							data,
							destroy: true,
							columns: [
								{ 'data': 'contact_id' },
								{ 'data': 'firstname' },
								{ 'data': 'lastname' },
								{ 'data': 'birthday', visible: false, searchable: false },
								{ 'data': 'email' },
								{ 'data': 'gender', visible: false, searchable: false },
								{ 'data': 'is_over_18', visible: false, searchable: false },
								{ data: 'phone',
									// render: (data) => data === null ? '' : `${data.slice(1)}`,
									// defaultContent: 'N/A'
								},
							],
							columnDefs: [
								{
										targets: -1,
										className: 'dt-body-right'
								}
							],
							initComplete: function (oSettings, json) {
								// $('#myTable tr td:last-child').mask('(999) 999-9999');
								// // Trigger phone for apply mask
								// $('#myTable tr td:last-child').trigger('input');
							}
						});

						// $('#myTable').on( 'draw.dt', function () {
						// 	$('#myTable tr td:last-child').mask('(999) 999-9999');
						// 		// Trigger phone for apply mask
						// 		$('#myTable tr td:last-child').trigger('input');
						// } );

						$('#myTable tbody').on('click', 'tr', function (e) {
							var row = this.rowIndex;
							// highlight selection 
							var $row = $('#myTable tr:eq(' + row + ')');
							$row.addClass('highlight').siblings().removeClass('highlight');
							$row[0].scrollIntoView({ behavior: 'smooth', block: 'center' }); // not in Safari

						});

						$('#myTable tbody').on('dblclick', 'tr', function (e) {
							var data = $('#myTable').DataTable().row(this).data();
							fetch(`varSet.php?name=selectedId&val=${data.contact_id}`)
								.then(r => r.json())
								.then(data => {
									// console.log('permissions', permissions)
									document.location.href = `contact-info.php`;
								})
								.catch(err => console.log(err))

							//!!!!!!!
							// var row  = this.rowIndex; да
							// // go on with the click event
							// window.history.pushState({
							// 	id: row
							// }, 'doctor-info', `doctor-info.php?docID=${data.id}`);

							//!!!!!!!
							
							//!!!!!!!
						})

					})
			}



		}
	}

	function allowPermission(forWhat) {
		
	}
})


