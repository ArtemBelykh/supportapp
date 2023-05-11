(() => {
	const apiUrl = './sql';
	let firstShow = true;

	showSpinner();

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

	getData(`${apiUrl}/sql_get_approved_by_date_by_doc_id.php?doc_id=${selectedId}&dt_start=${moment().format('YYYY-MM-DD')}`)
		.then(data => {
			$('.main .approvals-section .row').find('.wrapper').append(`
				${generateHeader()}
				<table id="tblMain" class="table table-condensed table-striped table-hover" cellpadding="7" cellspacing="0">
				</table>
				`
			);

			$('#tblMain').before(`
				<div class="col-xs-4">        
					<label for="form_licStart">Date</label>
					<div class="input-group date">                   
						<input id="form_licStart" class="form-control input-sm datepicker" type="text" placeholder="mm-dd-yyyy" autocomplete="anyrndcrap" required>       
						<div class="input-group-addon">
							<span class="glyphicon glyphicon-th"></span>
						</div>
					</div>
					<br />
				</div>
				<div class="d-flex" style="margin-top: 25px;">
					<input class="btn btn-primary download_to_csv" type="submit" value="Download to CSV">
					<input class="btn btn-primary download_to_pdf" type="submit" value="Download to PDF">
				</div>
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
					const [mm, dd, yyyy] = dateText.split('-');

					console.log(selectedId)
					// const newEncodedTime = encodeURIComponent(`dt_start=${moment(dateText).format('MM-DD-YYYY')}`); 
					getData(`${apiUrl}/sql_get_approved_by_date_by_doc_id.php?doc_id=${selectedId}&dt_start=${moment(`${mm}-${dd}-${yyyy}`).format('YYYY-MM-DD')}`)
						.then(data => {
							$('#tblMain').DataTable().clear().rows.add(data).draw();

							$('.download_to_csv').on('click', (event) => {
								event.preventDefault()
								JSONToCSVConvertor(data)
							})
							$('.download_to_pdf').on('click', (event) => {
								event.preventDefault()

								let table = document.createElement('table');
								let tbody = document.createElement('tbody');
								let wrapper = document.createElement('div');
								wrapper.id = 'table-pdf';
								$('.reports-section').append(wrapper);

								table.append(tbody);
								wrapper.append(table);

								table.insertAdjacentHTML('afterbegin', `<thead>
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>Approved Today</th>
						<th>Denied Today</th>
						<!-- <th>Pending Today</th>
						<th>Current Week Approved</th>
						<th>Current Week Denied</th>
						<th>Current Week Pending</th>
						<th>Current Month Approved</th>
						<th>Current Month Denied</th>
						<th>Current Month Pending</th>
						<th>Previous Month Approved</th>
						<th>Previous Month Denied</th>
						<th>Previous Month Pending</th> -->
					</tr>
				</thead>`
								);

								data.reverse().forEach(d => {
									tbody.insertAdjacentHTML('afterbegin',
										`<tr>
						<td>
							${d.id}
						</td>
						<td>
							${d.fname} ${d.lname}
						</td>
						<td>
							${d.data.cur_day_approved}
						</td>
						<td>
							${d.data.cur_day_denied}
						</td>
						<!-- <td>
							${d.data.cur_day_pending}
						</td>

						<td>
							${d.data.cur_week_approved}
						</td>
						<td>
							${d.data.cur_week_denied}
						</td>
						<td>
							${d.data.cur_week_pending}
						</td>

						<td>
							${d.data.cur_month_approved}
						</td>
						<td>
							${d.data.cur_month_denied}
						</td>
						<td>
							${d.data.cur_month_pending}
						</td>

						<td>
							${d.data.prev_month_approved}
						</td>
						<td>
							${d.data.prev_month_denied}
						</td>
						<td>
							${d.data.prev_month_pending}
						</td> -->

					</tr>`
									)
								});



								let doc = new jsPDF('p', 'pt', 'letter');
								let src = $('.table')[0];

								// let margins = {
								//   top: 80,
								//   bottom: 60,
								//   left: 40,
								//   width: 522
								// };

								// We'll make our own renderer to skip this editor
								specialElementHandlers = {
									// element with id of "bypass" - jQuery style selector
									'#bypassme': function (element, renderer) {
										// true = "handled elsewhere, bypass text extraction"
										return true
									}
								};

								margins = {
									top: 80,
									bottom: 60,
									left: 40,
									width: 122
								};

								console.log(doc)

								doc.fromHTML(
									src,
									margins.left, margins.top, {
										'width': margins.width, // max width of content on PDF
										'elementHandlers': specialElementHandlers
									},
									function(dispose) {
										doc.save('Test.pdf');
									}, margins);

								doc.save()

							});
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
			<br />
		`;
	}

	function showSpinner() {
		if (!$('.loader').length) {
				$('.main .approvals-section .row')
				.find('.wrapper')
				.append('<div class="loader"></div>');
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