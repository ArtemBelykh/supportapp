$(() => {

	const generateLiTemplate = (i, nested) => {
		if (nested) {
			return `
			<li class="menu__item menu__item--switcher">
				<ul class="collapsible">
					<li class="menu__item">
						<div class="collapsible-header">
							<a href='${i.href}' class="nav-tooltipped menu__link menu__link--switcher" data-position=${i.position} data-tooltip=${i.toolTip} data-purpose='switch'>
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
				return `
									<li>						
										<a href='${el.href}' class="nav-tooltipped menu__link" data-position=${el.position} title=${el.toolTip}>
											<span class="link-icon" style="background">
												${el.iconPath}
											</span>
											<span class="menu-link">${el.title}</span>
										</a>
										${el.href === 'contact-tickets.php' ? `<div class="noty-icon"><span></span></div>` : ''}
									</li>
									`
			}).join('')}
							</ul>
						</div>
					</li>
				</ul>
			</li>`
		}
		return `
			<li class="menu__item" data-toggle="tooltip" data-placement="${i.tooltipPosition}" title="${i.toolTip}">
				<a href='${i.href}' class="nav-tooltipped menu__link">
				<span class="link-icon">
					${i.iconPath}
				</span>
					<span class="menu-link">${i.title}</span>
				</a>
				${i.href === 'notifications.php' ? `<div class="noty-icon"><span></span></div>` : ''}
				${i.href === 'tickets.php' ? `<div class="noty-icon"><span></span></div>` : ''}
			</li>
		`
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
			return selectedId === 0;
			// linksArr.find(el => el.innerLinks)?.innerLinks.some(el => el.href === activeUrl);
		}

		_makeMenuSwitcherInactive() {
			let url = location.pathname.split('/').slice(-1)[0];
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
	
			$(`.menu__link[href='${url}']`).closest('.collapsible-body.menu__list--nested').prev().addClass('active');
			$(`.menu__link[href='${url}']`).closest('.collapsible-body.menu__list--nested').css('display', 'block');
		}

		_handleColallapsible(target) {
			$(target).find('.svg-expand').toggleClass('svg-expand--rotate');
			if ($(target).hasClass('active')) {
				this.$el.find('.collapsible .collapsible-header').removeClass('active');
				$(target).next().slideUp({
					start() {
						$('.collapsible .menu__link.active').removeClass('add-before');
						$('.collapsible .menu__link.active').addClass('no-before');
					},
					complete() {

					}
				});
			} else {
				this.$el.find('.collapsible .collapsible-header').addClass('active');
				$(target).next().slideDown({
					start() {
						$('.collapsible .menu__link.active').removeClass('add-before');
						$('.collapsible .menu__link.active').addClass('no-before');
					},
					complete() {
						$('.collapsible .menu__link.active').removeClass('no-before');
						$('.collapsible .menu__link.active').addClass('add-before');
					}
				});
			}
		}


		_onClickCollapsible() {
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
			this.$el.html(getTemplate(this.links));
			// $(document.head).append('<script src="js/svg-inject.min.js"></script>')
			let activeEl;

			let url = location.pathname.split('/').slice(-1)[0];
			if (this._checkInnerLinkActive()) {
				this._makeMenuSwitcherInactive();
				this._offClickCollapsible();
			} else {
				this._makeMenuSwitcherActive();
				this._onClickCollapsible();
			}

const onClickCollaps = this._onClickCollapsible();
			$('.menu .collapsible .collapsible-header .menu__link').on('click', function(event){
				var url = $(this).attr('data-tooltip');event.preventDefault()
				if (url === 'ActiveMenu') {
					onClickCollaps
				}
			})

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
			activeEl.classList.add('active');
			
			

			// handle click by link in menu
			this._getAllLinks(this.links).forEach(function (link) {

				$(`a[href="${link}"]`).click(function (e) {
					e.preventDefault();

					if ($(e.currentTarget).attr('href') === url ||
						$(e.currentTarget).attr('href') === 'javascript:void(0);') {
						return;
					}			

					
					document.location.href = `${link}`;
				})
			})
		}
	}

	
	const	data = [
		{
			href: 'doctors-list.php',
			position: 'right',
			toolTip: 'Search',
			title: 'Select Doctor',
			iconPath: `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" class="svg-inline--fa fa-search fa-w-16 svg-icon" role="img" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512">
					<path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
			</svg>`
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
			innerLinks: [
				{
					href: 'doctor-info.php',
					position: 'right',
					toolTip: 'Contact Info',
					title: 'Doctor Info',
					iconPath: `<svg aria-hidden="true" viewBox="0 0 512 512" focusable="false" data-prefix="fas" data-icon="info-circle" class="svg-inline--fa fa-info-circle fa-w-16 svg-icon" role="img" xmlns="http://www.w3.org/2000/svg">
							<path fill="currentColor" d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"></path>
					</svg>`,
				},
				{
					href: 'licenses-list.php',
					position: 'right',
					toolTip: 'Pet Data',
					title: 'Doctor Licenses',
					iconPath: `<svg aria-hidden="true" viewBox="0 0 512 512" focusable="false" data-prefix="fas" data-icon="paw" class="svg-inline--fa fa-paw fa-w-16 svg-icon" role="img" xmlns="http://www.w3.org/2000/svg">
							<path fill="currentColor" d="M256 224c-79.41 0-192 122.76-192 200.25 0 34.9 26.81 55.75 71.74 55.75 48.84 0 81.09-25.08 120.26-25.08 39.51 0 71.85 25.08 120.26 25.08 44.93 0 71.74-20.85 71.74-55.75C448 346.76 335.41 224 256 224zm-147.28-12.61c-10.4-34.65-42.44-57.09-71.56-50.13-29.12 6.96-44.29 40.69-33.89 75.34 10.4 34.65 42.44 57.09 71.56 50.13 29.12-6.96 44.29-40.69 33.89-75.34zm84.72-20.78c30.94-8.14 46.42-49.94 34.58-93.36s-46.52-72.01-77.46-63.87-46.42 49.94-34.58 93.36c11.84 43.42 46.53 72.02 77.46 63.87zm281.39-29.34c-29.12-6.96-61.15 15.48-71.56 50.13-10.4 34.65 4.77 68.38 33.89 75.34 29.12 6.96 61.15-15.48 71.56-50.13 10.4-34.65-4.77-68.38-33.89-75.34zm-156.27 29.34c30.94 8.14 65.62-20.45 77.46-63.87 11.84-43.42-3.64-85.21-34.58-93.36s-65.62 20.45-77.46 63.87c-11.84 43.42 3.64 85.22 34.58 93.36z"></path>
					</svg>`
				},
				{
					href: 'add-license.php',
					position: 'right',
					toolTip: 'Pet Data',
					title: 'Add License',
					iconPath: `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" class="svg-inline--fa fa-plus fa-w-14 svg-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg>`
				},
				{
					href: 'approvals.php',
					position: 'right',
					toolTip: 'Pet Data',
					title: 'Approvals',
					iconPath: `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check-circle" class="svg-inline--fa fa-check-circle fa-w-16 svg-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path></svg>`
				}
			]
		},
		{
			href: 'javascript:void(0);',
			position: 'right',
			toolTip: 'ActiveMenu',
			title: 'Reports',
			collapsible: true,
			iconPath: `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="scroll" class="svg-inline--fa fa-scroll fa-w-20 svg-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M48 0C21.53 0 0 21.53 0 48v64c0 8.84 7.16 16 16 16h80V48C96 21.53 74.47 0 48 0zm208 412.57V352h288V96c0-52.94-43.06-96-96-96H111.59C121.74 13.41 128 29.92 128 48v368c0 38.87 34.65 69.65 74.75 63.12C234.22 474 256 444.46 256 412.57zM288 384v32c0 52.93-43.06 96-96 96h336c61.86 0 112-50.14 112-112 0-8.84-7.16-16-16-16H288z"></path></svg>`,
			innerLinks: [
				{
					href: 'reports.php',
					position: 'right',
					toolTip: 'Search',
					title: 'Reports 1',
					iconPath: `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="scroll" class="svg-inline--fa fa-scroll fa-w-20 svg-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M48 0C21.53 0 0 21.53 0 48v64c0 8.84 7.16 16 16 16h80V48C96 21.53 74.47 0 48 0zm208 412.57V352h288V96c0-52.94-43.06-96-96-96H111.59C121.74 13.41 128 29.92 128 48v368c0 38.87 34.65 69.65 74.75 63.12C234.22 474 256 444.46 256 412.57zM288 384v32c0 52.93-43.06 96-96 96h336c61.86 0 112-50.14 112-112 0-8.84-7.16-16-16-16H288z"></path></svg>`,
					isActive: true,
					permZone: {},
				},
                {
                    href: 'reports.php',
                    position: 'right',
                    toolTip: 'Search',
                    title: 'Reports 2',
                    iconPath: `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="scroll" class="svg-inline--fa fa-scroll fa-w-20 svg-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 512"><path fill="currentColor" d="M48 0C21.53 0 0 21.53 0 48v64c0 8.84 7.16 16 16 16h80V48C96 21.53 74.47 0 48 0zm208 412.57V352h288V96c0-52.94-43.06-96-96-96H111.59C121.74 13.41 128 29.92 128 48v368c0 38.87 34.65 69.65 74.75 63.12C234.22 474 256 444.46 256 412.57zM288 384v32c0 52.93-43.06 96-96 96h336c61.86 0 112-50.14 112-112 0-8.84-7.16-16-16-16H288z"></path></svg>`,
                    isActive: true,
                    permZone: {},
                }
			]
		},
		{
			href: 'add-doctor.php',
			position: 'right',
			toolTip: 'Doctor Data',
			title: 'Add Doctor',
			iconPath: `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="plus" class="svg-inline--fa fa-plus fa-w-14 svg-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"></path></svg>`
		},
		{
			href: 'notifications.php',
			position: 'right',
			toolTip: 'Notifications',
			title: 'Notifications',
			iconPath: `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bell" class="svg-inline--fa fa-bell fa-w-14 svg-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M224 512c35.32 0 63.97-28.65 63.97-64H160.03c0 35.35 28.65 64 63.97 64zm215.39-149.71c-19.32-20.76-55.47-51.99-55.47-154.29 0-77.7-54.48-139.9-127.94-155.16V32c0-17.67-14.32-32-31.98-32s-31.98 14.33-31.98 32v20.84C118.56 68.1 64.08 130.3 64.08 208c0 102.3-36.15 133.53-55.47 154.29-6 6.45-8.66 14.16-8.61 21.71.11 16.4 12.98 32 32.1 32h383.8c19.12 0 32-15.6 32.1-32 .05-7.55-2.61-15.27-8.61-21.71z"></path></svg>`
		},
		{
			href: 'tickets.php',
			tooltipPosition: 'right',
			toolTip: 'Tickets',
			title: 'Tickets',
			iconPath: `<svg aria-hidden="true" viewBox="0 0 384 512" focusable="false" data-prefix="fas" data-icon="clipboard-list" class="svg-inline--fa fa-clipboard-list fa-w-12 svg-icon" role="img" xmlns="http://www.w3.org/2000/svg">
			<path fill="currentColor" d="M336 64h-80c0-35.3-28.7-64-64-64s-64 28.7-64 64H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM96 424c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm0-96c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm0-96c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm96-192c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24zm128 368c0 4.4-3.6 8-8 8H168c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16zm0-96c0 4.4-3.6 8-8 8H168c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16zm0-96c0 4.4-3.6 8-8 8H168c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16z"></path>
	</svg>`,
			permZone: {}
		},
		{
			href: 'logout.php',
			position: 'right',
			toolTip: 'Active',
			title: 'Sign Out',
			iconPath: '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="sign-out-alt" class="svg-inline--fa fa-sign-out-alt fa-w-16 svg-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z"></path></svg>'
		}
	];

	const nav = new Navigation('#menu', data);
})
