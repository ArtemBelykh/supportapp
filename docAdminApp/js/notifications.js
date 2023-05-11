(() => {
	const apiUrl = './sql/';
	showSpinner();
	setTimeout(() => {
		hideSpinner();
		$('.main .notifications-section .row').find('.wrapper').append(`
				<div class="header-block header-block--wider">
					<div class="header-block__container">
						<h3 class="header-block__title">Notifications</h3>
					</div>
        </div>
        <br />
				${generateBtn(
			'Compose',
			'<i class="glyphicon glyphicon-plus"></i>',
			'btnCreateMsg',
			undefined,
			'align-self-start',
		)}
				${generateBtn(
            'Archive',
            '<i class="glyphicon glyphicon-plus"></i>',
            'btnArchiveMsg',
            undefined,
            'align-self-start archive_add',
        )}
				<br>
				<div>
        <br />
				<ul class="nav nav-tabs" role="tablist">
					<li role="presentation" class="active"><a href="#inbox" aria-controls="inbox" role="tab" data-toggle="tab">Inbox</a></li>
					<li role="presentation"><a href="#sent" aria-controls="sent" role="tab" data-toggle="tab">Sent</a></li>
					<li role="presentation"><a href="#archived" aria-controls="archived" role="tab" data-toggle="tab">Archived</a></li>
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
					<div role="tabpanel" class="tab-pane" id="archived">
						<table id="tblMain-archived" class="table table-condensed table-striped table-hover" cellpadding="7" cellspacing="0">
						</table>
					</div>
				</div>

			</div>

			
	`);

		let table;

		$('.nav-tabs a').click(function (e) {
			e.preventDefault()
			// $(this).tab('show');
			const id = $(this).attr('href').slice(1);
			loadTable(id, () => {
				$('.tab-pane.active .table').on('dblclick', 'tr', doubleClickOnTr)
			});
			if ($('.note-body').length) {
				$('.note-body').remove();
			}


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
		function inputHandler(e) {
			let timer;
			let res = [];
			if (e.target.value) {
				let lastCharacter = e.target.value;
			
				timer = setTimeout(() => {
					if (e.target.value === lastCharacter) {
						
						let valueLength = e.target.value.length;
						let value = e.target.value;

						if (valueLength > 0) {
							fetch(`${apiUrl}sql_get_departments_w_employees.php`)
								.then(r => r.json())
								.then(d => {

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

									if (res.length !== 0) {
										$('.form-create-message__info').append(fillDataListRecipients(res));
									}

									$('.modal-recipients-result .modal-recipients-result__item').click(function (e) {
										// debugger
										const container = $('.form-create-message__input-wrapper .modal-recipients-result__item');
										if (container.length) {
											const newRecipient = $(this).clone();

											container.last().after($(this).clone().append(generateRemoveIconBlockForRecipient()));
											$('.modal-recipients-result__remove-item-span').click(removeRecepientHandler);
											
										} else {
											$('#recipients').before($(this).clone().append(generateRemoveIconBlockForRecipient()));
											$('.modal-recipients-result__remove-item-span').click(removeRecepientHandler);
											
										};
										$('#recipients').val('').removeAttr('placeholder');
										$('.modal-recipients-result').remove();
									})

								})
						} else {
							res.length = 0;
							$('.form-create-message__info .modal-recipients-result').remove();
						}

					} else {
						clearTimeout(timer);
						lastCharacter = e.target.value;
						res.length = 0;
						$('.form-create-message__info .modal-recipients-result').remove();
						return true;
					}
					
				}, 400);
			} else {
				res.length = 0;
				$('.form-create-message__info .modal-recipients-result').remove();
			}
		}

		if (purpose === 'new') {
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
								<input class="form-create-message__input" id="subject" type="text" placeholder="Subject"/>
								<textarea class="form-create-message__textarea" id="noteBody"></textarea>
							</div>
							<br />
							<div class="form-create-message__footer">
								${generateBtn('Send', undefined, 'sendNewMessage')}
							</div>
						</div>
					</form>
				</div>
			`;

			if (!$('.form-create-message').length) {
				$('.main').append(template);
			}

			$('#recipients').on('input', inputHandler);

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
								<div class="form-create-message__input-wrapper">
									<i class="glyphicon glyphicon-share-alt glyphicon-inverse"></i>
									<input id="recipients" class="form-create-message__input" type="text" placeholder="Recipients"/>
								</div>
								<textarea class="form-create-message__textarea" id="noteBody"></textarea>
							</div>
							<br />
							<div class="form-create-message__footer">
								${generateBtn('Send', undefined, 'sendReplyMessage')}
							</div>
						</div>
					</form>
				</div>
			`;

			if (!$('.form-create-message').length) {
				$('.main').append(template);

				const recipient = $('.form-create-message__input')
					.before(`<div class="modal-recipients-result__item">${data.note_bodies[0].from_employee_name}</div>`).clone()
				$('.modal-recipients-result__item')
					.append(generateRemoveIconBlockForRecipient())
					.data('id', data.note_bodies[0].from_employee_id);
				$('#recipients').on('input', inputHandler);
        $('.modal-recipients-result__remove-item-span').click(removeRecepientHandler);
        
			}
		} else if (purpose === 'forward') {
			const template = `
				<div class="jumbotron form-create-message">
					<form>
						<div class="container">
							<div class="form-create-message__header">
								<span></span>
								<span class="form-create-message__remove"><i class="glyphicon glyphicon-remove"></i></span>
							</div>
							<div class="form-create-message__info">
								<div class="form-create-message__input-wrapper">
								<i class="glyphicon glyphicon-share-alt"></i>
									<input class="form-create-message__input" id="recipients" type="text" placeholder="Recipients"/>
								</div>
								<textarea class="form-create-message__textarea" id="noteBody"></textarea>
							</div>
							<br />
							<div class="form-create-message__footer">
								${generateBtn('Send', undefined, 'sendNewMessage')}
							</div>
						</div>
					</form>
				</div>
			`;

			if (!$('.form-create-message').length) {
				$('.main').append(template);
			}

			$('#noteBody').val(
				`${data.note_bodies.map((el, i) => {
						return `
---------- Forwarded message ---------
From: ${el.from_employee_id}
Date: ${moment(el.dt_created).format('MMMM Do YYYY, h:mm:ss a')}
Subject: ${data.subject}
To: ${el.recipients.map(rec => `${rec.to_employee_name.split('|')[0].replace(' ', '').trim()}`).join(', ')}
						`
					}).join(' ')
					
				}`
			)

			$('#recipients').on('input', inputHandler);
		} else if (purpose === 'replyAll') {
			const template = `
				<div class="jumbotron form-create-message">
					<form>
						<div class="container">
							<div class="form-create-message__header">
								<span></span>
								<span class="form-create-message__remove"><i class="glyphicon glyphicon-remove"></i></span>
							</div>
							<div class="form-create-message__info">
								<div class="form-create-message__input-wrapper">
									<i class="glyphicon glyphicon-share-alt glyphicon-inverse"></i>
									<input id="recipients" class="form-create-message__input" type="text" placeholder="Recipients"/>
								</div>
								<textarea class="form-create-message__textarea" id="noteBody"></textarea>
							</div>
							<br />
							<div class="form-create-message__footer">
								${generateBtn('Send', undefined, 'sendReplyAllMessage')}
							</div>
						</div>
					</form>
				</div>
			`;

			if (!$('.form-create-message').length) {
				$('.main').append(template);

				const recipient = $('.form-create-message__input')
					.before(`${data.note_bodies.map(el => `<div class="modal-recipients-result__item" data-id="${el.from_employee_id}">${el.from_employee_name}</div>`).join(' ')}`).clone()
				$('.modal-recipients-result__item')
					.append(generateRemoveIconBlockForRecipient())
				$('#recipients').on('input', inputHandler);
				$('.modal-recipients-result__remove-item-span').click(removeRecepientHandler);
			}
		}
	}
	async function loadTable(id, cb) {
		if (!$(`#tblMain-${id} thead`).length) {
			$(`#tblMain-${id}`).append(`
			<thead>
				<tr>
					<th></th>
					<th>From</th>
					<th>Subject</th>
					<th>Date</th>
				</tr>
			</thead>
		`)
		}

        $('.archive_add').hide()

		$.fn.dataTable.moment("MM-DD-YYYY, h:mm a");


		$(function () {
			$("input").change(function (e) {
				e.preventDefault();
				if ($(this).is(":checked")) {
					$("input").prop("checked", false);
					$(this).prop("checked", true);
					console.log('check')
				}
			});
		});

		table = await $(`#tblMain-${id}`).DataTable({
			ajax: {
				url: id === 'inbox' ? `${apiUrl}sql_get_notes_incoming.php` : id === 'sent' ? `${apiUrl}sql_get_notes_sent.php` :
					`${apiUrl}sql_get_notes_archived.php`
				,
				dataSrc: "notes",
			},
			destroy: true,
			createdRow: function (row, data) {
				const received = getUnreadMessages(data);
				if (!received) {
					$(row).removeClass('unread-messages-row');
				} else {
					$(row).addClass('unread-messages-row');
				}
			},
			columns: [
				{
					data: 'id',
					"render": function (data, type, full, meta) {
						return `<input type="checkbox" value="${data}" class="checkbox_check" onchange="$(this).is(':checked') ? $('.archive_add').show() : $('.archive_add').hide()">`
					},
					defaultContent: 'N/A'
				},
				{
					data: "note_bodies[0].from_employee_name",
					render: (data) => `${data.split(' ')[0]}`,
					defaultContent: 'N/A'
				},
				{
					data: "subject", defaultContent: 'N/A',
				},
				{
					data: "dt_created",
					render: (data) => `${moment(data).format("MM-DD-YYYY, h:mm a")}`,
					defaultContent: 'N/A'
				},
			],
			columnDefs: [
				{
					targets: -1,
					className: 'dt-body-center',
					checkboxes: {
						'selectRow': true
					},
					searchable: false,
					orderable: false
				}
			],
			select: {
				'style': 'multi'
			},
			"order": [[2, "desc"]],
			"drawCallback": function () {
				$(this.api().table().header()).hide();
			},
			initComplete: function (oSettings, json) {
				if (cb) cb();
				setCountUnreadMessages();
			}
		});
	}

	function generateNoteBodies(data) {
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
									<span>From</span>: ${element.from_employee_name}
									<span>${moment(element.dt_created).format("MMM Do YY")}</span>
								</div>
								<span class="panel-heading__bottom"><span>To</span>: ${element.recipients.map(
				recipient => recipient.to_employee_name).join(', ')}</span>
							</div>
							<div class="panel-body">
								<div>${element.body}</div>
							</div>
						</div>
					</div>
		`)
		});

		$('.note-body').append($('.note-body__container'))
	}

	function btnBackHandler(e) {
		// $('[id^="tblMain"]').DataTable().clear().rows.add(activeEmployees).draw();
		$('.note-body').hide();
		let id = $('.nav-tabs li.active a').attr('href').slice(1);
		loadTable(id);
		$('table[id^="tblMain"]').show();
	}

	function doubleClickOnTr(e) {
		if (!$(this).find('td').hasClass('dataTables_empty')) {
			$(this).closest('table').parent().hide();
			var data = $(this).closest('table').DataTable().row(this).data();

			generateNoteBodies(data);

			$('.note-body__bnt-back').click(btnBackHandler);

			$('.note-body__container').append(generateBtn(
				'Reply',
				'<i class="glyphicon glyphicon-share-alt glyphicon-inverse"></i>',
				'btnReply',
				undefined,
				'mr-1'
			));
			if (data.note_bodies.length > 1) {
				$('.note-body__container').append(generateBtn(
					'Reply All',
					`<span class="glyphicon-wrapper">
						<i class="glyphicon glyphicon-share-alt glyphicon-inverse"></i>
						<i class="glyphicon glyphicon-share-alt glyphicon-inverse"></i>
					</span>`,
					'btnReplyAll',
					undefined,
					'mr-1'
				));
			}
			$('.note-body__container').append(generateBtn(
				'Forward',
				'<i class="glyphicon glyphicon glyphicon-arrow-right"></i>',
				'btnForward',
				undefined,
				'mr-1'
			));

			data.note_bodies.forEach(note => fetch(`${apiUrl}sql_update_dt_received.php?note_body_id=${note.id}`)
				.then(d => d.json())
				.then(r => {
					let id = $('.nav-tabs li.active a').attr('href').slice(1);
					// loadTable(id, () => {
					// 	$('.tab-pane.active .table').on('dblclick', 'tr', doubleClickOnTr)
					// });
					// $(`#tblMain-${id}_wrapper`).hide();
				})
				.catch(console.error)
			)

			$('#btnReply').click(function (e) {
				formOpenHandler(e, data, 'reply');
			});
			$('#btnReplyAll').click(function (e) {
				formOpenHandler(e, data, 'replyAll');
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
			<button type="${type}" class="btn btn-primary btn-s ${classes.join(' ')}" href="#" role="button" id="${id}">${title}</button>
		`;
	}

	function formOpenHandler(e, data = {}, purpose = 'new') {
		createForm(data, purpose);
		$('#sendNewMessage').click(sendNewMessageHandler);
		$('#sendReplyMessage').click((e) => sendReplyOrReplyAllMessageHandler(e, data));
		$('#sendReplyAllMessage').click((e) => sendReplyOrReplyAllMessageHandler(e, data));
		$('#sendForwardMessage').click((e) => sendForwardMessage(e, data));

		$('.form-create-message__remove').click(function (e) {
			$('.form-create-message').remove();
		});
	}


	function fillDataListRecipients(data) {
		$('.modal-recipients-result').remove();
		return `
			<div class="modal-recipients-result">
				${data.slice(0, 8).map(el => {
			return `<div 
				class="modal-recipients-result__item"
				data-name="${el.department ? el.department.name : `${el.fname} ${el.lname}`}"
				data-id="${el.department ? el.department.employees?.map(el => el.id) : el.id}">${el.department ? el.department.name : `${el.fname} ${el.lname} | ${el.departmentName}`}</div>`
		}).join('')}
			</div>
		`;
	}

	function sendNewMessageHandler(e, purpose, msgData) {
		const container = $('.form-create-message__input-wrapper .modal-recipients-result__item');
		const subject = $('#subject');
		const noteBody = $('#noteBody');
		if (container.length && noteBody.val().trim()) {
			const data = {
				subject: subject.val(),
				note_body: noteBody.val(),
			}
			fetch(`${apiUrl}sql_create_note_w_body.php`, { method: 'POST', body: JSON.stringify(data) })
			.then(r => r.json())
			.then(d => {
				if (d.message !== 'error')  {
					const toEmployeeIds = $.makeArray($('.modal-recipients-result__item').map((i, el) => {
						if ($(el).data('id') !== 'undefined') {
							return $(el).data('id') 
						}
					})).join(',').split(',').map(Number);
					const {result: noteBodyId} = d;
					Promise.all(toEmployeeIds.map(id => sendId(id, noteBodyId)))
						.then(r => {
							if (r.every(el => el.result)) {
								$('.form-create-message').remove();
							}
						})
						// .then(d => console.log(d))
						.catch(console.error)
				}
			})
		}
		return;
	}

	function sendReplyOrReplyAllMessageHandler(e, msgData) {
		const container = $('.form-create-message__input-wrapper .modal-recipients-result__item');
		const subject = $('#subject');
		const noteBody = $('#noteBody');
		const data = {
			note_body: noteBody.val(),
			note_id: msgData.id
		};
		if (container.length) {
			fetch(`${apiUrl}sql_create_note_body.php`, { method: 'POST', body: JSON.stringify(data) })
			.then(r => r.json())
			.then(d => {
				if (d.message !== 'error')  {
					const toEmployeeIds = $.makeArray($('.modal-recipients-result__item').map((i, el) => {
						if ($(el).data('id') !== 'undefined') {
							return $(el).data('id') 
						}
					}));
					const {result: noteBodyId} = d;
					Promise.all(toEmployeeIds.map(id => sendId(id, noteBodyId)))
						.then(r => {
							if (r.every(el => el.result)) {
								$('.form-create-message').remove();
							} 
						})
						// .then(d => console.log(d))
						.catch(console.error)
				}
			})
		}
	}

	function sendId(toEmployeeId, noteBodyId) {
		return fetch(`${apiUrl}sql_insert_note_body_recipient.php?note_body_id=${noteBodyId}&&to_employee_id=${toEmployeeId}`)
			.then(r => r.json())
			.then(data => data)
			.catch(console.error)
	}

	function generateRemoveIconBlockForRecipient() {
		return `
			<div class="modal-recipients-result__remove-item-block">
				<span class="modal-recipients-result__remove-item-span">
					<i class="glyphicon glyphicon-remove"></i>
				</span>
			</div>
		`;
	}

	function addToArchive(data) {
	    for (let val of data) {
            fetch(`${apiUrl}sql_update_recipient_note_to_archived.php?note_id=${val}`)
                .then(r => r.json())
                .then(d => {
                    console.log(d)
                })
                .catch(err => console.log(`err`, err))
        }
    }


    fetch(`${apiUrl}sql_get_notes_incoming.php`)
        .then(r => r.json())
        .then(res => {
            $('.archive_add').on('click', (event) => {
                event.preventDefault()

                var values = $.makeArray($('.checkbox_check:checkbox:checked').map(function() { return $(this).val() }));

                console.log(values)
                addToArchive(values)
            })
        })

	function removeRecepientHandler(e) {
		const id = $(this).closest('.modal-recipients-result__item').data('id');
		$(this).closest('.modal-recipients-result__item').remove();
		if (!$('.modal-recipients-result__item').length) {
			$('#recipients').val('').attr('placeholder', 'Recipients');
		}
	}

	function getUnreadMessages(row) {
		let res = false;
		row.note_bodies?.forEach(r => {
			r.recipients?.forEach(rec => {
				if (rec.dt_received === null && rec.to_employee_id === userId) {
					res = true;
				}
			})
		})
		return res;
	}

	function setCountUnreadMessages() {
		fetch(`${apiUrl}sql_count_notes_incoming_to_employee.php`)
			.then(r => r.json())
			.then(({result: count}) => {  
				const $notyIconElement = $('.menu__item[title="Notifications"] .noty-icon');
				if (count !== 0) {
					$notyIconElement.show();
					$notyIconElement.find('span').text(count);
				} else {
					$notyIconElement.hide();
				}
			})
			.catch(console.error)
		}
})()