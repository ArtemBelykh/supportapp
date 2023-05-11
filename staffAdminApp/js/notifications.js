(() => {
	console.log('notifications');
	const apiUrl = 'http://104.248.191.131/support/sql/'

	const testData =
	{
		"notes":
			[
				{
					"id": 1,
					"subject": "test_subject_note_01",
					"dt_created": "2021-01-06 01:03:43.000000",
					"is_archived": 0,
					"note_bodies": [
						{
							"id": 1,
							"body": "test message body",
							"dt_created": "2021-01-06 01:04:32.000000",
							"recipients": [{ "dt_received": null, "to_employee_id": 1 }, { "dt_received": null, "to_employee_id": 2 }],
							"from_employee_id": 4
						}
					]
				}
			]
	}

	showSpinner();
	setTimeout(() => {
		hideSpinner();
		$('.main').append(`
				<div class="header-block header-block--wider">
					<div class="header-block__container">
						<h3 class="header-block__title">Notifications</h3>
					</div>
				</div>
				${generateBtn(
			'Compose',
			'<i class="glyphicon glyphicon-plus"></i>',
			'btnCreateMsg',
			undefined,
			'align-self-start',
		)}
				<br />
				<div>

				<ul class="nav nav-tabs" role="tablist">
					<li role="presentation" class="active"><a href="#inbox" aria-controls="inbox" role="tab" data-toggle="tab">Inbox</a></li>
					<li role="presentation"><a href="#sent" aria-controls="sent" role="tab" data-toggle="tab">Sent</a></li>
					<li role="presentation"><a href="#archieved" aria-controls="archieved" role="tab" data-toggle="tab">Archieved</a></li>
				</ul>
				<br />
				<div class="tab-content">
					<div role="tabpanel" class="tab-pane active" id="inbox">
						<table id="tblMain-inbox" class="table table-condensed table-striped table-hover" cellpadding="7" cellspacing="0">
						</table>
					</div>
					<div role="tabpanel" class="tab-pane" id="sent">
						<table id="tblMain-sent" class="table table-condensed table-striped table-hover" cellpadding="7" cellspacing="0">
						</table>
					</div>
					<div role="tabpanel" class="tab-pane" id="archieved">
						<table id="tblMain-archieved" class="table table-condensed table-striped table-hover" cellpadding="7" cellspacing="0">
						</table>
					</div>
				</div>

			</div>

			
	`);

		let table;

		$('.nav-tabs a').click(function (e) {
			e.preventDefault()
			console.log('this', $(this).attr('href'))
			// $(this).tab('show');
			const id = $(this).attr('href').slice(1);
			loadTable(id, () => {
				$('.tab-pane.active .table').on('dblclick', 'tr', doubleClickOnTr)
			});
			// $('.tab-pane.active .table').off('dblclick', 'tr', doubleClickOnTr);


		});

		loadTable('inbox');

		$('#btnCreateMsg').click(formOpenHandler);

		$('.table').on('click', 'tr', function (e) {
			$(this).addClass('highlight').siblings().removeClass('highlight');
			$(this)[0].scrollIntoView({ behavior: 'smooth', block: 'center' }); // not in Safari

		});

		$('.tab-pane.active .table').on('dblclick', 'tr', doubleClickOnTr);

	}, 500);






	function showSpinner() {
		if (!$('.loader').length) {
			$('.main').append('<div class="loader"></div>');
		}
	}

	function hideSpinner() {
		$('div.loader').remove();
	}

	function createForm(data, purpose) {
		if (purpose === 'new') {
			console.log('new')
			const template = `
				<div class="jumbotron form-create-message">
					<form>
						<div class="container">
							<div class="form-create-message__header">
								<span>New Message</span>
								<span class="form-create-message__remove"><i class="glyphicon glyphicon-remove"></i></span>
							</div>
							<div class="form-create-message__info">
								<div class="form-create-message__input-wrapper">
									<input class="form-create-message__input" id="recipients" type="text" placeholder="Recipients"/>
								</div>
								<input class="form-create-message__input" id="theme" type="text" placeholder="Theme"/>
								<textarea class="form-create-message__textarea">
								</textarea>
							</div>
							<br />
							<div class="form-create-message__footer">
								${generateBtn('Send')}
							</div>
						</div>
					</form>
				</div>
			`;

			if (!$('.form-create-message').length) {
				$('#container').append(template);
			}

			$('#recipients').on('input', function (e) {
				console.log('e.target.value', e.target.value)
				let res = [];
				let valueLength = e.target.value.length;
				let value = e.target.value;

				if (valueLength > 0) {
					fetch('http://104.248.191.131/staffAdminApp/sql/sql_get_departments_w_employees.php')
						.then(r => r.json())
						.then(d => {
							console.log('d', d)

							d.departments.forEach(dep => {
								for (let i = 0; i < valueLength; i++) {
									if (dep.department.name.slice(0, i + 1).toLowerCase() === value.toLowerCase()) {
										res.push(dep);
										break;
									}
									if (dep.department.employees) {
										dep.department.employees.forEach(empl => {
											if (empl.fname.slice(0, i + 1).toLowerCase() === value.toLowerCase() ||
												empl.lname.slice(0, i + 1).toLowerCase() === value.toLowerCase()
											) {
												res.push({ ...empl, departmentName: dep.department.name });
											}
										})
									}

								}
							})


							console.log('res', res);
							$('.form-create-message__info').append(fillDataListRecipients(res));

							$('.modal-recipients-result__item').click(function (e) {
								if ($('.recipient-item').length) {
									$('.recipient-item').after(`<div class="recipient-item">${$(this).attr('data-name')}</div>`)
								} else {
									$('.form-create-message__input-wrapper').prepend(`<div class="recipient-item">${$(this).attr('data-name')}</div>`)
								}
								$('#recipients').val('').removeAttr('placeholder');
								$('.modal-recipients-result').remove();

							})

						})
				} else {
					console.log('else')
					res.length = 0;
					$('.form-create-message__info').append(fillDataListRecipients(res));
				}




			})

		} else if (purpose === 'reply') {
			const template = `
				<div class="jumbotron form-create-message">
					<form>
						<div class="container">
							<div class="form-create-message__header">
								<span></span>
								<span class="form-create-message__remove"><i class="glyphicon glyphicon-remove"></i></span>
							</div>
							<div class="form-create-message__info">
								<i class="glyphicon glyphicon-share-alt glyphicon-inverse"></i>
								<input class="form-create-message__input" type="text" placeholder="Recipients"/>
								<input class="form-create-message__input" type="text" placeholder="Theme"/>
								<textarea class="form-create-message__textarea">
								</textarea>
							</div>
							<br />
							<div class="form-create-message__footer">
								${generateBtn('Send')}
							</div>
						</div>
					</form>
				</div>
			`;



			if (!$('.form-create-message').length) {
				$('#container').append(template);
			}
		}
	}

	function loadTable(id, cb) {
		if (!$(`#tblMain-${id} thead`).length) {
			$(`#tblMain-${id}`).append(`
			<thead>
				<tr>
					<th>From</th>
					<th>Subject</th>
					<th>Date</th>
				</tr>
			</thead>
		`)
		}
		table = $(`#tblMain-${id}`).DataTable({
			// "processing": true,
			// "serverSide": true,
			ajax: {
				url: id === 'inbox' ? `${apiUrl}sql_get_notes_incoming.php?id=2` : id === 'sent' ? `${apiUrl}sql_get_notes_sent.php?id=2` :
					`${apiUrl}sql_get_notes_incoming.php?id=2`
				,
				dataSrc: "notes",
				// "dataType": "json",
				// "contentType": "application/json; charset=utf-8"
			},
			destroy: true,
			// data: testData,
			columns: [
				{ data: "id" },
				{ data: "subject" },
				{
					data: "dt_created",
					render: (data) => `${moment(data).format("MMM Do YY")}`
				},
				// { data: null }     
			],
			// columnDefs: [ {
			// 		targets: -1,
			// 		data: null,
			// 		defaultContent: "<button><i class='glyphicon glyphicon-search sm'></i> Licenses</button>"
			// } ],
			"drawCallback": function () {
				$(this.api().table().header()).hide();
			},
			initComplete: function (oSettings, json) {
				if (cb) cb();
			}

		});
	}

	function generateBoteBodies(data) {
		$('.note-body').remove();

		$('.tab-pane.active')
			.append(`<div class="note-body">`)
			.append(`<div class="note-body__container"></div>`);
		$('.note-body').append(`<span class="note-body__bnt-back"><i class="glyphicon glyphicon-arrow-left"></i></span>`);
		$('.note-body__container').append(`<h3 class="note-body__title">${data.subject}</h3>`);
		data.note_bodies.forEach((element, i) => {
			$('.note-body__container').append(`
					<div>
						<div class="panel panel-default">
							<div class="panel-heading">
								<div class="panel-heading__top">
									<span>${data.id}</span>
									<span>${moment(element.dt_created).format("MMM Do YY")}</span>
								</div>
								<span class="panel-heading__bottom"><span>To</span>: ${element.recipients.map(
				recipient => recipient.to_employee_id).join()}</span>
							</div>
							<div class="panel-body">
								<div>${element.body}</div>
							</div>
						</div>
					</div>
		`
			)
		});

		$('.note-body').append($('.note-body__container'))
	}

	function btnBackHandler(e) {
		$('.note-body').hide();
		$('[id^="tblMain"]').show();
	}

	function doubleClickOnTr(e) {
		console.log('$(this)', $(this))
		if (!$(this).find('td').hasClass('dataTables_empty')) {
			$(this).closest('table').parent().hide();
			var data = $(this).closest('table').DataTable().row(this).data();
			console.log('this.id', data)

			generateBoteBodies(data);

			$('.note-body__bnt-back').click(btnBackHandler);

			$('.note-body__container').append(generateBtn(
				'Reply',
				'<i class="glyphicon glyphicon-share-alt glyphicon-inverse"></i>',
				'btnReply',
				undefined,
				'mr-1'
			));
			$('.note-body__container').append(generateBtn(
				'Forward',
				'<i class="glyphicon glyphicon glyphicon-arrow-right"></i>',
				'btnForward',
				undefined,
			));

			$('#btnReply').click(function (e) {
				formOpenHandler(e, data, 'reply');
			});
			$('#btnForward').click(function (e) {
				formOpenHandler(e, data, 'forward');
			});

		}
	}

	function generateBtn(title, glyphIcon, id, type = 'button', ...classes) {
		if (glyphIcon) {
			return `<button type="${type}" class="btn btn-primary btn-s ${classes.join(' ')}" href="#" role="button" id="${id}">${glyphIcon} ${title}</button>`;
		}
		return `
			<button type="${type}" class="btn btn-primary btn-s ${classes.join(' ')}"" href="#" role="button" id="${id}">${title}</button>
		`;
	}

	function formOpenHandler(e, data = {}, purpose = 'new') {
		createForm(data, purpose);
		$('.form-create-message__remove').click(function (e) {
			$('.form-create-message').remove();
		});
	}

	function fillDataListRecipients(data) {
		$('.modal-recipients-result').remove();
		console.log('data', data)
		return `
			<div class="modal-recipients-result">
				${data.slice(0, 8).map(el => {
			return `<div 
				class="modal-recipients-result__item"
				data-name="${el.department ? el.department.name : `${el.fname} ${el.lname}`}"
				data-id="${el.department ? el.department.id : el.id}">${el.department ? el.department.name : `${el.fname} ${el.lname} | ${el.departmentName}`}</div>`
		}).join('')}
			</div>
		`;
	}







})()