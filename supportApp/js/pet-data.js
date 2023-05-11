(() => {
	const apiUrl = './sql/';

	loadUserInfo(userId);

	// Spinner
	function showSpinner() {
		$('.pets-section').append('<div class="loader"></div>');
	}

	function hideSpinner() {
		$('div.loader').hide();
	}



	async function loadUserInfo(userId) {
		console.log(`userId`, userId)
		try {
			showSpinner();
			const response = await fetch(
				`${apiUrl}sql_get_contact_pets_by_id.php?id=${userId}`
			);
			const json = await response.json();
			console.log(`json`, json)

			let petsData = json.pets.filter(pet => pet.is_active !== '0');

			hideSpinner();
			$('.pets-section').append(
				`<div class="row header-block header-block--wider">
						<div class="header-block__container">
							<h3 class="header-block__title">Pet Data</h3>
						</div>
					</div>
					<br />
					<div id="carousel-example-generic" class="carousel slide row">
					 ${petsData.length > 1 ? `<ol class="carousel-indicators">
							<li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
							<li data-target="#carousel-example-generic" data-slide-to="1"></li>
						</ol>` : ''}
						<div class="carousel-inner" role="listbox"></div>
						<!-- Controls -->
						${petsData.length > 1 ? `<a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
							<span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
							<span class="sr-only">Previous</span>
						</a>
						<a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
							<span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
							<span class="sr-only">Next</span>
						</a>` : ''}
					</div>
				`
			);

			// let petsData = json.pets.filter(pet => pet.is_active !== '0');
			console.log(`petsData`, petsData)
			// petsData.length = 0;
			if (petsData.length === 2) {
				console.log(2)

				petsData.forEach((pet, i) => {
					const carousel = $('section#pets-section .carousel .carousel-inner');
					carousel.append(displayPetsData(pet, i, petsData));
					checkControls();
					$('.carousel').on('slid.bs.carousel', () => {
						checkControls()
					});
					// update image
					$('.edit-sign input').on('change', function () {
						console.log('type file')
						readURL(this);
					});
					$('.carousel').carousel({ wrap: false, interval: false });
					const image = `${apiUrl}sql_v_get_pet_image_by_pet_id.php?pet_id=${pet.pet_id}`;

					$('.edit-pet-info').click(editPetInfo);
					$('.edit-pet-info-icons svg.svg-apply').click(applyNewValueHandler);
					$('.edit-pet-info-icons svg.svg-cancel').click(cancelEditPetInfoHandler);

					checkIfImageCorrectlyLoaded(pet.pet_id)
						.then((res) => {
							//console.log(res)
							if (res.size === 0) {
								$(`.pet-img-palm`).addClass('hidden')
								$(`#petPhoto-${pet.pet_id}`).attr('src', image).addClass('hidden')
								$('.edit-btn').append(`
									<div class="pet-img-palm" style="position: relative; width: 250px; height: 250px; display: flex;">
										<img src="img/icons/icon-circle.svg" />
										<img src="img/icons/icon-palm.svg" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);" />
									</div>
								`)
							} else {
								$(`.pet-img-palm`).remove()
								$(`#petPhoto-${pet.pet_id}`).attr('src', image).removeClass('hidden')
							}

						})
						.catch((err) => console.log(err));

				})

				$('.carousel-item.active input:radio').click(radioHandler);

				$('.carousel').on('slid.bs.carousel', () => {
					$('.carousel-item.active input:radio').off('click', radioHandler);
					$('.carousel-item.active input:radio').click(radioHandler);

				});

				radioCheck(petsData);
			} else if (petsData.length === 1) {
				console.log(1)
				// petsData = [...petsData, {breed: '', contact_id: '', is_active: '', op_order: '', pet_id: '', pet_type_id: '', title: '', weight: ''}]
				petsData.forEach((pet, i) => {
					const carousel = $('section#pets-section .carousel .carousel-inner');
					carousel.append(displayPetsData(pet, i, petsData));
					checkControls();
					$('.carousel').on('slid.bs.carousel', checkControls);
					$('.carousel').carousel({ interval: false, wrap: false });
					const image = `${apiUrl}sql_v_get_pet_image_by_pet_id.php?pet_id=${pet.pet_id}`;

					
					$('.edit-pet-info').click(editPetInfo);
					$('.edit-pet-info-icons svg.svg-apply').click(applyNewValueHandler);
					$('.edit-pet-info-icons svg.svg-cancel').click(cancelEditPetInfoHandler);
					

					$('.carousel').on('slid.bs.carousel', () => {
						if ($('.carousel-item.active').attr('id') !== '') {
							console.log('!==')
							$('.edit-pet-info').click(editPetInfo);
							$('.edit-pet-info-icons svg.svg-apply').click(applyNewValueHandler);
							$('.edit-pet-info-icons svg.svg-cancel').click(cancelEditPetInfoHandler);
						} else {
							$('.edit-pet-info').off('click', editPetInfo);
							$('.edit-pet-info-icons svg.svg-apply').off('click', applyNewValueHandler);
							$('.edit-pet-info-icons svg.svg-cancel').off('click', cancelEditPetInfoHandler);
						}
					})

					checkIfImageCorrectlyLoaded(pet.pet_id)
						.then((res) => {
							if (res) {
								if (res.size !== 0) {

									$(`#petPhoto-${pet.pet_id} `)
										.attr('src', image)
										.removeClass('hidden')
										.closest('.pic-edit')
										.css({ background: 'none' })
								} else {
									$('.edit-btn')
										.before(
											`<div class="pet-img-palm" style="position: relative; width: 250px; height: 250px; display: flex">
												<img src="img/icons/icon-circle.svg" />
												<img src="img/icons/icon-palm.svg" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);" />
											</div>`
										)
								}
							}
						})
						.catch((err) => console.log(err));

					$('.carousel-item.active input:radio').click(radioHandler);
					
					$('.carousel').on('slid.bs.carousel', () => {
						$('.carousel-item.active input:radio').off('click', radioHandler);
						$('.carousel-item.active input:radio').click(radioHandler);
						
					});
					
					radioCheck(petsData);

					$(document.body).append(generateModal());
					$('.createNewPet-btn').click(() => {
						const title = $('#petTitle').val();
						const breed = $('#petBreed').val();
						const weight = $('#petWeight').val();
						const pet_type_id = $('.modal-body input[type="radio"]:checked').val();
						if (!title || !breed || !weight || pet_type_id === undefined) {
							return;
						}
						const data = {
							pet_type_id: $('.modal-body input[type="radio"]:checked').val(),
							title,
							breed,
							weight,
							op_order: petsData[0].op_order === '0' ? '1' : '0',
						}
						createPet(data)
						.then(r => {
							console.log(r)
							return r.json();
						})
						.then(d => {
							if (d.result === 1) {
								window.location.reload();
							}
						})
						// .fail(err => console.log('err', err))
						.catch(err => console.log('err', err))
					})
				})
				
			} else if (petsData.length === 0) {
				console.log(0)
					const carousel = $('section#pets-section .carousel .carousel-inner');
				carousel.append(
					`<div class="carousel-item item active" id="">
				    <div class="card">
				      <div class="card-image">
								<div class="input-field profile-photo__pic">
									<div class="pic-edit">
										<!-- Button trigger modal -->
										<button type="button" class="btn btn-primary btn-md createNewPetModal-btn" data-toggle="modal" data-target="#myModal">
											Create New Pet
										</button>
										<div class="card-content">
											<h3>No animals to display</h3>
										</div>
									</div>
								</div>
				      </div>
				    </div>
				  </div>`
				);

				$(document.body).append(generateModal());
				$('.createNewPet-btn').click(() => {
					const title = $('#petTitle').val();
					const breed = $('#petBreed').val();
					const weight = $('#petWeight').val();
					const pet_type_id = $('.modal-body input[type="radio"]:checked').val()
					if (!title || !breed || !weight || pet_type_id === undefined) {
						return;
					}
					const data = {
						pet_type_id: $('.modal-body input[type="radio"]:checked').val(),
						title,
						breed,
						weight,
						op_order: '0',
					}
					createPet(data)
						.then(r => {
							console.log(r)
							return r.json();
						})
						.then(d => {
							if (d.result === 1) {
								window.location.reload();
							}
						})
						// .fail(err => console.log('err', err))
						.catch(err => console.log('err', err))
				})
			}


		} catch (error) {
			console.log(error);
			hideSpinner()
		}
	}


	async function checkIfImageCorrectlyLoaded(imageId) {
		if (imageId) {
			const response = await fetch(
				`${apiUrl}sql_v_get_pet_image_by_pet_id.php?pet_id=${imageId}`
			);
			const data = response.blob();
			return data;
		}
	}


	function displayPetsData(pet, i, data) {
		// const json = [{ full: 'bruh bruh bruh', short: 'bruh', breed: 'bruh terier', weight: 6.9, staus: true }];
		return `
<div class="carousel-item item ${i === 0 ? 'active' : ''}" id=${pet.pet_id} data-order=${pet.op_order} data-type=${pet.pet_type_id}>
              <div class="card">
                <div class="card-image">
									<div class="input-field profile-photo__pic">
										<div class="pic-edit">
											<!-- Button trigger modal -->
											${data.length === 1 || data.length === 0 ? `<button type="button" class="btn btn-primary btn-md createNewPetModal-btn" data-toggle="modal" data-target="#myModal">
												Create New Pet
											</button>` : ''}
											<div class="pet-img-block">
												<img
													id="petPhoto-${pet.pet_id}"
													class="hidden"
													alt="your pet's photo"
													width="250"
													height="250"
												/>
												<div class="edit-btn" style="margin-top: 20px">
													<label class="edit-sign">
														<input type="file" />
														<span>Update Picture</span>
													</label>
												</div>
											</div>
                      
                      <!-- <label class="edit-sign">
                        <input type="file" />
											</label> -->
											<div class="card-content">
												<ul class="carousel-caption">
													<li class="title">
														<div class="li-wrapper">
															<span>Title:</span><span>${pet.title}</span>
															<i class="material-icons edit-pet-info">edit</i>
															<div class="edit-pet-info-icons">
																<svg class="svg-apply" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" fill="#bebebe" width="24px"><path d="M0 0h24v24H0z" fill="none"/><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>
																<svg class="svg-cancel" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#bebebe" width="24px" height="24px"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
															</div>
														</div>
													</li>
													<li class="breed">
														<div class="li-wrapper">
															<span>Breed:</span><span>${pet.breed}</span>
															<i class="material-icons edit-pet-info">edit</i>
															<div class="edit-pet-info-icons">
																<svg class="svg-apply" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" fill="#bebebe" width="24px"><path d="M0 0h24v24H0z" fill="none"/><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>
																<svg class="svg-cancel" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#bebebe" width="24px" height="24px"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
															</div>
														</div>
													</li>
													<li class="weight">
														<div class="li-wrapper">
															<span>Weight in lbs:</span><span>${pet.weight}</span>
															<i class="material-icons edit-pet-info">edit</i>
															<div class="edit-pet-info-icons">
																<svg class="svg-apply" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" fill="#bebebe" width="24px"><path d="M0 0h24v24H0z" fill="none"/><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>
																<svg class="svg-cancel" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#bebebe" width="24px" height="24px"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
															</div>
														</div>
													</li>
													${i === 0 ? `<li class="type type1">
														<div class="li-wrapper">
															<div class="radio">
																<input type="radio" name="inlineRadioOptions1" id="inlineRadio1" /> 
																<label for="inlineRadio1" class="radio-inline">Cat</label>
															</div>
															<div class="radio">
																<input type="radio" name="inlineRadioOptions1" id="inlineRadio2" /> 
																<label for="inlineRadio2" class="radio-inline">Dog</label>
															</div>
														</div>
													</li>` :
				`<li class="type type2">
														<div class="li-wrapper">
															<div class="radio">
																<input type="radio" name="inlineRadioOptions2" id="inlineRadio3" /> 
																<label for="inlineRadio3" class="radio-inline">Cat</label>
															</div>
															<div class="radio">
																<input type="radio" name="inlineRadioOptions2" id="inlineRadio4" /> 
																<label for="inlineRadio4" class="radio-inline">Dog</label>
															</div>
														</div>
													</li>`}
												</ul>
												<!-- <div>
													${data.length === 1 && i === 0 ? `<span class="btn-new-pet">New Pet</span>` : data.length === 2 ? '' : `<span class="btn-new-pet">New Pet</span>`}
												</div> -->
                			</div>
										</div>
									</div>
                </div>
              </div>
            </div>
`;
	}

	function displayEmptyPetsData(pet, i, data) {
		// const json = [{ full: 'bruh bruh bruh', short: 'bruh', breed: 'bruh terier', weight: 6.9, staus: true }];
		return `<div class="carousel-item item ${i === 0 ? 'active' : ''}" id=${pet.pet_id} data-order=${pet.op_order}>
              <div class="card">
                <div class="card-image">
									<div class="input-field profile-photo__pic">
										<div class="pic-edit">
											<div class="pet-img-block">
												<img
													id="petPhoto-${pet.pet_id}"
													class="hidden"
													alt="your pet's photo"
													width="250"
													height="250"
												/>
												<div class="edit-btn edit-btn--disabled" style="margin-top: 20px">
													<label class="edit-sign edit-sign--disabled">
														<input type="file" />
														<span>Update Picture</span>
													</label>
												</div>
											</div>
                      
                      <!-- <label class="edit-sign">
                        <input type="file" />
											</label> -->
											<div class="card-content">
												<ul class="carousel-caption">
													<li class="title">
														<span>Title:</span><span></span>
														<i class="material-icons edit-pet-info">edit</i>
														<div class="edit-pet-info-icons">
															<svg class="svg-apply" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0z" fill="none"/><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>
															<svg class="svg-cancel" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#bebebe" width="24px" height="24px"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
														</div>
													</li>
													<li class="breed">
														<span>Breed:</span><span></span>
														<i class="material-icons edit-pet-info">edit</i>
														<div class="edit-pet-info-icons">
															<svg class="svg-apply" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0z" fill="none"/><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>
															<svg class="svg-cancel" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#bebebe" width="24px" height="24px"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
														</div>
													</li>
													<li class="weight">
														<span>Weight:</span><span></span>
														<i class="material-icons edit-pet-info">edit</i>
														<div class="edit-pet-info-icons">
															<svg class="svg-apply" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24px"><path d="M0 0h24v24H0z" fill="none"/><path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"/></svg>
															<svg class="svg-cancel" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#bebebe" width="24px" height="24px"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
														</div>
													</li>
													<!-- <li class="type">
														<div class="li-wrapper">
															<label class="radio-inline">
																Cat <input type="radio" name="inlineRadioOptions" id="inlineRadio1" value="1" disabled> 
															</label>
															<label class="radio-inline">
															 	Dog <input type="radio" name="inlineRadioOptions" id="inlineRadio2" value="2" disabled> 
															</label>
														</div>
													</li> -->
												</ul>
												<!-- <div>
													<span class="btn-new-pet">Create Pet</span>
												</div> -->
                			</div>
										</div>
									</div>
                </div>
              </div>
            </div>`;
	}

	// Show picked photo of user's pet
	function readURL(input) {
		if (input.files && input.files[0]) {
			const reader = new FileReader();
			const file = input.files[0];
			const id = $('.carousel-item.active').attr('id');
			reader.onload = function (e) {
				$(`#petPhoto-${id}`).attr('src', e.target.result).removeClass('hidden');
			};

			reader.onloadend = function (e) {
				if (e.target.readyState == FileReader.DONE) {
					// DONE == 2
					$.post(
						`${apiUrl}sql_ins_upd_pet_image_02.php`,
						{
							pet_id: id,
							file: e.target.result,
							name: file.name,
							type: file.type,
						},
						function (data) {
							//alert(data);
						}
					);
				}
			};

			reader.readAsDataURL(input.files[0]);
		}
	}

	function fieldUpdate(page, field, id, order, text) {
		if (page === 'myPets') {
			// console.log('page, field, id, text', page, field, id, text)
			const body = {
				pet_id: id,
				[field]: text,
				op_order: order
			};
			return $.post(`${apiUrl}op_sql_update_pet_${field}.php`, { ...body });
		}
	}

	function editPetInfo() {
		const parent = $(this).parent();
		const span = parent.find('span').eq(1);
		const prevValue = span.text();
		parent.children().not('span:eq(0)').hide();
		parent.find('input').remove();
		parent.find($('.edit-pet-info-icons')).before('<input type="text" style="width: 210px"/>')
		parent.find('input').val(prevValue);
		parent.find('input').focus();
		parent.find($('.edit-pet-info-icons')).css({ 'display': 'flex', 'margin-left': 'auto' });

	}

	function cancelEditPetInfoHandler() {
		$(this).closest('li').find('span').show();
		$(this).closest('li').find('.material-icons').show();
		$(this).parent().hide();
		$(this).closest('li').find('input').remove();
	}

	function applyNewValueHandler() {
		const newValue = $(this).closest('li').find('input').val();
		const field = $(this).closest('li').attr('class');
		const id = $(this).closest('.carousel-item').attr('id');
		const order = $(this).closest('.carousel-item').data('order');
		if (newValue.trim().length) {
			fieldUpdate('myPets', field, id, order, newValue)
				.then(r => {
					cancelEditPetInfoHandler.call(this);
					$(this).closest('li').find('input').val(newValue);
					$(this).closest('li').find('span').eq(1).text(newValue)

				})
			cancelEditPetInfoHandler.call(this);
			$(this).closest('li').find('input').val(newValue);
			$(this).closest('li').find('span').eq(1).text(newValue)
		} else {
			$(this).closest('li').find('input').addClass('error-input');
		}
	}

	function checkControls() {
		let $this = $('.carousel');
		if ($('.carousel-inner .item:first').hasClass('active')) {
			// Hide left arrow
			$this.children('.left.carousel-control').hide();
			// But show right arrow
			$this.children('.right.carousel-control').show();
		} else if ($('.carousel-inner .item:last').hasClass('active')) {
			// Hide right arrow
			$this.children('.right.carousel-control').hide();
			// But show left arrow
			$this.children('.left.carousel-control').show();
		} else {
			$this.children('.carousel-control').show();
		}
	}

	function radioCheck(data) {
		$('[name="inlineRadioOptions1"]').removeAttr('checked');
		$('[name="inlineRadioOptions2"]').removeAttr('checked');

		$('#inlineRadio1').prop('checked', data[0]?.pet_type_id === '2')
		$('#inlineRadio2').prop('checked', data[0]?.pet_type_id === '1')
		$('#inlineRadio3').prop('checked', data[1]?.pet_type_id === '2')
		$('#inlineRadio4').prop('checked', data[1]?.pet_type_id === '1');
	}

	function radioHandler (e) {
		console.log('radioHandler')
		e.preventDefault();
		e.stopPropagation();
		if (confirm('Do you wanna change type?')) {
			const id = $(this).closest('.carousel-item').attr('id');
			const order = $(this).closest('.carousel-item').data('order');
			const type = $(this).closest('.carousel-item').data('type') === 1 ? 2 : 1;
			const body = {
				id,
				op_order: order,
				type
			}
			fetch(`${apiUrl}op_sql_update_pet_type.php`, { method: 'POST', body: JSON.stringify(body) })
				.then(r => r.json())
				.then(d => {
					if (d.result === 1) {
						console.log('this', $(this).prop('checked', true))
					}
				})
				.catch(err => console.log('err', err))
		} else {
			return false;
		}
	}

	function generateModal() {
		return `
			<!-- Modal -->
			<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
							<h4 class="modal-title" id="myModalLabel">Create New Pet</h4>
						</div>
						<div class="modal-body">
							<div class="modal-body__input">
								<label for="petTitle">Title:</label>
								<input type="text" id="petTitle"/>
							</div>
							<div class="modal-body__input">
								<label for="petBreed">Breed:</label>
								<input type="text" id="petBreed"/>
							</div>
							<div class="modal-body__input">
								<label for="petWeight">Weight in lbs:</label>
								<input type="text" id="petWeight"/>
							</div>
							<div class="modal-body__input modal-body__input-radio">
								<div class="modal-body__radio-wrapper">
									<input type="radio" name="petType" id="petTypeRadio1" value="2"/>
									<label for="petTypeRadio1">Cat</label>
								</div>
								<div class="modal-body__radio-wrapper">
									<input type="radio" name="petType" id="petTypeRadio2" checked value="1"/>
									<label for="petTypeRadio2">Dog</label>
								</div>
							</div>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
							<button type="button" class="btn btn-primary createNewPet-btn">Create</button>
						</div>
					</div>
				</div>
			</div>
		`;
	}

	function createPet(petData) {
		const data = JSON.stringify(petData)
		// return $.post(`./sql/op_sql_insert_pet_www.php`, { ...petData })
		return fetch('./sql/op_sql_insert_pet_www.php', {method: 'POST', body: data })
	}

})()