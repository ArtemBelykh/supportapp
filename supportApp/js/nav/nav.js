$(() => {
	const generateLiTemplate = (i, nested) => {
		if (nested) {
			return i.permZone ? `
			<li class="menu__item menu__item--switcher">
				<ul class="collapsible">
					<li 
						class="menu__item">
						<div class="collapsible-header">
							<a 
								href='${i.href}' 
								class="nav-tooltipped menu__link menu__link--switcher"
							>
								<span class="link-icon">
									${i.icon}
								</span>
								<span class="menu-link">${i.title}</span>
									<svg xmlns="http://www.w3.org/2000/svg" class="svg-expand" viewBox="0 0 24 24" fill="black" width="22" height="22"><path d="M0 0h24v24H0z" fill="none"/><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></svg>
							</a>
						</div>
						<div class="collapsible-body menu__list--nested">
							<ul class="menu__list menu__list--nested">
								${i.innerLinks.map(el => {
				return el.permZone ? `
									<li data-toggle="tooltip" 
										data-placement="${el.tooltipPosition}" 
										title="${el.tooltip}">						
										<a 
											href='${el.href}' 
											class="nav-tooltipped menu__link"
											
										>
											<span class="link-icon" style="background">
												${el.icon}
											</span>
											<span class="menu-link">${el.title}</span>
										</a>
										${el.href === 'contact-tickets.php' ? `<div class="noty-icon"><span></span></div>` : ''}
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
			<li class="menu__item"
				data-toggle="tooltip" 
				data-placement="${i.tooltipPosition}" 
				title="${i.title}"
			>
				<a 
					href='${i.href}' 
					class="nav-tooltipped menu__link">
				<span class="link-icon">
					${i.icon}
				</span>
					<span class="menu-link">${i.title}</span>
				</a>
				${i.href === 'notifications.php' ? `<div class="noty-icon"><span></span></div>` : ''}
				${i.href === 'tickets.php' ? `<div class="noty-icon"><span></span></div>` : ''}
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
			return selectedId !== 0;
			// linksArr.find(el => el.innerLinks)?.innerLinks.some(el => el.href === activeUrl);
		}

		_makeMenuSwitcherInactive() {
			let url = location.pathname.split('/').slice(-1)[0];
			$('.menu__item--switcher .link-icon svg').eq(0).css('color', '#d0d0d0');
			$('.menu__item--switcher .menu-link').eq(0).css('color', '#d0d0d0');
			$(`.menu__link[href='${url}']`).find('.svg-expand').hide();
			const closedUrls = [
				'contact-info.php',
				'pet-data.php',
				'esaquestionnaries.php',
				'purchases.php',
				'salesorders.php',
				'transactions.php',
				'esaletters.php',
				'airline-letters.php',
				'landlord-forms.php',
				'tickets.php'
			];
			$('.menu__link[href="contact-info.php"]').closest('.menu__item').find('.svg-expand').css('fill', '#d0d0d0');
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
			$('.menu__link[href="contact-info.php"]').closest('.menu__item').find('.svg-expand').css('fill', '#7d807b');
			$('.svg-expand').removeClass('svg-expand--rotate');
			$(`.menu__link[href='${url}']`)
				.closest('.menu__item')
				.find('.svg-expand')
				.addClass('svg-expand--rotate');

			$(`.menu__link[href='${url}']`).closest('.collapsible-body.menu__list--nested').prev().addClass('active');
			$(`.menu__link[href='${url}']`).closest('.collapsible-body.menu__list--nested').css('display', 'block');
		}

		_handleColallapsible(target) {
			const $target = $(target);

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
			// let windowSize = $(window).width();
			// if (windowSize < 1100) {
			// 	$('#menu.menu').addClass('hiddenMenu');
			// 	$('[data-toggle="tooltip"]').tooltip({container: 'body'})
			// 	$('[data-toggle="tooltip"]').tooltip();
			// 	$('.left-menu-logo').addClass('cropped');
			// }
			this.$el.html(getTemplate(this.links));
			
			// // resize
			// $(window).resize(() => {
			// 	windowSize = $(window).width();
			// 	if ($(window).width() < 1100) {
			// 		$('#menu.menu').addClass('hiddenMenu');
			// 		$('[data-toggle="tooltip"]').tooltip({container: 'body'})
			// 		$('[data-toggle="tooltip"]').tooltip();
			// 		$('.left-menu-logo').addClass('cropped');
			// 	} else {
			// 		const destroyTooltip = (function() {
			// 			let executed = false;
			// 			return function() {
			// 					if (!executed) {
			// 							executed = true;
			// 							$('[data-toggle="tooltip"]').tooltip('destroy');
			// 							// do something
			// 					}
			// 			};
			// 		})();
			// 		destroyTooltip();
			// 		$('#menu.menu').removeClass('hiddenMenu');
					
			// 		$('.left-menu-logo').removeClass('cropped');
			// 	}
			// });
			

			let activeEl;

			let url = location.pathname.split('/').slice(-1)[0];
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

					// const urlsWithoutQueryParams = [
					// 	'doctors-list.php',
					// 	'add-doctor.php',
					// 	'reports.php',
					// 	'add-license.php',
					// 	'notifications.php'
					// ];	

					// if (urlsWithoutQueryParams.includes(link)) {
					// 	document.location.href = `${link}`;
					// } else {
					// 	document.location.href = `${link}?docID=${currDoctorId}`;
					// }
				
					document.location.href = `${link}`;
	
				})
			})
		}
	}

	const json = {
		search: {
			description: 'search',
			crud: '1100'
		},
		'contact-info': {
			description: 'contact-info',
			crud: '1100'
		},
		'pet-data': {
			description: 'pet-data',
			crud: '1100'
		},
		esaquestionnaries: {
			description: 'esaquestionnaries',
			crud: '1000'
		},
		purchases: {
			description: 'purchases',
			crud: '1100'
		},
		salesorders: {
			description: 'salesorders',
			crud: '1000'
		},
		transactions: {
			description: 'transactions',
			crud: '1000'
		},
		esaletters: {
			description: 'esaletters',
			crud: '1100'
		},
		'airline-letters': {
			description: 'airline-letters',
			crud: '1000'
		},
		'landlord-forms': {
			description: 'landlord-forms',
			crud: '1100'
		},
		tickets: {
			description: 'tickets',
			crud: '1100'
		},
		support: {
			description: 'support',
			crud: '1100'
		},
	};

	const data = [
		{
			href: 'search.php',
			tooltipPosition: 'right',
			tooltip: 'Search',
			title: 'Client New Search',
			icon: `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" class="svg-inline--fa fa-search fa-w-16 svg-icon" role="img" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512">
					<path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"></path>
			</svg>`,
			permZone: permissions.contacts,
		},
		{
			href: 'javascript:void(0);',
			tooltipPosition: 'right',
			tooltip: 'Active',
			title: 'Active Case',
			collapsible: true,
			icon: `<svg aria-hidden="true" viewBox="0 0 448 512" focusable="false" data-prefix="fas" data-icon="user" class="svg-inline--fa fa-user fa-w-14 svg-icon" role="img" xmlns="http://www.w3.org/2000/svg">
					<path fill="currentColor" d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path>
			</svg>`,
			permZone: permissions.contacts,
			innerLinks: [
				{
					href: 'contact-info.php',
					tooltipPosition: 'right',
					tooltip: 'Contact Info',
					title: 'Contact Info',
					icon: `<svg aria-hidden="true" viewBox="0 0 512 512" focusable="false" data-prefix="fas" data-icon="info-circle" class="svg-inline--fa fa-info-circle fa-w-16 svg-icon" role="img" xmlns="http://www.w3.org/2000/svg">
							<path fill="currentColor" d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"></path>
					</svg>`,
					permZone: permissions.contacts
				},
				{
					href: 'pet-data.php',
					tooltipPosition: 'right',
					tooltip: 'Pet Data',
					title: 'Pet Data',
					icon: `<svg aria-hidden="true" viewBox="0 0 512 512" focusable="false" data-prefix="fas" data-icon="paw" class="svg-inline--fa fa-paw fa-w-16 svg-icon" role="img" xmlns="http://www.w3.org/2000/svg">
							<path fill="currentColor" d="M256 224c-79.41 0-192 122.76-192 200.25 0 34.9 26.81 55.75 71.74 55.75 48.84 0 81.09-25.08 120.26-25.08 39.51 0 71.85 25.08 120.26 25.08 44.93 0 71.74-20.85 71.74-55.75C448 346.76 335.41 224 256 224zm-147.28-12.61c-10.4-34.65-42.44-57.09-71.56-50.13-29.12 6.96-44.29 40.69-33.89 75.34 10.4 34.65 42.44 57.09 71.56 50.13 29.12-6.96 44.29-40.69 33.89-75.34zm84.72-20.78c30.94-8.14 46.42-49.94 34.58-93.36s-46.52-72.01-77.46-63.87-46.42 49.94-34.58 93.36c11.84 43.42 46.53 72.02 77.46 63.87zm281.39-29.34c-29.12-6.96-61.15 15.48-71.56 50.13-10.4 34.65 4.77 68.38 33.89 75.34 29.12 6.96 61.15-15.48 71.56-50.13 10.4-34.65-4.77-68.38-33.89-75.34zm-156.27 29.34c30.94 8.14 65.62-20.45 77.46-63.87 11.84-43.42-3.64-85.21-34.58-93.36s-65.62 20.45-77.46 63.87c-11.84 43.42 3.64 85.22 34.58 93.36z"></path>
					</svg>`,
					permZone: permissions.pets
				},
				{
					href: 'esaquestionnaries.php',
					tooltipPosition: 'right',
					tooltip: 'ESA Questionnaries',
					title: 'ESA Questionnaries',
					icon: `<svg aria-hidden="true" viewBox="0 0 384 512" focusable="false" data-prefix="fas" data-icon="question" class="svg-inline--fa fa-question fa-w-12 svg-icon" role="img" xmlns="http://www.w3.org/2000/svg">
							<path fill="currentColor" d="M202.021 0C122.202 0 70.503 32.703 29.914 91.026c-7.363 10.58-5.093 25.086 5.178 32.874l43.138 32.709c10.373 7.865 25.132 6.026 33.253-4.148 25.049-31.381 43.63-49.449 82.757-49.449 30.764 0 68.816 19.799 68.816 49.631 0 22.552-18.617 34.134-48.993 51.164-35.423 19.86-82.299 44.576-82.299 106.405V320c0 13.255 10.745 24 24 24h72.471c13.255 0 24-10.745 24-24v-5.773c0-42.86 125.268-44.645 125.268-160.627C377.504 66.256 286.902 0 202.021 0zM192 373.459c-38.196 0-69.271 31.075-69.271 69.271 0 38.195 31.075 69.27 69.271 69.27s69.271-31.075 69.271-69.271-31.075-69.27-69.271-69.27z"></path>
					</svg>`,
					permZone: permissions['esa questionnaries']
				},
				{
					href: 'purchases.php',
					tooltipPosition: 'right',
					tooltip: 'Purchases',
					title: 'Purchases',
					icon: `<svg aria-hidden="true" viewBox="0 0 576 512" focusable="false" data-prefix="fas" data-icon="shopping-cart" class="svg-inline--fa fa-shopping-cart fa-w-18 svg-icon" role="img" xmlns="http://www.w3.org/2000/svg">
							<path fill="currentColor" d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z"></path>
					</svg>`,
					permZone: permissions.purchases
				},
				{
					href: 'salesorders.php',
					tooltipPosition: 'right',
					tooltip: 'Purchases',
					title: 'Sales Orders',
					icon: `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="list" class="svg-inline--fa fa-list fa-w-16 svg-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M80 368H16a16 16 0 0 0-16 16v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16v-64a16 16 0 0 0-16-16zm0-320H16A16 16 0 0 0 0 64v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16V64a16 16 0 0 0-16-16zm0 160H16a16 16 0 0 0-16 16v64a16 16 0 0 0 16 16h64a16 16 0 0 0 16-16v-64a16 16 0 0 0-16-16zm416 176H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16zm0-320H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16V80a16 16 0 0 0-16-16zm0 160H176a16 16 0 0 0-16 16v32a16 16 0 0 0 16 16h320a16 16 0 0 0 16-16v-32a16 16 0 0 0-16-16z"></path></svg>`,
					permZone: permissions['sales orders']
				},
				{
					href: 'transactions.php',
					tooltipPosition: 'right',
					tooltip: 'Transactions',
					title: 'Transactions',
					icon: `<svg aria-hidden="true" viewBox="0 0 288 512" focusable="false" data-prefix="fas" data-icon="dollar-sign" class="svg-inline--fa fa-dollar-sign fa-w-9 svg-icon" role="img" xmlns="http://www.w3.org/2000/svg">
							<path fill="currentColor" d="M209.2 233.4l-108-31.6C88.7 198.2 80 186.5 80 173.5c0-16.3 13.2-29.5 29.5-29.5h66.3c12.2 0 24.2 3.7 34.2 10.5 6.1 4.1 14.3 3.1 19.5-2l34.8-34c7.1-6.9 6.1-18.4-1.8-24.5C238 74.8 207.4 64.1 176 64V16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v48h-2.5C45.8 64-5.4 118.7.5 183.6c4.2 46.1 39.4 83.6 83.8 96.6l102.5 30c12.5 3.7 21.2 15.3 21.2 28.3 0 16.3-13.2 29.5-29.5 29.5h-66.3C100 368 88 364.3 78 357.5c-6.1-4.1-14.3-3.1-19.5 2l-34.8 34c-7.1 6.9-6.1 18.4 1.8 24.5 24.5 19.2 55.1 29.9 86.5 30v48c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-48.2c46.6-.9 90.3-28.6 105.7-72.7 21.5-61.6-14.6-124.8-72.5-141.7z"></path>
					</svg>`,
					permZone: permissions.transactions
				},
				{
					href: 'esaletters.php',
					tooltipPosition: 'right',
					tooltip: 'ESA Letters',
					title: 'ESA Letters',
					icon: `<svg aria-hidden="true" viewBox="0 0 512 512" focusable="false" data-prefix="far" data-icon="envelope" class="svg-inline--fa fa-envelope fa-w-16 svg-icon" role="img" xmlns="http://www.w3.org/2000/svg">
							<path fill="currentColor" d="M464 64H48C21.49 64 0 85.49 0 112v288c0 26.51 21.49 48 48 48h416c26.51 0 48-21.49 48-48V112c0-26.51-21.49-48-48-48zm0 48v40.805c-22.422 18.259-58.168 46.651-134.587 106.49-16.841 13.247-50.201 45.072-73.413 44.701-23.208.375-56.579-31.459-73.413-44.701C106.18 199.465 70.425 171.067 48 152.805V112h416zM48 400V214.398c22.914 18.251 55.409 43.862 104.938 82.646 21.857 17.205 60.134 55.186 103.062 54.955 42.717.231 80.509-37.199 103.053-54.947 49.528-38.783 82.032-64.401 104.947-82.653V400H48z"></path>
					</svg>`,
					permZone: permissions['esa letters']
				},
				{
					href: 'airline-letters.php',
					tooltipPosition: 'right',
					tooltip: 'Airline Letters',
					title: 'Airline Letters',
					icon: `<svg aria-hidden="true" viewBox="0 0 512 512" focusable="false" data-prefix="fas" data-icon="paper-plane" class="svg-inline--fa fa-paper-plane fa-w-16 svg-icon" role="img" xmlns="http://www.w3.org/2000/svg">
							<path fill="currentColor" d="M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z"></path>
					</svg>`,
					permZone: permissions['airline letters']
				},
				{
					href: 'landlord-forms.php',
					tooltipPosition: 'right',
					tooltip: 'Landlord Forms',
					title: 'Landlord Forms',
					icon: `<svg aria-hidden="true" viewBox="0 0 448 512" focusable="false" data-prefix="fab" data-icon="wpforms" class="svg-inline--fa fa-wpforms fa-w-14 svg-icon" role="img" xmlns="http://www.w3.org/2000/svg">
							<path fill="currentColor" d="M448 75.2v361.7c0 24.3-19 43.2-43.2 43.2H43.2C19.3 480 0 461.4 0 436.8V75.2C0 51.1 18.8 32 43.2 32h361.7c24 0 43.1 18.8 43.1 43.2zm-37.3 361.6V75.2c0-3-2.6-5.8-5.8-5.8h-9.3L285.3 144 224 94.1 162.8 144 52.5 69.3h-9.3c-3.2 0-5.8 2.8-5.8 5.8v361.7c0 3 2.6 5.8 5.8 5.8h361.7c3.2.1 5.8-2.7 5.8-5.8zM150.2 186v37H76.7v-37h73.5zm0 74.4v37.3H76.7v-37.3h73.5zm11.1-147.3l54-43.7H96.8l64.5 43.7zm210 72.9v37h-196v-37h196zm0 74.4v37.3h-196v-37.3h196zm-84.6-147.3l64.5-43.7H232.8l53.9 43.7zM371.3 335v37.3h-99.4V335h99.4z"></path>
					</svg>`,
					permZone: permissions['landlord forms']
				},
				{
					href: 'contact-tickets.php',
					tooltipPosition: 'right',
					tooltip: 'Contact Tickets',
					title: 'Contact Tickets',
					icon: `<svg aria-hidden="true" viewBox="0 0 384 512" focusable="false" data-prefix="fas" data-icon="clipboard-list" class="svg-inline--fa fa-clipboard-list fa-w-12 svg-icon" role="img" xmlns="http://www.w3.org/2000/svg">
							<path fill="currentColor" d="M336 64h-80c0-35.3-28.7-64-64-64s-64 28.7-64 64H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM96 424c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm0-96c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm0-96c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm96-192c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24zm128 368c0 4.4-3.6 8-8 8H168c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16zm0-96c0 4.4-3.6 8-8 8H168c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16zm0-96c0 4.4-3.6 8-8 8H168c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16z"></path>
					</svg>`,
					permZone: permissions['support tickets']
				},
				{
					href: 'approvals.php',
					tooltipPosition: 'right',
					tooltip: 'Approvals',
					title: 'Approvals',
					icon: `<i class="fas fa-notes-medical"></i>`,
					permZone: permissions['doctor approvals']
				},
			]
		},
		{
			href: 'notifications.php',
			tooltipPosition: 'right',
			tooltip: 'Notifications',
			title: 'Notifications',
			icon: `<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="bell" class="svg-inline--fa fa-bell fa-w-14 svg-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M224 512c35.32 0 63.97-28.65 63.97-64H160.03c0 35.35 28.65 64 63.97 64zm215.39-149.71c-19.32-20.76-55.47-51.99-55.47-154.29 0-77.7-54.48-139.9-127.94-155.16V32c0-17.67-14.32-32-31.98-32s-31.98 14.33-31.98 32v20.84C118.56 68.1 64.08 130.3 64.08 208c0 102.3-36.15 133.53-55.47 154.29-6 6.45-8.66 14.16-8.61 21.71.11 16.4 12.98 32 32.1 32h383.8c19.12 0 32-15.6 32.1-32 .05-7.55-2.61-15.27-8.61-21.71z"></path></svg>`,
			permZone: {}
		},
		{
			href: 'tickets.php',
			tooltipPosition: 'right',
			tooltip: 'Tickets',
			title: 'Tickets',
			icon: `<svg aria-hidden="true" viewBox="0 0 384 512" focusable="false" data-prefix="fas" data-icon="clipboard-list" class="svg-inline--fa fa-clipboard-list fa-w-12 svg-icon" role="img" xmlns="http://www.w3.org/2000/svg">
			<path fill="currentColor" d="M336 64h-80c0-35.3-28.7-64-64-64s-64 28.7-64 64H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48V112c0-26.5-21.5-48-48-48zM96 424c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm0-96c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm0-96c-13.3 0-24-10.7-24-24s10.7-24 24-24 24 10.7 24 24-10.7 24-24 24zm96-192c13.3 0 24 10.7 24 24s-10.7 24-24 24-24-10.7-24-24 10.7-24 24-24zm128 368c0 4.4-3.6 8-8 8H168c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16zm0-96c0 4.4-3.6 8-8 8H168c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16zm0-96c0 4.4-3.6 8-8 8H168c-4.4 0-8-3.6-8-8v-16c0-4.4 3.6-8 8-8h144c4.4 0 8 3.6 8 8v16z"></path>
	</svg>`,
			permZone: {}
		},
		{
			href: 'logout.php',
			tooltipPosition: 'right',
			tooltip: 'Sign Out',
			title: 'Sign Out',
			icon: '<svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="sign-out-alt" class="svg-inline--fa fa-sign-out-alt fa-w-16 svg-icon" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M497 273L329 441c-15 15-41 4.5-41-17v-96H152c-13.3 0-24-10.7-24-24v-96c0-13.3 10.7-24 24-24h136V88c0-21.4 25.9-32 41-17l168 168c9.3 9.4 9.3 24.6 0 34zM192 436v-40c0-6.6-5.4-12-12-12H96c-17.7 0-32-14.3-32-32V160c0-17.7 14.3-32 32-32h84c6.6 0 12-5.4 12-12V76c0-6.6-5.4-12-12-12H96c-53 0-96 43-96 96v192c0 53 43 96 96 96h84c6.6 0 12-5.4 12-12z"></path></svg>',
			permZone: {}
		}
	];

	// window.navigationMenu = Navigation;
	const nav = new Navigation('#menu', data);
	
})
