(() => {
	const apiUrl = './sql/';

	// Spinner
	function showSpinner() {
		$('.main .contactInfo-section .row').eq(1).find('.wrapper').append('<div class="loader loader--bg loader--white"></div>');
	}

	function hideSpinner() {
		$('div.loader').hide();
	}
	generateMainForm();

	// sync animate
	function animateBlink(color, color2 = '#fff') {
		$('.btns-block__blink').animate({backgroundColor: color}, 500, function() {
			$('.btns-block__blink').animate({backgroundColor: color2}, 500, function() {
				animateBlink(color);
			})
		})
	}

	function stopAnimate(color) {
		$('.btns-block__blink').css({backgroundColor: color});
	}

	// Load profile-form
	function generateMainForm() {
		$('.main .contactInfo-section .row').find('.wrapper').append(`
			<div class="row header-block header-block--wider">
				<div class="header-block__container">
					<h3 class="header-block__title">Contact Info</h3>
				</div>
			</div>
			<br />
			<form id="profile-form" class="profile-form">
				<div class="row">
					<div class="col-xs-12 col-sm-12 col-md-12" style="padding: 0">
						<ul class="collapsible panel-group" id="accordion" role="tablist" aria-multiselectable="true">
							<!-- HANDLER INFO --> 
							<li class="form-block active panel panel-default">
									<div class="collapsible-header panel-heading" role="tab" id="headingOne">
										<p class="form-block__heading" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
											Main
										</p>
										<span>ID# ${selectedId} / ESA# ESA369${selectedId}</span>
									</div>
									<div class="collapsible-body">
										<div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
											<div class="panel-body">
												<div class="row">
													<div class="col col-xs-12 col-sm-12 col-md-12">
														<div class="row inputs-container">
															<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
																<div class="form-group">
																	<label for="firstname">First Name</label>
																	<input id="firstname" type="text" name="firstname" class="fname validate input-outlined form-control" required disabled/>
																</div>
															</div>
	
															<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
																<div class="form-group">
																	<label for="lastname">Last Name</label>
																	<input id="lastname" type="text" name="lastname" class="lname validate form-control" required disabled />
																</div>
																
																
																<span class="helper-text" data-error="Please specify your last name"></span>
															</div>
														</div>
	
														<div class="row inputs-container">
															<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
																<div class="form-group">
																	<label for="email">Email</label>
																		<input id="email" type="email" name="email" class="validate form-control" required disabled/>
																	</div>
																<span class="helper-text" data-error=""></span>
															</div>
	
															<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
																<div class="form-group">
																	<label for="birthday">Date of Birth</label>
																	<input type="text" name="birthday" id="birthday" class="bday datepicker form-control" required disabled />
																</div>
																<span class="helper-text" data-error=""></span>
															</div>
														</div>
														<div class="row inputs-container d-flex align-items-center">
															<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
																<div class="form-group">
																	<label for="phone">Phone</label>
																	<input id="phone" type="tel" name="phone" class="phone validate form-control" required disabled data-mask="(000) 000-0000" />
																</div>
																<span class="helper-text" data-error=""></span>
															</div>
	
															<div class="col col-xs-12 col-sm-12 col-md-3 col-lg-3 m-top-2">
																<div class="form-group">
																	<label>Gender</label>
																	<div class="gender-group">
																		<span class="gender-group__radio">
																		<label>
																			<input class="with-gap" name="gender" type="radio" id="male" checked disabled required />
																			<span>Male</span>
																		</label>
																		</span>
																		<span class="gender-group__radio">
																		<label>
																			<input class="with-gap" name="gender" type="radio" id="female" disabled required/>
																			<span>Female</span>
																		</label>
																		</span>
																	</div>
																</div>
															</div>
															
															<div class="col col-xs-12 col-sm-12 col-md-3 col-lg-3 m-top-2">
																<div class="btns-block" style="text-align: end">
																	<button class="btn btn-primary btn-s align-self-start btns-block__btn-sync" disabled><span class="btns-block__blink"></span>OP Sync</button>
																</div>
															</div>
													</div>		
												</div>
											</div>
										</div>
										
									</div>
							</li>
							<!-- BILLING ADDRESS  -->
							<li class="form-block panel panel-default">
								<div class="collapsible-header panel-heading" role="tab" id="headingTwo"">
									<p class="form-block__heading" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
										Billing Address
									</p>
								</div>
								<div class="collapsible-body">
									<div id="collapseTwo" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingTwo">
										<div class="panel-body">
											<div class="row" style="margin-bottom: 0">
													<div class="col-xs-12 col-sm-12 col-md-12">
														<div class="row inputs-container">
															<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
																<div class="form-group">
																	<label for="address_1">Street Address 1</label>
																	<input id="address_1" type="text" name="address_1" class="address_1 validate form-control" required>
																</div>
																<span class="helper-text" data-error=""></span>
															</div>
															<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
																<div class="form-group">
																	<label for="address_2">Street Address 2</label>
																	<input id="address_2" type="text" name="address_2" class="address_2 validate form-control">
																</div>
																<span class="helper-text" data-error=""></span>
															</div>
														</div>
														<div class="row inputs-container">
															<div class="col-xs-12 col-sm-12 col-md-6 col-lg-6">
																<div class="form-group">
																	<label for="city">City</label>
																	<input id="city" name="city" type="text" class="city validate form-control" required>
																</div>
																<span class="helper-text" data-error=""></span>
																</div>
																<div class="col-xs-12 col-sm-12 col-md-3 col-lg-3">
																	<div class="form-group">
																		<label>State</label>
																		<select class="form-control" id="state_name"></select>
																	</div>
																	<span class="helper-text" data-error=""></span>
																</div>
																<div class="row inputs-container">
																<div class="col col-xs-4 col-sm-2 col-md-2 col-lg-2">
																	<div class="form-group">
																		<label for="ZIP">Zip</label>
																		<input id="ZIP" type="text" name="ZIP" class="ZIP validate form-control" maxlength="5" required>
																	</div>
																</div>
														</div>
														</div>
														
													</div>
												</div>
												<div class="btns-block">
													<button class="btn btn-primary btn-s align-self-start btns-block__btn-save">Save</button>
													<button class="btn btn-primary btn-s align-self-start btns-block__btn-cancel">Cancel</button>
												</div>
											</div>
									</div>
								</div>
							</li>
							<!-- PASSWORD -->
							<li class="form-block panel panel-default">
								<div class="collapsible-header panel-heading" role="tab" id="headingFour">
									<p class="form-block__heading" data-toggle="collapse" data-parent="#accordion" href="#collapseFour" aria-expanded="true" aria-controls="collapseFour">
										Web Credentials
									</p>
								</div>
								<div class="collapsible-body">
									<div id="collapseFour" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingFour">
										<div class="panel-body">
											<div class="row">
												<div class="col col-xs-12 col-sm-6 col-md-12">
													<div class="row inputs-container">
														<div class="col col-xs-12 col-sm-6 col-md-12">
															<div class="form-group">
																<label for="password">Password</label>
																<input id="password" type="password" class="validate form-control">
															</div>
														</div>
													</div>
												</div>	
												<div class="col col-xs-12 col-sm-6 col-md-12">
													<div class="row inputs-container">
														<div class="col col-xs-12 col-sm-6 col-md-12">
															<div class="form-group">
																<label for="confirmPasword">Confirm Password</label>
																<input id="confirmPasword" type="password" class="validate form-control">
															</div>
														</div>
													</div>
												</div>
												</div>
											</div>
										</div>								
								</div>
							</li>
						</ul>
					</div>
				</div>
			</form>
	`);
	}

	function populateStates() {
		let stateSelect = $('.profile-form select#state_name');
		fetch(`${apiUrl}/sql_v_us_states_www_01.php`, {
			method: 'GET',
			mode: 'no-cors',
		})
			.then((response) => response.json())
			.then((json) => {
				let options = json.reduce((total, item) => {
					return (
						total +
						`<option value=${item.state_code}>${item.state_name}</option>\n`
					);
				}, '');
				stateSelect.append(options);
				// stateSelect.formSelect();
			})
			.catch(console.error);
	}
	//Select fieldа
	// $('.profile-form select').formSelect();

	// Tel
	$('input[type=tel]').mask('(999) 999-9999');

	//Disabling Billing Address Save Button

	const fields = ['address_1', 'city', 'ZIP'];

	if (fields.every((field) => $(`input#${field}`).val() === '')) {
		$('.btns-block__btn-save').attr('disabled', true);
		$('.btns-block__btn-cancel').attr('disabled', true);
	}

	fields.forEach((field) => {
		$(`input#${field}`).on('input', () => {
			if (!fields.every((f) => $(`input#${f}`).valid())) {
				$('.btns-block__btn-save').attr('disabled', true);
			} else {
				$('.btns-block__btn-save').removeAttr('disabled');
			}
		});
	});

	// Datepiker settings (see materialize documentation)
	// $('.datepicker').datepicker({
	//   // setDefaultDate: new Date(2000,01,31),
	//   // maxDate: new Date(currYear - 5, 12, 31),
	//   // format: 'mm/dd/yyyy',
	// });

	$('.profile-form .collapsible').collapse({ toggle: false });

	$('select#state_name').on('change', (e) => {
		$('.btns-block__btn-save').removeAttr('disabled');
		$('select#state_name').on('change', () =>
			setTimeout(() => $($('input.select-dropdown')[1]).blur(), 0)
		);
		$();
	});

	Promise.all([loadUserInfo(selectedId), loadAddressInfo(selectedId)])
		.then(async () => {
			animateBlink('yellow');
			// sync
			const sync = await fetch(`${apiUrl}op_sql_sync_up_personal.php`);
			const syncJson = await sync.json();
			
			if (syncJson.result && syncJson.result === 1) {
				$('.btns-block__blink').stop();
				stopAnimate('rgb(22 218 22)');
				loadAddressInfo(selectedId);
				loadUserInfo(selectedId);
				$('.btns-block__btn-save').off('click', billingDataSavehandler);
			} else if (syncJson.message && syncJson.message === 'error') {
				$('.btns-block__blink').stop();
				stopAnimate('red');
				$('.btns-block__btn-save').off('click', billingDataSavehandler);
			}
		})
		.catch(err => {
			console.log('catch', err)
			stopAnimate('red');
		})

	async function loadAddressInfo(userId) {
		// console.log('loadAddressInfo')
		try {
			

			const response = await fetch(
				`${apiUrl}sql_get_contact_w_address_by_id.php?id=${userId}`,
				{ mode: 'no-cors' }
			);
			const json = await response.json();
			// return await response.json()


			// console.log('loadAddressInfo', json)
			/* return
		 {"customer":{"contact_id":"2240","firstname":"Alex","lastname":"Sokolov","birthday":"2018-12-31","email":"alex.code.keen@gmail.com","gender":"1","is_over_18":"1"},
		 "pets":[
			 {"pet_id":"2368","contact_id":"2240","pet_type_id":"1","title":"Schnapps","breed":"British","weight":"12.00","op_order":"0","is_active":"1"},
				{"pet_id":"2369","contact_id":"2240","pet_type_id":"1","title":"Jeremy","breed":"Labrador","weight":"12.00","op_order":"1","is_active":"1"}
			]}
		*/
			const userAddress = json.address;
			const profileForm = $('#profile-form');
			// Update other fields
			Object.entries(userAddress).forEach(([key, value]) => {
				if (key === 'state_name') {
					profileForm
						.find(`#${key}`)
						.find(`option:contains(${value})`)
						.attr('selected', true);
					$('select#state_name').parent().find('input').val(value);
				} else {
					profileForm.find(`#${key}`).val(value);
				}
				profileForm.find(`label[for="${key}"]`).toggleClass('active');
			});

			$(".form-block__heading:contains('Billing Address')")
				.closest('.form-block')
				.find('.collapsible-body input')
				.each((i, el) => {
					$(el).attr('data-old', $(el).val());
					$(el).on('focus', () => {
						$('.btns-block__btn-save').removeAttr('disabled');
						$('.btns-block__btn-cancel').removeAttr('disabled');
					});
					$(el).on('focusout', () => {
						if ($(el).attr('data-old') === $(el).val()) {
							$('.btns-block__btn-save').attr('disabled', true);
						}
					});
				});

				$('.btns-block__btn-save').on('click', billingDataSavehandler);

				

				$('.btns-block__btn-cancel').on('click', cancelHandler);

		} catch (err) {
			console.log(err);
		}
	}

	function billingDataSavehandler(e) {
		e.preventDefault();
		updateBillingForm()
			.done((data) => {
				if (data !== '1') {
					cancelHandler();
				} else {
					$(".form-block__heading:contains('Billing Address')")
						.closest('.form-block')
						.find('.collapsible-body input')
						.each((i, el) => {
							let newVal = $(el).val();
							$(el).val(newVal);
							$(el).attr('data-old', newVal);
							$(el).css({
								'border-bottom': '1px solid #9e9e9e',
								'box-shadow': 'none',
							});
							$(el).focusout();
						});
				}
				$('.btns-block__btn-cancel').attr('disabled', true);
				$('.btns-block__btn-save').attr('disabled', true);
			})
			.fail(() => {
				$('.btns-block__btn-save').attr('disabled', true);
			});
	}

	async function loadUserInfo(userId) {
		// showSpinner();
		try {

			// animateBlink('yellow');
			// // sync
			// const sync = await fetch(`${apiUrl}op_sql_sync_up_personal.php`);
			// const syncJson = await sync.json();

			// if (syncJson.result && syncJson.result === 1) {
			// 	$('.btns-block__blink').stop();
			// 	stopAnimate('rgb(22 218 22)');
			// } else if (syncJson.message && syncJson.message === 'error') {
			// 	$('.btns-block__blink').stop();
			// 	stopAnimate('red');
			// }

			const response = await fetch(
				`${apiUrl}sql_get_contact_pets_by_id.php?id=${userId}`,
				{ mode: 'no-cors' }
			);
			const json = await response.json();
			// return await response.json();
			// console.log('loadUserInfo', json)
			// hideSpinner();
			
			// select states
			populateStates();

			/* return
		 {"customer":{"contact_id":"2240","firstname":"Alex","lastname":"Sokolov","birthday":"2018-12-31","email":"alex.code.keen@gmail.com","gender":"1","is_over_18":"1"},
		 "pets":[
			 {"pet_id":"2368","contact_id":"2240","pet_type_id":"1","title":"Schnapps","breed":"British","weight":"12.00","op_order":"0","is_active":"1"},
				{"pet_id":"2369","contact_id":"2240","pet_type_id":"1","title":"Jeremy","breed":"Labrador","weight":"12.00","op_order":"1","is_active":"1"}
			]}
		*/
			const userData = json.customer;
			const profileForm = $('#profile-form');
			// Change birthday date format
			userData.birthday = new Date(userData.birthday).toLocaleDateString('en-US');
			$('#welcome-name').text(userData.firstname);

			// Update gender
			let gender = userData.gender == 1 ? 'male' : 'female';
			profileForm
				.find(`input[name="gender"][id="${gender}"`)
				.attr('checked', true);
			delete userData.gender;

			// Update other fields
			Object.entries(userData).forEach(([key, value]) => {
				// console.log(`${key}`, value)
				// if (key === 'phone') {
				// 	value = value.slice(0);
				// }
				if (key === 'birthday') {
					let dateArr = value.split('/');
					dateArr = dateArr.map((el) =>
						el.length < 2 ? el.padStart(2, '0') : el
					);
					profileForm.find(`#${key}`).val(dateArr.join('/'));
					$('.datepicker').datepicker({
						setDefaultDate: true,
						defaultDate: new Date(`${dateArr[2]}-${dateArr[0]}-${dateArr[1]}`),
						onOpen() {
							function formatDate(date) {
								const arr = date.split('/');
								return `${arr[2]}-${arr[0]}-${arr[1]}`;
							}
							const field = 'bday';
							const okButton = $('.datepicker-modal').find(
								'button.datepicker-done'
							);

							const input = $('#birthday');
							okButton.unbind('click').bind('click', (e) => {

								const date = $('.datepicker').val();
								const formatedDate = formatDate(date);
								fieldUpdate('profile', field, 2240, formatedDate)
									.done((data) => {
										if (data !== '1') {
											input.val(input.attr('data-old'));
										} else {
											input.attr('data-old', input.val());
										}
									})
									.fail(() => {
										input.val(input.attr('data-old'));
									});
							});
						},
						format: 'mm/dd/yyyy',
					});
					$('label[for="birthday"]').toggleClass('active');
					profileForm.find(`#${key}`).attr('data-old', dateArr.join('/'));
				} else {
					profileForm.find(`#${key}`).val(value);
				}

				// profileForm
				// 	.find('#phone')
				// 	.attr(
				// 		'data-old',
				// 		`(${value.slice(0, 3)}) ${value.slice(3, 6)} ${value.slice(6)}`
				// 	);
				profileForm.find(`label[for="${key}"]`).toggleClass('active');
			});

			// Trigger phone for apply mask
			// $('input#phone').trigger('input');
		} catch (error) {
			console.log(error);
		}
	}

	function updatePhone(e) {
		const input = $(e.target);
		const name = input.attr('name');
		const newValue = input.val();
		fieldUpdate('profile', name, 2240, newValue)
			.done((data) => {
				if (data !== '1') {
					input.val(prevValue);
				} else {
					input.attr('data-old', newValue);
				}
			})
			.fail(() => {
				input.val(input.attr('data-old'));
			});
	}

	$('#phone').on('keypress', (ev) => {
		// ev.preventDefault();
		if (ev.keyCode === 13) {
			if ($('#phone').valid()) {
				$('#phone').blur();
			}
		}
	});

	$('#phone').on('blur', (e) => {
		if (e.target.value === $(e.target).attr('data-old')) {
			return;
		}
		if ($('#phone').valid()) {
			updatePhone(e);
		}
	});

	$('.edit-field').on('click', (e) => {
		const input = $(e.target).parent().find('input');
		const field = $(e.target)
			.parent()
			.find('input')
			.attr('class')
			.split(' ')[0];
		const prevValue = input.val();
		input.attr('data-old', prevValue);

		// } else {
		input.removeAttr('disabled');
		$(e.target).addClass('hidden');
		const checkBox = createElement(
			'input',
			'hidden',
			'confirm-changes',
			'filled-in'
		);
		const div = createElement('div');
		$(div).css({
			position: 'absolute',
			width: '20px',
			height: '20px',
			bottom: '37px',
			left: 'calc(100% - 30px)',
		});
		const label = createElement('label');
		const span = createElement('span');

		$(checkBox).attr('type', 'checkbox');

		label.append(checkBox);
		label.append(span);
		div.append(label);
		$(e.target).parent().append(div);
		input.focus();
		input.addClass('active');
		// TODO server request
		if (input.val() === '') {
			$(checkBox).attr('disabled', true);
		}
		input.on('input', (e) => {
			if (input.val() === '' || !input.valid()) {
				$(checkBox).attr('disabled', true);
			} else {
				$(checkBox).removeAttr('disabled');
			}
		});

		$(checkBox).click(function (ev) {
			$(checkBox).prop('checked', !$(checkBox).prop('checked'));
			if ($(checkBox).prop('checked')) {
				let newText = input.val();
				fieldUpdate('profile', field, 2240, newText)
					.done((data) => {
						if (data !== '1') {
							input.val(input.attr('data-old'));
						}
					})
					.fail(() => {
						input.val(input.attr('data-old'));
					});
				setTimeout(() => {
					$(label).removeClass('hidden');
					$('.edit-field').removeClass('hidden');
					input.css({
						'box-shadow': 'none',
					});
					input.attr('disabled', true);
					input.removeClass('active');
					label.remove();
					div.remove();
				}, 1000);
			}
			// }
		});
		input.blur(() => {
			if ($(checkBox).prop('checked')) {
				$(label).addClass('hidden');
			}
		});
		// }
	});

	

	function cancelHandler(e) {
		$(".form-block__heading:contains('Billing Address')")
			.closest('.form-block')
			.find('.collapsible-body input')
			.each((i, el) => {
				$(el).val($(el).attr('data-old'));
				$(el).css({ 'border-bottom': '1px solid #9e9e9e', 'box-shadow': 'none' });
				$(el).focusout();
			});
		$('.btns-block__btn-cancel').attr('disabled', true);
	}

	function fieldUpdate(page, field, id, text) {
		if (page === 'profile') {
			const body = {
				id,
				[field]: field === 'phone' ? text.replace(/\D/g, '') : text,
			};
			return $.post(`sql/sql_update_contact_${field}.php`, { ...body });
		} else if (page === 'myPets') {
			const body = {
				pet_id: id,
				[field]: text,
			};
			return $.post(`sql/sql_update_pet_${field}.php`, { ...body });
		}
	}

	function updateBillingForm() {
		const body = {
			id: 2240,
			address1: $('#address_1').val(),
			address2: $('#address_2').val(),
			city: $('#city').val(),
			state_code: $('#state_name').val(),
			zip: $('#ZIP').val(),
		};
		return $.post(`sql/op_sql_update_contact_address.php`, { ...body });
	}

	function createElement(tag, ...classes) {
		const element = document.createElement(tag);
		if (classes) {
			for (let clazz of classes) {
				element.classList.add(clazz);
			}
		}
		return element;
	}
})()
