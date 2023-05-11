(() => {
	const apiUrl = './sql/';
	// showSpinner();

	$('.orders-section')
		.find('.wrapper')
		.append(
			`<div class="row header-block header-block--wider">
				<div class="header-block__container">
					<h3 class="header-block__title">Sales Orders</h3>
				</div>
			</div>
			<br />
			
			`
		);

	getData(`${apiUrl}sql_get_sales_orders_by_contact_id.php`)
	.then(data => {
		// hideSpinner();
		$('.orders-section').append(generateCollapse(data));
	})
	.catch(console.error);
	

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

	function generateCollapse(data) {
		return `
			<div class="row">
				<ul class="collapsible panel-group" id="accordion" role="tablist" aria-multiselectable="true" style="list-style: none; padding: 0">
					${data.map((el, i) => {
						return `
						<li class="form-block active panel panel-default">
							<div class="collapsible-header panel-heading" role="tab" id="heading${i}">
								<p class="form-block__heading" data-toggle="collapse" data-parent="#accordion" href="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}" style="width: 100%; display: flex">
									<span>Sales Order #${el.so_id}</span>
									<span>
										${moment(el.dt_created).format('MM/DD/YYYY HH:mm:ss')}
									</span>
									<span> 
										$${el.so_price}
									</span>
									<span> 
										Transact ID# ${el.transaction_op_id}
									</span>
									<span>
										${!!el.is_active ? '<span class="status status--active">Is Active</span>' : '<span class="status status--inactive">Is Active &times;</span>'}
									</span>
									<span>
										${!!el.is_on_hold ? '<span class="status status--onHold">On Hold &times;</span>' : '<span class="status status--notOnHold">On Hold</span>'}
									</span>
									<span>
										op_id# ${el.so_id}
									</span>
								</p>
								<span id="itemId"></span>
							</div>
							<div class="collapsible-body">
							34564536456
								<div id="collapse${i}" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading${1}">
									<div class="panel-body">
										<div class="comment-section">
											<p class="comment-label">Comments: </p>
											<input class="comment-window" style="height: 20px" readonly>
										</div>
										<div class="tables-wrapper">
											<div class="table-products">
												<table class="table table-hover">
													${generateTableHead('Products')}
													${generateTableBody(el, 'products')}
												</table>
											</div>
											<div class="table-items">
												<table class="table table-hover">
													${generateTableHead('Items')}
													${generateTableBody(el, 'items')}
												</table>
											</div>
										</div>
										<div class="table-parcels">
											<table class="table table-hover">
												${generateTableHead('Parcels')}
												${generateTableBody(el, 'parcels')}
											</table>
										</div>
									</div>
								</div>
							</div>
						</li>
						`;
					}).join('')}
				</ul>
		</div>
		`;
	}

	function generateTableHead(caption) {
		if (caption === 'Products') {
			return `
				<caption style="font-size: 16px; text-align: center;">${caption}</caption>
				<thead>
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>Price</th>
					</tr>
				</thead>
			`
		} else if (caption === 'Parcels') {
			return `
				<caption style="font-size: 16px; text-align: center;">${caption}</caption>
				<thead>
					<tr>
						<th>Parcel ID</th>
						<th>Date Reported</th>
						<th>Ext Order ID</th>
						<th>Parcel Rate Name</th>
						<th>Track Link / Track Num</th>
					</tr>
				</thead>
			`
		}
		return `
				<caption style="font-size: 16px; text-align: center;">${caption}</caption>
				<thead>
					<tr>
						<th>ID</th>
						<th>Quantity</th>
						<th>Name</th>
					</tr>
				</thead>
			`
		
	}

	function generateTableBody(data, type) {
		if (type === 'items') {
			return `
				<tbody>
					${data.items.map(el => `
						<tr>
							<td>${el.item_id}</td>
							<td>${el.quantity}</td>
							<td>${el.item_name}</td>
						</tr>`).join('')}
				</tbody>
			`
		} else if (type === 'parcels') {
				return `<tbody>
					${data.parcels.map(el => `
						<tr>
							<td>${el.parcel_id ? el.parcel_id : ''}</td>
							<td>${el.dt_reported ? moment(el.dt_reported).format('MM/DD/YYYY HH:mm:ss') : ''}</td>
							<td>${el.ext_order_id ? el.ext_order_id : ''}</td>
							<td>${el.parcel_rate_name ? el.parcel_rate_name : ''}</td>
							<td>${`https://parcelsapp.com/en/tracking/`}<span style="font-weight: bold">${'9374869903504177755283'}</span></td>
						</tr>`).join('')}
				</tbody>
			`
		}
		return `<tbody>
				${data.products.map(el => `
					<tr>
						<td>${el.product_id}</td>
						<td>${el.prod_name}</td>
						<td>${el.op_price}</td>
					</tr>`).join('')}
			</tbody>
		`
	}

})()