$(() => {
	console.log('currDoctorId', currDoctorId)
	// console.log('permissions', permissions)

	const generateLiTemplate = (i, nested) => {
		if (nested) {
			return i.permZone ? `<li class="menu__item menu__item--switcher">
				<ul class="collapsible">
					<li class="menu__item">
						<div class="collapsible-header">
							<a 
								href='${i.href}' 
								class="nav-tooltipped menu__link menu__link--switcher"
								data-position=${i.position}
								data-tooltip=${i.toolTip}
								data-purpose='switch'
							>
								<span class="link-icon">
									${i.iconPath}
								</span>
								<span class="menu-link">${i.title}</span>
									<svg xmlns="http://www.w3.org/2000/svg" class="svg-expand" viewBox="0 0 24 24" fill="black" width="22" height="22"><path d="M0 0h24v24H0z" fill="none"/><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></svg>
							</a>
						</div>
						<div class="collapsible-body menu__list--nested">
							<ul class="menu__list menu__list--nested">
								${i.innerLinks.map(el => {
				return el.permZone ? `
									<li>						
										<a 
											href='${el.href}' 
											class="nav-tooltipped menu__link"
											data-position=${el.position}
											data-tooltip=${el.toolTip}
										>
											<span class="link-icon" style="background">
												${el.iconPath}
											</span>
											<span class="menu-link">${el.title}</span>
										</a>
									</li>
									` : null
			}).join('')}
							</ul>
						</div>
					</li>
				</ul>
			</li>` : null
		}
		return i.permZone ? `
			<li class="menu__item">
				<a 
					href='${i.href}' 
					class="nav-tooltipped menu__link"
					data-position=${i.position}
					data-tooltip=${i.toolTip}
				>
				<span class="link-icon">
					${i.iconPath}
				</span>
					<span class="menu-link">${i.title}</span>
				</a>
				${i.href === 'notifications.php' ? `<div class="noty-icon"><span>9</span></div>` : ''}
			</li>
		` : null
	};



	const getTemplate = (data = []) => {
		const items = data.map(i => {
			if (i.collapsible) {
				return generateLiTemplate(i, 'nested')
			}
			return generateLiTemplate(i);
		});


		return `
			<ul class="menu__list">
				${items.join('')}
			</ul>
		`
	}

	class Navigation {
		constructor(selector, links = [], options = {}, ) {
			this.$el = $(selector);
			this.links = links;
			this.options = options;

			this.init();
		}

		_getAllLinks(linksArr) {
			return linksArr.reduce((sum, curr) => {
				if (curr.hasOwnProperty('innerLinks')) {
					sum.push(...curr.innerLinks.map(el => el.href));
				}
				sum.push(curr.href);
				return sum;
			}, [])
		}

		_checkInnerLinkActive() {
			return currDoctorId !== 0;
			// linksArr.find(el => el.innerLinks)?.innerLinks.some(el => el.href === activeUrl);
		}

		_makeMenuSwitcherInactive() {
			let url = location.pathname.split('/').slice(-1)[0];
			// console.log('url _makeMenuSwitcherInactive', url)
			$('.menu__item--switcher .link-icon svg').eq(0).css('color', '#d0d0d0');
			$('.menu__item--switcher .menu-link').eq(0).css('color', '#d0d0d0');
			$(`.menu__link[href='${url}']`).find('.svg-expand').hide();
			const closedUrls = ['employee-details.php', 'add-employee.php'];
			$('.menu__link[href="employee-details.php"]').closest('.menu__item').find('.svg-expand').css('fill', '#d0d0d0');
			if (closedUrls.includes(url)) {
				$(`.menu__link[href='${url}']`).closest('.collapsible-body.menu__list--nested').prev().removeClass('active');
				$(`.menu__link[href='${url}']`).closest('.collapsible-body.menu__list--nested').css('display', 'none');
				$(`.menu__link[href='${url}']`)
					.closest('.menu__item')
					.find('.svg-expand')
					.removeClass('svg-expand--rotate');
			} else {
				$(`.menu__link[href='${url}']`).closest('.collapsible-body.menu__list--nested').prev().addClass('active');
				$(`.menu__link[href='${url}']`).closest('.collapsible-body.menu__list--nested').css('display', 'block');
				$(`.menu__link[href='${url}']`)
					.closest('.menu__item')
					.find('.svg-expand')
					.addClass('svg-expand--rotate');
			}
		}

		_makeMenuSwitcherActive() {
			let url = location.pathname.split('/').slice(-1)[0];
			$('.menu__item--switcher .link-icon svg').eq(0).css('color', '#7d807b');
			$('.menu__item--switcher .menu-link').eq(0).css('color', '#7d807b');
			$('.menu__link[href="employee-details.php"]').closest('.menu__item').find('.svg-expand').css('fill', '#7d807b');
			$('.svg-expand').removeClass('svg-expand--rotate');
			$(`.menu__link[href='${url}']`)
				.closest('.menu__item')
				.find('.svg-expand')
				.addClass('svg-expand--rotate');
			// console.log('url _makeMenuSwitcherActive', url)
			const closedUrls = ['employee-details.php', 'add-employee.php'];

			$(`.menu__link[href='${url}']`).closest('.collapsible-body.menu__list--nested').prev().addClass('active');
			$(`.menu__link[href='${url}']`).closest('.collapsible-body.menu__list--nested').css('display', 'block');
		}

		_handleColallapsible(target) {
			const $target = $(target);
			// console.log('target', $target)

			if ($target.hasClass('active')) {
				$target.next().slideUp({
					start() {
						// check if active menu link in collapsed menu
						const activeLink = $target.next().find('.menu__link.active');
						activeLink.removeClass('add-before');
						activeLink.addClass('no-before');
					},
					complete() {

					}
				});

				$target.find('.svg-expand').removeClass('svg-expand--rotate');
				$target.removeClass('active');
			} else {
				$target.next().slideDown({
					start() {
						const activeLink = $target.next().find('.menu__link.active');
						activeLink.removeClass('add-before');
						activeLink.addClass('no-before');
					},
					complete() {
						const activeLink = $target.next().find('.menu__link.active');
						activeLink.removeClass('no-before');
						activeLink.addClass('add-before');
					}
				});
				$target.find('.svg-expand').addClass('svg-expand--rotate');
				$target.addClass('active');
			}
		}


		_onClickCollapsible() {
			// console.log('_onClickCollapsible')
			$('.menu .collapsible .collapsible-header').on('click', (e) => {
				this._handleColallapsible(e.currentTarget);
			});
		}

		_offClickCollapsible() {
			$('.menu .collapsible .collapsible-header').off('click', (e) => {
				this._handleColallapsible(e.currentTarget);
			});
		}

		_setCustomEvents() {
			// Custom events
			history.pushState = (f => function pushState() {
				var ret = f.apply(this, arguments);
				window.dispatchEvent(new Event('pushstate'));
				window.dispatchEvent(new Event('locationchange'));
				return ret;
			})(history.pushState);

			history.replaceState = (f => function replaceState() {
				var ret = f.apply(this, arguments);
				window.dispatchEvent(new Event('replacestate'));
				window.dispatchEvent(new Event('locationchange'));
				return ret;
			})(history.replaceState);
		}

		init() {
			// console.log('INIT', currDoctorId)
			this.$el.html(getTemplate(this.links));
			// $(document.head).append('<script src="js/svg-inject.min.js"></script>')
			let activeEl;

			let url = location.pathname.split('/').slice(-1)[0];
			// console.log('url', url)
			if (!this._checkInnerLinkActive()) {
				this._makeMenuSwitcherInactive();
				this._offClickCollapsible();
				$('.menu .collapsible .collapsible-header').eq(1).on('click', (e) => {
					this._handleColallapsible(e.currentTarget);
				});
			} else {
				this._makeMenuSwitcherActive();
				this._onClickCollapsible();
			}

			// load js file 
			$.getScript(`js/${url.endsWith('php') ? url.slice(0, -4) : url.slice(0, -5)}.js`);

			this._setCustomEvents();

			// Handle button back in browser
			window.addEventListener('popstate', (e) => {
				window.dispatchEvent(new Event('locationchange'));
			});

			// Handle browser url change
			window.addEventListener('locationchange', function (e) {
				// TODO redraw menu

				url = location.pathname.split('/').slice(-1)[0];

				$(`#menu a[href]`).removeClass('active');
				activeEl = document.querySelector(`#menu a[href="${url}"]`);
				activeEl.classList.add('active');

				// Load html into container and load js file
				$('#container').load(`${url} .main`, (res) => {
					$.getScript(`js/${url.endsWith('php') ? url.slice(0, -4) : url.slice(0, -5)}.js`);
				});

				// const innerLinks = ['doctor-info.php', 'licenses-list.php'];

				// if (innerLinks.includes(url)) {
				// 	// $('#menu').find('.collapsible .menu__item').addClass('active');
				// 	$('.svg-expand').addClass('svg-expand--rotate');
				// 	$('#menu').find('.collapsible .collapsible-body.menu__list--nested').css('display', 'block');
				// }

			})

			activeEl = document.querySelector(`#menu a[href="${url}"]`);
			if (activeEl) {
				activeEl.classList.add('active');
			}



			// handle click by link in menu
			this._getAllLinks(this.links).forEach(function (link) {

				$(`a[href="${link}"]`).click(function (e) {
					e.preventDefault();

					if ($(e.currentTarget).attr('href') === url ||
						$(e.currentTarget).attr('href') === 'javascript:void(0);') {
						return;
					}
					const urlsWithoutQueryParams = [
						'employees.php',
						'add-employee.php',
						'departments.php',
						'add-department.php',
						'permissions.php',
						'notifications.php'
					];
					if (urlsWithoutQueryParams.includes(link)) {
						document.location.href = `${link}`;
					} else {
						document.location.href = `${link}?docID=${currDoctorId}`;
					}
				})
			})
		}
	}


	const data = [
		{
			href: 'employees.php',
			position: 'right',
			toolTip: 'Search',
			title: 'Select Employee',
			iconPath: `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" class="svg-inline--fa fa-search fa-w-16 svg-icon" role="img" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512">
					<path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
			</svg>`,
			permZone: permissions.employees,
		},
		{
			href: 'javascript:void(0);',
			position: 'right',
			toolTip: 'Active',
			title: 'Active Case',
			collapsible: true,
			iconPath: `<svg aria-hidden="true" viewBox="0 0 448 512" focusable="false" data-prefix="fas" data-icon="user" class="svg-inline--fa fa-user fa-w-14 svg-icon" role="img" xmlns="http://www.w3.org/2000/svg">
					<path fill="currentColor" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path>
			</svg>`,
			permZone: permissions.employees,
			innerLinks: [
				{
					href: 'employee-details.php',
					position: 'right',
					toolTip: 'Contact Info',
					title: 'Employee Details',
					iconPath: `<svg aria-hidden="true" viewBox="0 0 512 512" focusable="false" data-prefix="fas" data-icon="info-circle" class="svg-inline--fa fa-info-circle fa-w-16 svg-icon" role="img" xmlns="http://www.w3.org/2000/svg">
							<path fill="currentColor" d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"></path>
					</svg>`,
					permZone: permissions.employees,
				},
				{
					href: 'add-employee.php',
					position: 'right',
					toolTip: 'Pet Data',
					title: 'Add Employee',
					iconPath: `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" class="svg-inline--fa fa-plus fa-w-14 svg-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg>`,
					permZone: permissions.employees,
				}
			]
		},
		{
			href: 'javascript:void(0);',
			position: 'right',
			toolTip: 'Active',
			title: 'Departments',
			collapsible: true,
			iconPath: `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="sitemap" class="svg-inline--fa fa-sitemap fa-w-20 svg-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M128 352H32c-17.67 0-32 14.33-32 32v96c0 17.67 14.33 32 32 32h96c17.67 0 32-14.33 32-32v-96c0-17.67-14.33-32-32-32zm-24-80h192v48h48v-48h192v48h48v-57.59c0-21.17-17.23-38.41-38.41-38.41H344v-64h40c17.67 0 32-14.33 32-32V32c0-17.67-14.33-32-32-32H256c-17.67 0-32 14.33-32 32v96c0 17.67 14.33 32 32 32h40v64H94.41C73.23 224 56 241.23 56 262.41V320h48v-48zm264 80h-96c-17.67 0-32 14.33-32 32v96c0 17.67 14.33 32 32 32h96c17.67 0 32-14.33 32-32v-96c0-17.67-14.33-32-32-32zm240 0h-96c-17.67 0-32 14.33-32 32v96c0 17.67 14.33 32 32 32h96c17.67 0 32-14.33 32-32v-96c0-17.67-14.33-32-32-32z"></path></svg>`,
			permZone: permissions.departments,
			innerLinks: [
				{
					href: 'departments.php',
					position: 'right',
					toolTip: 'Search',
					title: 'Department Structure',
					iconPath: `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="scroll" class="svg-inline--fa fa-scroll fa-w-20 svg-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M48 0C21.53 0 0 21.53 0 48v64c0 8.84 7.16 16 16 16h80V48C96 21.53 74.47 0 48 0zm208 412.57V352h288V96c0-52.94-43.06-96-96-96H111.59C121.74 13.41 128 29.92 128 48v368c0 38.87 34.65 69.65 74.75 63.12C234.22 474 256 444.46 256 412.57zM288 384v32c0 52.93-43.06 96-96 96h336c61.86 0 112-50.14 112-112 0-8.84-7.16-16-16-16H288z"></path></svg>`,
					permZone: permissions.departments,
				},
				{
					href: 'add-department.php',
					position: 'right',
					toolTip: 'Doctor Data',
					title: 'Add Department',
					iconPath: `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" class="svg-inline--fa fa-plus fa-w-14 svg-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg>`,
					permZone: permissions.departments
				},
			]
		},

		{
			href: 'notifications.php',
			position: 'right',
			toolTip: 'Search',
			title: 'Notifications',
			iconPath: `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bell" class="svg-inline--fa fa-bell fa-w-14 svg-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M224 512c35.32 0 63.97-28.65 63.97-64H160.03c0 35.35 28.65 64 63.97 64zm215.39-149.71c-19.32-20.76-55.47-51.99-55.47-154.29 0-77.7-54.48-139.9-127.94-155.16V32c0-17.67-14.32-32-31.98-32s-31.98 14.33-31.98 32v20.84C118.56 68.1 64.08 130.3 64.08 208c0 102.3-36.15 133.53-55.47 154.29-6 6.45-8.66 14.16-8.61 21.71.11 16.4 12.98 32 32.1 32h383.8c19.12 0 32-15.6 32.1-32 .05-7.55-2.61-15.27-8.61-21.71z"></path></svg>`,
			permZone: {}
		},
		{
			href: 'permissions.php',
			position: 'right',
			toolTip: 'Search',
			title: 'Permissions',
			iconPath: `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="user-lock" class="svg-inline--fa fa-user-lock fa-w-20 svg-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M224 256A128 128 0 1 0 96 128a128 128 0 0 0 128 128zm96 64a63.08 63.08 0 0 1 8.1-30.5c-4.8-.5-9.5-1.5-14.5-1.5h-16.7a174.08 174.08 0 0 1-145.8 0h-16.7A134.43 134.43 0 0 0 0 422.4V464a48 48 0 0 0 48 48h280.9a63.54 63.54 0 0 1-8.9-32zm288-32h-32v-80a80 80 0 0 0-160 0v80h-32a32 32 0 0 0-32 32v160a32 32 0 0 0 32 32h224a32 32 0 0 0 32-32V320a32 32 0 0 0-32-32zM496 432a32 32 0 1 1 32-32 32 32 0 0 1-32 32zm32-144h-64v-80a32 32 0 0 1 64 0z"></path></svg>`,
			permZone: {}
		},
		{
			href: 'logout.php',
			position: 'right',
			toolTip: 'Active',
			title: 'Sign Out',
			iconPath: '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="sign-out-alt" class="svg-inline--fa fa-sign-out-alt fa-w-16 svg-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z"></path></svg>',
			permZone: {}
		}
	];

	// data.forEach(link => {
	// 	if (link.innerLinks) {
	// 		link.innerLinks.forEach(innerlink => {
	// 			innerlink.read = permissions[innerlink.href.slice(0, -4)]?.CRUD[1] === '1' || false
	// 		})
	// 	}
	// 	link.read = permissions[link.href.slice(0, -4)]?.CRUD[1] === '1' || false
	// })

	// console.log('data', data)

	const nav = new Navigation('#menu', data);
})
