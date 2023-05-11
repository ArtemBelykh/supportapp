(() => {
	const apiUrl = './sql/';
	showSpinner();
	getData(`${apiUrl}sql_get_purchases_by_contact_id.php`)
		.then(data => {
			hideSpinner();
			$('.main .purchases-section .row')
				.find('.wrapper')
				.append(
					`<div class="row header-block header-block--wider">
						<div class="header-block__container">
							<h3 class="header-block__title">Purchases</h3>
						</div>
					</div>
					<br />
					`
				);

			$('.main .purchases-section .row')
				.find('.wrapper')
				.append('<div class="row"><table class="table"></table></div>')
			$('.purchases-section .table').append(generateTableHead(data));
			$('.purchases-section .table').append(generateTableBody(data));
		})
		.catch(console.error);

	function generateTableHead(data) {
		return `
				<thead>
					<tr>
						<th>Purchase id</th>
						<!-- <th>Contact id</th> -->
						<th>Product</th>
						<!-- <th>Transaction id</th> -->
						<th>Date (EST)</th>
						<!-- <th>Base price</th> -->
						<th>Quantity</th>
						<!-- <th>Discount</th> -->
						<th>Purchase Status</th>
						<th>Total Price</th>
					</tr>
				</thead>
		`
	}

	function generateTableBody(data) {
		return `
				<tbody>
					${data.map(el => `
						<tr>
							<td>${el.purchase_id}</td>
							<!-- <td>${el.op_contact_id}</td> -->
							<td>${el.op_product_id}</td>
							<!-- <td>${el.transaction_id}</td> -->
							<td>${moment.unix(Number(el.op_date_unix)).utc().tz('EST').format("MM-DD-YYYY, h:mm a")}</td>
							<!-- <td>${el.base_price}</td> -->
							<td>${el.quantity}</td>
							<!-- <td>${el.discount}</td> -->
							<td>${el.purchase_status}</td>
							<td>${el.total_price}</td>
						</tr>`)}
				</tbody>
			`
	}

	async function getData(url) {
		try {
			const res = await fetch(url);
			return await res.json();
		} catch (err) {
			console.error(err);
		}
	}

	// Spinner
	function showSpinner() {
		$('.main').append('<div class="loader"></div>');
	}

	function hideSpinner() {
		$('div.loader').hide();
	}

})()