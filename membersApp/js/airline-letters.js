(() => {
	const apiUrl = './sql/';
	const googleDriveUrl = 'https://drive.google.com/file/d/';

	function groupById(arr, id) {
		return arr.reduce((sum, curr) => {
			sum[curr[id]] = sum[curr[id]] || [];
			if (sum.hasOwnProperty(curr[id])) {
				sum[curr[id]].push(curr);
			}
			return sum;
		}, {});
	}

	// Spinner
	function showSpinner() {
		$('.main').append('<div class="loader"></div>');
	}

	function hideSpinner() {
		$('div.loader').hide();
	}

	showSpinner();
	getData(`${apiUrl}sql_get_airline_files_by_contact_id.php`)
		.then(data => {
			hideSpinner()
			$('.main .airlineLetters-section .row')
				.find('.wrapper')
				.append(
					`<div class="row header-block header-block--wider">
						<div class="header-block__container">
							<h3 class="header-block__title">Airline</h3>
						</div>
						</div>
						<br />
					`
				)
			generateCollapseForLetters(data);

			$('.airlineLetters .panel').on('click', function(e) {
				const icon = $(this).find('i');
				$(this).find('.collapse').collapse('toggle');
				icon.toggleClass('--rotated');

				// $('.esaQuestions-section .panel').collapse({
				//   toggle: true,
				//   // onOpenStart(el) {
				//   //   $(el).find('i').addClass('--rotated');
				//   // },
				//   // onCloseStart(el) {
				//   //   $(el).find('i').removeClass('--rotated');
				//   // }
				// });
			})
		})
		.catch(console.error)
		.finally(() => hideSpinner())

	function generateCollapseForLetters(data) {
		const groupedData = groupById(data, 'flight_confirm_num');
		const container = $('.airlineLetters-section .row .wrapper');
		container.append(`
			<div class="wrapper">
        <div class="airlineLetters">
          <div class="collapsible-header panel-heading">
            <div class="airlineLetters">
              <div><span>#id</span></div>
              <div><span></span></div>
              <div><span></span></div>
              <div><span></span></div>
            </div>
          </div>
          <ul class="collapsible panel-group"></ul>`)
		container.find('.collapsible').append(`${Object.keys(groupedData)
			.map((key) => {
				return `
          <li data-id="${key}" class="panel panel-default">
            <div class="collapsible-header panel-heading">
              <div class="airlineLetters__row">
								<div>${key}</div>
								<button class="btn-send">Send</button>
                <i class="material-icons">expand_more</i>
              </div>
            </div>
            <div class="collapsible-body collapse"></div>
          </li>`;
			})
			.join('')}
			</div>`);

		data.forEach(el => {
			$(`li[data-id="${el.flight_confirm_num}"] .collapsible-body`).append(`
				<div style="height: 500px">
					<iframe src="${googleDriveUrl}${el.g_esa_file}/preview?usp=drivesdk" frameborder="0" type="application/pdf" width="100%" height="100%"></iframe> 
				</div>`)
		})
	}

	async function getData(url) {
		try {
			const res = await fetch(url);
			return await res.json();
		} catch (err) {
			throw new Error(err);
		}
	}
})()