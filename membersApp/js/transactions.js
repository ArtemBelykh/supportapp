(() => {
	const apiUrl = './sql/';
	showSpinner();
	getData(`${apiUrl}sql_get_transactions_by_contact_id.php`)
		.then(data => {
			hideSpinner();
			$('.transactions-section .table').append(generateTableHead(data));
			$('.transactions-section .table').append(generateTableBody(data));
		})
		.catch(console.error);

	function generateTableHead(data) {
		return `
				<thead>
					<tr>
						<th>Gateway id</th>
						<th>Contact id</th>
						<th>Status</th>
						<th>Subtotal</th>
						<th>Tax</th>
						<th>Total</th>
						<th>Transaction id</th>
					</tr>
				</thead>
		`
	}

	function generateTableBody(data) {
		return `
				<tbody>
					${data.map(el => `
						<tr>
							<td>${el.gateway_id}</td>
							<td>${el.op_contact_id}</td>
							<td>${el.status}</td>
							<td>${el.subtotal}</td>
							<td>${el.tax}</td>
							<td>${el.total}</td>
							<td>${el.transaction_id}</td>
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