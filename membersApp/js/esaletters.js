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
		$('.main .esaLetters-section .row')
		.find('.wrapper')
		.append('<div class="loader"></div>');
	}

	function hideSpinner() {
		$('div.loader').hide();
	}

	showSpinner();
	getData(`${apiUrl}sql_get_esa_files_by_contact_id.php`)
		.then(data => {
			console.log('data', data)
			$('.main .esaLetters-section .row')
				.find('.wrapper')
				.append(
					`<div class="row header-block header-block--wider">
						<div class="header-block__container">
							<h3 class="header-block__title">ESA Letters</h3>
						</div>
					</div>
					<br />
					`
				);
			generateCollapseForLetters(data);

			const esaFileId = $('.esaLetters li').eq(0).data('id');
			if (esaFileId) {

				const {email_prime: email, g_esa_file: fileESA} = data.find(el => Number(el.id) === esaFileId)
				const letterData = {
					email,
					fileESA
				};
	
				$('.btn-send').click(function(e) {
					let $this = $(this);
					sendLetterHandler(e, letterData, $this)
				})

			}

			$('.esaLetters .panel').click(function(e) {
				const icon = $(this).find('i');
				$(this).find('.collapse').collapse('toggle');
				icon.toggleClass('--rotated');
			});

			$('.esaLetters__select').on('click', function(e) {
				e.stopPropagation();
			})

			// $('.esaLetters__select').on('change', function(e) {
			// 	const parent = $(this).parent();
			// 	console.log('e.target', e.target)
			// 	parent.append(generateTextArea(parent, e.target.value))
			// 	// if (e.target)
			// })

		})
		.catch(console.error)
		.finally(() => hideSpinner());

	function generateCollapseForLetters(data) {
		const groupedData = groupById(data, 'id');
		const container = $('.esaLetters-section .row .wrapper');
		container.append(`
			<div class="row">
				<div class="wrapper">
        	<div class="esaLetters">
          <ul class="collapsible expandable"></ul>
			</div>
			`);

		container.find('.collapsible').append(`${Object.keys(groupedData).sort((a,b) => b - a)
			.map((key, i, arr) => {
				return `
          <li data-id="${key}" class="panel panel-default">
            <div class="collapsible-header panel-heading">
              <div class="esaLetters__row">
								<i class="material-icons">expand_more</i>
								<span>${key}</span>
							</div>
							<div class="esaLetters__select">
								<select class="form-control">
									<!-- <option value="" disabled selected hidden>Choose an action</option> -->
									<option value="dateSentReceived">Date Sent/Received</option>
								</select>
							</div>
							<span>Opened:&nbsp;</span>
							<textarea class="email-opened"></textarea>
							<span>Downloaded:&nbsp;</span><textarea class="email-downloaded"></textarea>

							${i === 0 ? `<button class="btn-send">Send</button>` : ''}
            </div>
            <div class="collapsible-body collapse"></div>
          </li>`;
			})
			.join('')}
			</div>`)

		data.forEach(el => {
			$(`li[data-id="${el.id}"] .collapsible-body`).append(`
				<div style="height: 500px">
					<iframe src="${googleDriveUrl}${el.g_esa_file}/preview?usp=drivesdk" frameborder="0" type="application/pdf" width="100%" height="100%"></iframe>
				</div>`)
		})
	}

	function sendLetterHandler(e, data, currEl) {
		const panel = currEl.closest('.panel-heading');
		e.stopPropagation();
		fetch(`${apiUrl}kla_send_esa_docs.php`, {method: 'POST', body: JSON.stringify(data)})
			.then(r => r.json())
			.then(d => {
				if (d.result === '1') {
					panel.css({backgroundColor: '#b3ffb3'});
					setTimeout(() => {
						panel.animate({backgroundColor: '#fff'}, 2000)
					}, 500);
					// rgb(188, 239, 188)
				} else if (d.result === '0') {
					panel.css({backgroundColor: '#ff6666'});
					setTimeout(() => {
						panel.animate({backgroundColor: '#fff'}, 2000)
					}, 500);
				}
			})
			.catch(console.error)
	}

	async function getData(url) {
		try {
			const res = await fetch(url);
			return await res.json();
		} catch (err) {
			throw new Error(err);
		}
	}

	function generateTextArea(parent, data) {
		parent.find('.esaLetters__textarea').remove();
		return `<textarea class="esaLetters__textarea">${data}</textarea>`

	}
})()