$(() => {
	const generateLiTemplate = (i, nested) => {
		if (nested) {
			return i.permZone ? `
			<li class="menu__item menu__item--switcher">
				<ul class="collapsible">
					<li class="menu__item">
						<div class="collapsible-header">
							<a href='${i.href}' class="nav-tooltipped menu__link menu__link--switcher">
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
									<li data-toggle="tooltip" data-placement="${el.tooltipPosition}" title="${el.tooltip}">						
										<a href='${el.href}' class="nav-tooltipped menu__link">
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
			<li class="menu__item" data-toggle="tooltip" data-placement="${i.tooltipPosition}" title="${i.title}">
				<a href='${i.href}' class="nav-tooltipped menu__link">
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
			$('.main').append(`
                <div class="arrow-left">
				    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-left-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
					  	<path fill-rule="evenodd" d="M8 15A7 7 0 1 0 8 1a7 7 0 0 0 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
					  	<path fill-rule="evenodd" d="M8.354 11.354a.5.5 0 0 0 0-.708L5.707 8l2.647-2.646a.5.5 0 1 0-.708-.708l-3 3a.5.5 0 0 0 0 .708l3 3a.5.5 0 0 0 .708 0z"/>
					  	<path fill-rule="evenodd" d="M11.5 8a.5.5 0 0 0-.5-.5H6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 .5-.5z"/>
					</svg>
                </div>`)

			$('.arrow-left').on('click', (e) => {
				e.preventDefault()

                $('.header--shadow').toggleClass('active')
                $('.menu').toggleClass('active')
                $('.arrow-left svg').toggleClass('active')
                $('.arrow-left').toggleClass('active')
                $('.main').toggleClass('active')
                $('.left-menu-logo').toggleClass('active')
                $('.menu-link').toggleClass('active')


			})

			this.$el.html(getTemplate(this.links));

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
					// console.log(res)
					$.getScript(`js/${url.endsWith('php') ? url.slice(0, -4) : url.slice(0, -5)}.js`);
				});
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

					document.location.href = `${link}`;
	
				})
			})
		}
	}

	const data = [
		{
			href: 'dashboard.php',
			tooltipPosition: 'right',
			tooltip: 'My Profile',
			title: 'My Profile',
			icon: `<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-person-circle" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
					  <path d="M13.468 12.37C12.758 11.226 11.195 10 8 10s-4.757 1.225-5.468 2.37A6.987 6.987 0 0 0 8 15a6.987 6.987 0 0 0 5.468-2.63z"/>
					  <path fill-rule="evenodd" d="M8 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
					  <path fill-rule="evenodd" d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z"/>
					</svg>`,
			permZone: {}
		},

		{
			href: 'dashboard.php',
			tooltipPosition: 'right',
			tooltip: 'Refer a Friend',
			title: 'Refer a Friend',
			icon: `<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-wallet2" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
					  <path d="M2.5 4l10-3A1.5 1.5 0 0 1 14 2.5v2h-1v-2a.5.5 0 0 0-.5-.5L5.833 4H2.5z"/>
					  <path fill-rule="evenodd" d="M1 5.5A1.5 1.5 0 0 1 2.5 4h11A1.5 1.5 0 0 1 15 5.5v8a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 1 13.5v-8zM2.5 5a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5h-11z"/>
					</svg>`,
			permZone: {}
		},
		{
			href: 'pet-data.php',
			tooltipPosition: 'right',
			tooltip: 'My Pets',
			title: 'My Pets',
			icon: `<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-tag" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
					  <path fill-rule="evenodd" d="M2 2v4.586l7 7L13.586 9l-7-7H2zM1 2a1 1 0 0 1 1-1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 1 6.586V2z"/>
					  <path fill-rule="evenodd" d="M4.5 5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm0 1a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"/>
					</svg>`,
			permZone: {}
		},
		{
			href: 'store.php',
			tooltipPosition: 'right',
			tooltip: 'Store',
			title: 'Store',
			icon: `<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-shop" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
					  <path fill-rule="evenodd" d="M0 15.5a.5.5 0 0 1 .5-.5h15a.5.5 0 0 1 0 1H.5a.5.5 0 0 1-.5-.5zM3.12 1.175A.5.5 0 0 1 3.5 1h9a.5.5 0 0 1 .38.175l2.759 3.219A1.5 1.5 0 0 1 16 5.37v.13h-1v-.13a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.13H0v-.13a1.5 1.5 0 0 1 .361-.976l2.76-3.22z"/>
					  <path d="M2.375 6.875c.76 0 1.375-.616 1.375-1.375h1a1.375 1.375 0 0 0 2.75 0h1a1.375 1.375 0 0 0 2.75 0h1a1.375 1.375 0 1 0 2.75 0h1a2.375 2.375 0 0 1-4.25 1.458 2.371 2.371 0 0 1-1.875.917A2.37 2.37 0 0 1 8 6.958a2.37 2.37 0 0 1-1.875.917 2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.5h1c0 .76.616 1.375 1.375 1.375z"/>
					  <path d="M4.75 5.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm3.75 0a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm3.75 0a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0z"/>
					  <path fill-rule="evenodd" d="M2 7.846V7H1v.437c.291.207.632.35 1 .409zm-1 .737c.311.14.647.232 1 .271V15H1V8.583zm13 .271a3.354 3.354 0 0 0 1-.27V15h-1V8.854zm1-1.417c-.291.207-.632.35-1 .409V7h1v.437zM3 9.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 .5.5V15H7v-5H4v5H3V9.5zm6 0a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-4zm1 .5v3h2v-3h-2z"/>
					</svg>`,
			permZone: {}
		},
		{
			href: 'salesorders.php',
			tooltipPosition: 'right',
			tooltip: 'Orders',
			title: 'Orders',
			icon: `<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-box-seam" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
					  <path fill-rule="evenodd" d="M8.186 1.113a.5.5 0 0 0-.372 0L1.846 3.5l2.404.961L10.404 2l-2.218-.887zm3.564 1.426L5.596 5 8 5.961 14.154 3.5l-2.404-.961zm3.25 1.7l-6.5 2.6v7.922l6.5-2.6V4.24zM7.5 14.762V6.838L1 4.239v7.923l6.5 2.6zM7.443.184a1.5 1.5 0 0 1 1.114 0l7.129 2.852A.5.5 0 0 1 16 3.5v8.662a1 1 0 0 1-.629.928l-7.185 2.874a.5.5 0 0 1-.372 0L.63 13.09a1 1 0 0 1-.63-.928V3.5a.5.5 0 0 1 .314-.464L7.443.184z"/>
					</svg>`,
			permZone: {}
		},
		{
			href: 'salesorders.php',
			tooltipPosition: 'right',
			tooltip: 'My ESA Documents',
			title: 'My ESA Documents',
			icon: `<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-file-earmark-text" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
					  <path d="M4 1h5v1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V6h1v7a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2z"/>
					  <path d="M9 4.5V1l5 5h-3.5A1.5 1.5 0 0 1 9 4.5z"/>
					  <path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0-2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
					</svg>`,
			permZone: {}
		},
		{
			href: 'salesorders.php',
			tooltipPosition: 'right',
			tooltip: 'New Landlord/Airline Request',
			title: 'New Landlord/Airline Request',
			icon: `<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-file-earmark-plus" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
					  <path d="M9 1H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h5v-1H4a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h5v2.5A1.5 1.5 0 0 0 10.5 6H13v2h1V6L9 1z"/>
					  <path fill-rule="evenodd" d="M13.5 10a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1H13v-1.5a.5.5 0 0 1 .5-.5z"/>
					  <path fill-rule="evenodd" d="M13 12.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0v-2z"/>
					</svg>`,
			permZone: {}
		},
		{
			href: 'salesorders.php',
			tooltipPosition: 'right',
			tooltip: 'Support',
			title: 'Support',
			icon: `<svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-chat-right-text" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
					  <path fill-rule="evenodd" d="M2 1h12a1 1 0 0 1 1 1v11.586l-2-2A2 2 0 0 0 11.586 11H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zm12-1a2 2 0 0 1 2 2v12.793a.5.5 0 0 1-.854.353l-2.853-2.853a1 1 0 0 0-.707-.293H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h12z"/>
					  <path fill-rule="evenodd" d="M3 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM3 6a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9A.5.5 0 0 1 3 6zm0 2.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z"/>
					</svg>`,
			permZone: permissions.contacts,
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
