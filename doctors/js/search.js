const apiUrl = 'sql/';
let contactID;
let currReviewId;
let currPage = 1;
let currTab = 1;

// for Apple products date
function castDateToISOFormat(arr) {
	for (let el of arr) {
		if (el.order_time) {
			el.order_time = el.order_time.replace(/-/g, '/');
		} else if (el.review_date) {
			el.review_date = el.review_date.replace(/-/g, '/');
		}
	}
}

function isIOS() {
	return (
		navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ||
		navigator.platform.includes('Mac')
	);
}

function parseDate(date) {
	let timezoneOffset = new Date(date).getTimezoneOffset();
	let timezoneDate = new Date(
		new Date(date).getTime() - timezoneOffset * 60 * 1000
	);

	return `${(timezoneDate.getMonth() + 1)
		.toString()
		.padStart(2, '0')}-${timezoneDate
			.getDate()
			.toString()
			.padStart(2, '0')}-${timezoneDate.getFullYear()}`;
}

function sortByDate(arr) {
	const copy = arr.concat();
	return copy.sort((date1, date2) => {
		return (
			new Date(date1.order_time).getTime() -
			new Date(date2.order_time).getTime()
		);
	});
}

function populateArr(arr) {
	let copy = arr.slice();
	let obj = {};
	if (copy.length < 19) {
		if (copy[0] && Object.keys(copy[0]).length > 0) {
			obj = { ...copy[0] };
			for (let k in obj) {
				obj[k] = '';
			}
		}
		for (let i = copy.length; i < 19; i++) {
			copy[i] = obj;
		}
	}
	return copy;
}

function fillTableEmptyRows() {
	return Array(25).fill(null).map(el => ({}))
}

function upperFirstLetter(str) {
	const lowerCasedStr = str.toLowerCase();
	return lowerCasedStr[0].toUpperCase() + lowerCasedStr.slice(1);
}

$(document).ready(function () {
	// opee/close menu

	$('.app-block__btn').on('click', handleBtnMenuClick);

	const initFilledTable = fillTableEmptyRows();
	// console.log('initFilledTable', initFilledTable)
	$('.search-block').prepend(generateSearchField())
	// $('.users-table').prepend(generateTableHead());
	// initFilledTable.forEach(el => $('.users-table tbody').append(generateTableBody(el)))

	hideSpinner();

	$('#search').on('keypress', (e) => {
		if (e.which === 13) handleSearch();
	});
	$('.search-btn').on('click', handleSearch);
});

function handleBtnMenuClick(e) {
	$('.app-block__menu').slideToggle(300);
}

function showSpinner() {
	$('[class^="loadingio-spinner"]').css({ display: 'flex' });
}

function hideSpinner() {
	$('[class^="loadingio-spinner"]').hide();
}

function generateSearchField() {
	return `
		<div class="row">
				<div class="input-field">
					<input id="search" type="text" autocomplete="off" class="validate">
					<label for="search">Search...</label>
				</div>
				<button class="search-btn">
					<i class="material-icons">search</i>
				</button>
		</div>
    `
}

function handleSearch(e) {
	const inputValue = $('#search').val();
	if (inputValue) {
		$('.users-table').hide();
		$('.search-block .total').hide();
		showSpinner();
		fetch(`${apiUrl}sql_search_contacts_by_name.php?name=${inputValue}`)
			.then(r => r.json())
			.then(data => {
				$('.users-table').show();
				$('.users-table thead').remove();
				$('.users-table tbody').remove();
				$('.search-block .total').remove();
				$('.search-btn').blur();

				if (data.count > 0) {
					$('.users-table').append(generateTableHead());
				}
				$('.users-table').append('<tbody></tbody>');
				// console.log('data.count', data.count)
				let result = data.count >= 25 && data.count !== 0 ? `Displaying max 25 out of ${data.count}` :
					data.count === '0' ? `Total: 0` : `Displaying max ${data.count} out of ${data.count}`
				$('.search-block').append(`<span class="total">${result}</span>`);

				if (data.results.length !== 0) {
					const populatedData = populateArr(data.results);
					populatedData.forEach(el => $('.app-block .users-table tbody').append(generateTableBody(el)));
				}
				$('.users-table tbody tr').on('click', handleRowClick);
			})
			.finally(() => hideSpinner())
	}
}

function generateTableHead(special) {
	return `
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>${special ? 'Status' : 'State'}</th>
      </tr>
    </thead>
  `;
}

function generateTableBody(data) {
	const dataId = data.contact_id ? `data-id=${data.contact_id}` : '';

	return `
    <tr ${dataId} data-order=${data.order_time ? data.order_time : data.review_date
		} data-review-id=${data.review_id ? data.review_id : 123}>
      <td>${data.contact_id ? data.contact_id : ''
		}</td>
      <td>${data.firstname
			? upperFirstLetter(data.firstname)
			: data.firstname === ''
				? ''
				: ''
		} ${data.lastname
			? upperFirstLetter(data.lastname)
			: data.lastname === ''
				? ''
				: ''
		}</td>
      <td>${data.stateCode
			? data.stateCode
			: ''
		}</td>
    </tr>`;
}

function handleRowClick(e) {
	if (!e.currentTarget.dataset.id) return;
	contactID = $(e.currentTarget).data('id');
	const orderDate = $(e.currentTarget).data('order');
	currReviewId = $(e.currentTarget).data('review-id');

	$('.users-table').hide();
	// $('.tabs .btn').removeClass('active');
	showSpinner();
	Promise.all([
		fetchData('sql_get_contact_w_address_by_id.php?id=', contactID),
		fetchData('sql_get_contact_pets_by_id.php?id=', contactID),
		fetchData('sql_get_quest_by_contact_id.php?id=', contactID),
	])
		.then((data) => {
			// console.log('data', data);
			hideSpinner();
			$('.app-block__review-title').hide();
			$('.second-page').html('');
			$('.arrow.left').remove();
			$('.search-block .row').hide()
			$('.search-block .total').hide();
			$('.search-block').append(generateBtnBack());

			$('.second-page').show();
			$('.app-block .second-page').append(`
          ${generateCollapsibleMenu(data, orderDate)}
       `);
			$('.questionnaire-collapsible').collapsible({
				accordion: true,
				onOpenStart(el) {
					const refEl = $(el);
					refEl.find('.collapsible-header').find('.material-icons').remove();
					refEl.find('.collapsible-header').append('<span></span>');
				},
				onCloseStart(el) {
					const refEl = $(el);
					refEl.find('.collapsible-header').find('span').remove();
					refEl
						.find('.collapsible-header')
						.append('<i class="material-icons">add</i>');
					refEl.find('.collapsible-header p').addClass('ellipsed');
				},
				onOpenEnd(el) {
					const refEl = $(el);
					const slideDown = (element) =>
						(element.style.height = `${element.scrollHeight}px`);
					refEl.find('.collapsible-header p').removeClass('ellipsed');
				},
			});
			// $('.modal-footer .modal-submitBtn').on('click', handleSubmitForm);

			$('.search-block .btn-back').on('click', handleBtnBackClick);
			let i = 1;
			while (i <= 18) {
				whichIconPaste('active', i);
				i++;
			}
		})
		.catch((err) => console.log(err))
		.finally(() => {
			hideSpinner()
			//     $('.app-block__review-title').hide();
			//     $('.app-block .second-page').append(`
			// 	${generateBtnBack()}
			// 	${generateCollapsibleMenu()}
			// `);
			//     $('.collapsible').collapsible();
			//     const elem = $('.collapsible.expandable');
			//     const instance = M.Collapsible.init(elem, {
			//       accordion: false,
			//     });
			//     $('.second-page .btn-back').on('click', handleBtnBackClick);
		});
}

function whichIconPaste(clazz, num) {
	$(`.collapsible.questionnaire-collapsible li:nth-child(${num})`).hasClass(
		clazz
	)
		? $(
			`.collapsible.questionnaire-collapsible li:nth-child(${num}) .collapsible-header`
		).append('<span></span>')
		: $(
			`.collapsible.questionnaire-collapsible li:nth-child(${num}) .collapsible-header`
		).append('<i class="material-icons">add</i>');
}

function fetchData(url, id) {
	return fetch(`${apiUrl}${url}${id}`, { mode: 'no-cors' })
		.then((r) => r.json())
		.then((data) => data);
}

function generateCollapsibleMenu(data, orderDate) {
	const [
		{ customer = {}, address = {} },
		{ _, pets },
		questionnaireInfo,
	] = data;

	return `
  <ul class="collapsible expandable">
    <li class="active">
      ${generatePartOfMenuForPatient(customer, address, orderDate)}
    </li>
    <li class="active">
      ${generatePartOfMenuForPetInfo(pets)}
    </li>
    <li class="active">
      ${generatePartOfMenuForQuestionairee(questionnaireInfo)}
    </li>
  </ul>`;
}

function generatePartOfMenuForPatient(customerInfo, addressInfo, orderDate) {
	if (!customerInfo.phone) {
		customerInfo.phone = '';
	}
	return `
    <div class="collapsible-header">Patient Info</div>
    <div class="separator"></div>
    <div class="collapsible-body">
      <p><span>Name</span>: ${customerInfo.firstname} ${customerInfo.lastname
		}</p>
      <p><span>Gender</span>: ${customerInfo.gender === '1' ? 'male' : 'female'
		}</p>
      <p class="tel"><span>Phone</span>: ${customerInfo.phone.slice(
			2,
			5
		)}-${customerInfo.phone.slice(5, 8)}-${customerInfo.phone.slice(8)}</p>
      <p><span>Email</span>: ${customerInfo.email}</p>
      <p><span>City</span>: ${addressInfo?.city ? addressInfo.city : ''}</p>
      <p><span>State</span>: ${addressInfo?.state_name ? addressInfo?.state_name : ''}</p>
      <p>
        <label>
          <input class="filled-in" type="checkbox" disabled checked=${customerInfo.is_over_18 === '1' ? true : false
		}/>
          <span>I confirm I am 18 or older</span>
        </label>
      </p>
    </div>`;
}

function generatePartOfMenuForPetInfo(petsInfoArr) {
	return `
    <div class="collapsible-header">Pet info</div>
    <div class="separator"></div>
    <div class="collapsible-body pet-info">
    ${petsInfoArr
			.map(
				(el, i) =>
					`<h6>Pet #${i + 1}:</h6>
                <p><span>Type</span>: ${el.pet_type_id === '1' ? 'DOG' : 'CAT'
					}</p>
                <p><span>Breed</span>: ${el.breed ? el.breed : 'null'}</p>
                <p><span>Name</span>: ${el.title ? el.title.replace(/\"/, '') : 'null'
					}</p>
                <p class="pet1-weight"><span>Weight</span>: ${Math.round(
						el.weight
					)} lbs.</p>
                `
			)
			.join('')}
    </div>`;
}

function generatePartOfMenuForQuestionairee(data) {
	return `
    <div class="collapsible-header">ESA Questionnaire</div>
    <div class="separator"></div>
    <div class="collapsible-body questionnaire">
      <ul class="collapsible questionnaire-collapsible">${data.length > 0
			? data
				.map(
					({ short, answer, question }) => `
        <li>
          <div class="collapsible-header">
            <p class="ellipsed">${short}: ${answer}</p>
          </div>
          <div class="collapsible-body"><span>${question}</span></div>
        </li>
      `
				)
				.join('')
			: `<li>
            <div class="collapsible-header">
              <p class="ellipsed">...</p>
            </div>
            <div class="collapsible-body"><span>...</span></div>
          </li>`
		}</div>
      </ul>`;
}

function handleBtnBackClick(e) {
	$('div.second-page').hide();
	showSpinner();
	$('.search-block .row').show()
	$('.search-block .total').show();
	$('.tabs').hide();
	$('.users-table').show();
	hideSpinner();
}

function generateBtnBack() {
	return `
		<div class="tabs">
			<button class="btn btn-back">
				<i class="arrow left"></i>
				Back to search
			</button>
		</div>`
}


