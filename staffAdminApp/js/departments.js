(() => {
	const apiUrl = './sql';
	let chosenDepartmentId;
	let currentDepartments = [];

	showSpinner();
	getData(`${apiUrl}/sql_v_departments_01.php`)
		.then(deps => {
			hideSpinner();
			$('.main').append(generateHeader('Departments'));

			$('.main').append(`
				<div id="jstree"></div><br />`);

			$('.main').append(generateCRUDControlBlock());

			if (!chosenDepartmentId) {
				$('.CRUDControlBlock__right-wrapper').append('<span class="CRUDControlBlock__choose-dep">Please, choose a department</span>')
			}

			getData(`${apiUrl}/sql_v_permissions_zones.php`)
				.then((data) => {
					const $selectPosssible = $('.CRUDControlBlock__possible .CRUDControlBlock__select');
					const $selectCurrent = $('.CRUDControlBlock__current .CRUDControlBlock__select');

					$selectCurrent.attr('size', '2');
					$selectPosssible.attr('size', `${data.length}`);

					data.forEach((opt) => {
						$('.CRUDControlBlock__possible .CRUDControlBlock__select').append(
							`<option value="${opt.id}">${opt.description}</option>`
						)
					});

					const selectedOptsCurr = $('.CRUDControlBlock__current .CRUDControlBlock__select option:selected');		
					if (selectedOptsCurr.length == 0) {
							$('.CRUDControlBlock__btn.btn.btn--submit').attr('disabled', true);
							$('.CRUDControlBlock__btn.btn--right').attr('disabled', true);
					}

					const selectedOptsPos = $('.CRUDControlBlock__possible .CRUDControlBlock__select option:selected');
					if (selectedOptsPos.length == 0) {
						$('.CRUDControlBlock__btn.btn--left').attr('disabled', true);
					}

					$('.CRUDControlBlock__btn.btn--right').click(function(e) {
						$('.modal-window__body input:checkbox').change(function() {
							// console.log($(this).prop('checked'));
						});
						
						const selectedOpts = $('.CRUDControlBlock__current .CRUDControlBlock__select option:selected');
						const dep = $(selectedOpts).clone();
						dep.text(dep.text().slice(0, -6));
						$selectPosssible.append(dep);
						selectedOpts.remove();

						if ($('.CRUDControlBlock__current .CRUDControlBlock__select option:selected').length == 0) {
							$('.CRUDControlBlock__btn.btn--right').attr('disabled', true);
							
						}

						// get changed deps to assign them 0000
						// const optValues = getRestOptionValues();
						// const zeroDeps = currentDepartments.filter(el => !optValues.includes(el.perm_zone_id)).map(el => ({...el, crud: '0000'}));

						// option click to enable button
						$('.CRUDControlBlock__possible .CRUDControlBlock__select option').click(function(e) {
							$('.CRUDControlBlock__btn.btn--left').attr('disabled', false);
						});

						e.preventDefault();
					});

					// Left arrow button click
					$('.CRUDControlBlock__btn.btn--left').click(function(e) {
						$(document.body).append(generateModalWindow());
						$('.modal-window__body input:checkbox').change(function() {
							// console.log($(this).prop('checked'));
						});

						handleModalToggle();

						$('.modal-window__footer .modal-window__btn--cancel').click(function() {
							$('.modal-window').remove();
						});

						$('.modal-window__footer .modal-window__btn--apply').click(function() {
							if (checkApply()) {
								$('.CRUDControlBlock__btn.btn.btn--submit').attr('disabled', false);
								const selectedOpts = $('.CRUDControlBlock__possible .CRUDControlBlock__select option:selected');
								const str = getCheckboxValues().map(el => el === true ? '1' : '0').join('');
								const id = $(selectedOpts).attr('value');
								currentDepartments = currentDepartments.map(el => el.perm_zone_id === id ? ({...el, crud: str}) : el).concat({perm_zone_id: id, crud: str});
	
								const dep = $(selectedOpts).clone();
								
								dep.text(`${dep.text()} (${str})`);
								$selectCurrent.append(dep);
								$(selectedOpts).remove();

								if ($('.CRUDControlBlock__possible .CRUDControlBlock__select option:selected').length == 0) {
									$('.CRUDControlBlock__btn.btn--left').attr('disabled', true);
								}

								e.preventDefault();

								$('.modal-window').remove();

								// option click to enable button
								$('.CRUDControlBlock__current .CRUDControlBlock__select option').click(function(e) {
									$('.CRUDControlBlock__btn.btn--right').attr('disabled', false);
									$('.CRUDControlBlock__btn.btn.btn--submit').attr('disabled', false);
								});


								$('.CRUDControlBlock__current .CRUDControlBlock__select option').click(function(e) {
									$('.CRUDControlBlock__btn.btn--right').attr('disabled', false);
								})

							} else {
								$('.modal-window').remove();
							}
						});
					});
				});

				$('.CRUDControlBlock__btns button[type="submit"]').click(function(e) {
					e.preventDefault();
					// get changed deps to assign them 0000
					const optValues = getRestOptionValues();
					// console.log('currentDepartments', currentDepartments, optValues)
					const optValuesArrObjs = optValues.map(opt => {
						return {
							perm_zone_id: opt,
							crud: currentDepartments.find(el => {
								return el.perm_zone_id === opt
							}).crud,
						}
					});

					const zeroDeps = currentDepartments.filter(el => !optValues.includes(el.perm_zone_id)).map(el => ({...el, crud: '0000'}));
					const data = optValuesArrObjs.concat(zeroDeps);

					Promise.all(data.map(el => {
						return updateDeptPermission(chosenDepartmentId, el.perm_zone_id, el.crud)
					})).then(res => {
						if (!res.every(el => el.message === 'success')) {
							throw new Error()
						}
					})
					.catch(err => console.log('err', err))
				})

			// const root = data.find(el => el.parent_id === null);

			function updateChild(currEL, id) {
				const children = deps.filter(el => el.parent_id === id);
				currEL.children = children;
				currEL.state = {
					"opened": true,
					"disabled": false,
					"selected": false
				}
			}

			deps.forEach(el => updateChild(el, el.id));

			$('#jstree').jstree({
				core: {
					// data: [{
					// 	id: "1", text: "CEO", parent_id: null, "state": {
					// 		"opened": true,
					// 		"disabled": false,
					// 		"selected": false
					// }, children: [
					// 		{
					// 			id: "2", text: "Customer Support Department", parent_id: "1", "state": {
					// 				"opened": true,
					// 				"disabled": false,
					// 				"selected": false
					// 		}, children: []
					// 		},
					// 		{
					// 			id: "3", text: "Marketing Department", parent_id: "1", "state": {
					// 				"opened": true,
					// 				"disabled": false,
					// 				"selected": false
					// 		}, children: []
					// 		},
					// 	]
					// }],
					data: [deps[0]],
					"themes":{
						"icons":false
					}
				}
			});

			$('#jstree').bind("ready.jstree", function () {
				$('.jstree-anchor').on('click', function(e) {
					const id = $(this).attr('id').match(/\d/)[0];
					console.log('id', id)
					chosenDepartmentId = id;
						Promise.all([
							getData(`${apiUrl}/sql_v_departments_permissions.php`), 
							getData(`${apiUrl}/sql_v_employees_01.php`),
							getData(`${apiUrl}/sql_v_permissions_zones.php`)
						])
							.then(([departments, employees, permissionZones]) => {
								currentDepartments.length = 0;
								const departmentPermissions = departments.filter(el => el.department_id === id);
								const $selectCurrent = $('.CRUDControlBlock__current .CRUDControlBlock__select');
								const $selectPossible = $('.CRUDControlBlock__possible .CRUDControlBlock__select');

								$selectCurrent.html('');
								$selectPossible.html('');
								$selectCurrent.attr('size', `${departmentPermissions.length > 1 ? departmentPermissions.length : 2}`);
								// console.log('departmentPermissions', departmentPermissions)
								departmentPermissions.forEach((opt) => {
									currentDepartments.push({'perm_zone_id': opt.perm_zone_id, crud: opt.CRUD });

									$($selectCurrent).append(
										`<option value="${opt.perm_zone_id}">${opt.perm_zone_name} (${opt.CRUD})</option>`
									);
								});

								permissionZones.forEach((opt) => {
									$selectPossible.append(
										`<option value="${opt.id}">${opt.description}</option>`
									)
								});

								currentDepartments.forEach(el => {
									$selectPossible.find(`option[value="${el.perm_zone_id}"]`).remove();
								});
								$selectPossible.append($selectPossible.find('option').filter(function(i, el) {
									return !currentDepartments.includes(el.value)
								}));

								// option click to enable button
								$('.CRUDControlBlock__current .CRUDControlBlock__select option').click(function(e) {
									$('.CRUDControlBlock__btn.btn.btn--submit').attr('disabled', false);
									$('.CRUDControlBlock__btn.btn--right').attr('disabled', false);
								});


								$('.CRUDControlBlock__possible .CRUDControlBlock__select option').click(function(e) {
									$('.CRUDControlBlock__btn.btn--left').attr('disabled', false);
								});

								const employeesOfDepartment = employees.filter(empl => empl.department_id === id);
								console.log('employeesOfDepartment', employees, employeesOfDepartment, id)
								generateDepartmentInfo(employeesOfDepartment);

							})
				})
			}).jstree();

			// $('.main').append(`
			// 		<h3 style="color: #000; font-size: 28px" class="header-block__title">Department Info:</h3>
		
			// 		<div class="dep-info-block">
			// 			<ol class="dep-info"></ol>
			// 		</div>
			// 	`);
				
			// generateDepartmentInfo();

		})

	function generateCRUDControlBlock() {
		return `
			<div class="CRUDControlBlock">
				<div class="CRUDControlBlock__left">
					${generateHeader('Permissions')}
					<div class="CRUDControlBlock__left-wrapper">
						<div class="CRUDControlBlock__current">
							<b>Current:</b><br/>
							<select class="CRUDControlBlock__select">
								
							</select>
						</div>
						<div class="CRUDControlBlock__btns">
							<div class="CRUDControlBlock__btns-wrapper">
								<button class="CRUDControlBlock__btn btn btn--left">
									<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4z"/></svg>
								</button>
								<button class="CRUDControlBlock__btn btn btn--right">
									<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4z"/></svg>
								</button>
							</div>
							<button class="CRUDControlBlock__btn btn btn--submit"" type="submit">Submit</button>
						</div>
						<div class="CRUDControlBlock__possible">
							<b>Possible: </b><br/>
							<select class="CRUDControlBlock__select">
							</select>
						</div>
					</div>
				</div>
				<div class="CRUDControlBlock__right">
					${generateHeader('Employees')}
					<div class="CRUDControlBlock__right-wrapper">
					</div>
				</div>
			</div>
			<br />
		`;
	}

	function generateModalWindow() {
		const template = `
			<div class="modal-window">
				<div class="modal-window__content">
					<h4>Select Permission Type</h4>
					<ul class="modal-window__body">
						<li>
							<label>Create: <input type="checkbox"></label>
						</li>
						<li>
							<label>Read: <input type="checkbox"></label>
						</li>
						<li>
							<label>Update: <input type="checkbox"></label>
						</li>
						<li>
							<label>Delete: <input type="checkbox"></label>
						</li>
					</ul>
					<div class="modal-window__footer">
						<button class="modal-window__btn modal-window__btn--cancel">Cancel</button>
						<button class="modal-window__btn modal-window__btn--apply">Apply</button>
					</div>
				</div>
			</div>
		`;
		return template;
	}

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
			
	function showSpinner() {
		if (!$('.loader').length) {
			$('.main').append('<div class="loader"></div>');
		}
	}
		
	function hideSpinner() {
		$('div.loader').remove();
	}

	function getRestOptionValues() {
		const values = [];
		$('.CRUDControlBlock__current .CRUDControlBlock__select option').each((i, el) => {
			values.push($(el).attr('value'));
		});
		return values;
	}

	function handleModalToggle() {
		document.addEventListener('click', function(evt) {
			const path = (evt.composedPath && evt.composedPath()) || evt.path;
			if (path.includes(document.querySelector('.modal-window')) && !path.includes(document.querySelector('.modal-window__content'))) {
				document.querySelector('.modal-window').remove();
			} 
		})
	}

	function checkApply() {
		return $.makeArray($('.modal-window__body input:checkbox').map((i, el) => $(el).prop('checked'))).some(el => el === true)
	}

	function getCheckboxValues() {
		return $.makeArray($('.modal-window__body input:checkbox').map((i, el) => $(el).prop('checked')));
	}

	function updateDeptPermission(deptId, permZoneId, crud) {
		return fetch(`./${apiUrl}/sql_insert_update_dept_perm_01.php?dept_id=${deptId}&perm_zone_id=${permZoneId}&crud=${crud}`)
			.then(r => r.json())
			.then(data => data)
			.catch(console.error)
	}

	function generateDepartmentInfo(employees) {
		$('.CRUDControlBlock__dep-info').html('');

		$('.CRUDControlBlock__right-wrapper').append(
			`<div class="CRUDControlBlock__dep-info">
				<ul class="CRUDControlBlock__dep-employees"></ul>
			</div>`
		);
		$('.CRUDControlBlock__choose-dep').remove();


		if (!employees.length) {	
			$('.CRUDControlBlock__dep-employees').append('<li>There are no employees in this department</li>');
		}

		employees.forEach(empl => {
			$('.CRUDControlBlock__dep-employees').append(
				`<li>${empl.fname} ${empl.lname}</li>`
			);
		});		
	}

	function generateHeader(title) {
		return `
			<div class="header-block header-block--wider">
				<div class="header-block__container">
					<h4 class="header-block__title">${title}</h4>
				</div>
			</div>
		`;
	}
})()