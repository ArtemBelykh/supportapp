(() => {
const apiUrl = './sql';

showSpinner();
getData(`${apiUrl}/sql_get_reviews_statistics.php`)
	.then((data) => {
		const container = $('.main .reports-section .row').find('.wrapper');
		container.append(generateHeader());
		container.append(generateButtons());
		container.append('<div class="panel-group" id="accordion"><br /></div>');

		$('.dl-pdf').on('click', function(e) {
			e.preventDefault();
			
			let table = document.createElement('table');
			let tbody = document.createElement('tbody');
			let wrapper = document.createElement('div');
			wrapper.id = 'table-pdf';
			$('.reports-section').append(wrapper);

			table.append(tbody);
			wrapper.append(table);

			table.insertAdjacentHTML('afterbegin', `<thead>
					<tr>
						<th>ID</th>
						<th>Name</th>
						<th>Approved Today</th>
						<th>Denied Today</th>
						<!-- <th>Pending Today</th>
						<th>Current Week Approved</th>
						<th>Current Week Denied</th>
						<th>Current Week Pending</th>
						<th>Current Month Approved</th>
						<th>Current Month Denied</th>
						<th>Current Month Pending</th>
						<th>Previous Month Approved</th>
						<th>Previous Month Denied</th>
						<th>Previous Month Pending</th> -->
					</tr>
				</thead>`
			);

			data.reverse().forEach(d => {
				tbody.insertAdjacentHTML('afterbegin', 
					`<tr>
						<td>
							${d.id}
						</td>
						<td>
							${d.fname} ${d.lname}
						</td>
						<td>
							${d.data.cur_day_approved}
						</td>
						<td>
							${d.data.cur_day_denied}
						</td>
						<!-- <td>
							${d.data.cur_day_pending}
						</td>

						<td>
							${d.data.cur_week_approved}
						</td>
						<td>
							${d.data.cur_week_denied}
						</td>
						<td>
							${d.data.cur_week_pending}
						</td>

						<td>
							${d.data.cur_month_approved}
						</td>
						<td>
							${d.data.cur_month_denied}
						</td>
						<td>
							${d.data.cur_month_pending}
						</td>

						<td>
							${d.data.prev_month_approved}
						</td>
						<td>
							${d.data.prev_month_denied}
						</td>
						<td>
							${d.data.prev_month_pending}
						</td> -->

					</tr>`
				)
			});



			let doc = new jsPDF('p', 'pt', 'letter');
			let src = $('#table-pdf')[0];

			// let margins = {
      //   top: 80,
      //   bottom: 60,
      //   left: 40,
      //   width: 522
    	// };

			// We'll make our own renderer to skip this editor
			specialElementHandlers = {
        // element with id of "bypass" - jQuery style selector
        '#bypassme': function (element, renderer) {
            // true = "handled elsewhere, bypass text extraction"
            return true
        }
    	};

			margins = {
        top: 80,
        bottom: 60,
        left: 40,
        width: 122
    };

			console.log('doc', doc)

			doc.fromHTML(
				src,
				margins.left, margins.top, {
					'width': margins.width, // max width of content on PDF
					'elementHandlers': specialElementHandlers
				}, 
				function(dispose) {
					doc.save('Test.pdf');
				}, margins);
		

		});		

		data.forEach((el, i) => {
			$(`.main #accordion`)
				.append(generateCollapse(el, i))});

				

				$('.dl-csv').on('click', function(e) {
					// e.preventDefault();
					console.log(1)
					try {
						const { Parser } = json2csv;
						const parser = new Parser({ quote: "'", escapedQuote: "\\'" });
						const csvFile = parser.parse(data);
	
						const blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
						const filename = 'reports.csv';
						if (navigator.msSaveBlob) { // IE 10+
								navigator.msSaveBlob(blob, filename);
						} else {
							// feature detection
							// Browsers that support HTML5 download attribute
							const url = URL.createObjectURL(blob);
							$(this).attr("href", url);
							$(this).attr("download", filename);
							$(this).css('hidden', true);
						}
					} catch (err) {
						console.error(err);
					}
				})

				



	})
	.catch(console.error)
	.finally(hideSpinner);
	

function generateCollapse(data, i) {
	return `
		<div class="panel panel-default">
			<div class="panel-heading">
				<h4 class="panel-title">
					<a data-toggle="collapse" class="collapsed-link" data-parent="#accordion" href="#collapse${i}">
						${data.fname} ${data.lname}
					</a>
				</h4>
			</div>

			<div id="collapse${i}" class="panel-collapse collapse">
				<div class="panel-body">
					<p class="info-text">Approved Today: ${data.data.cur_day_approved}</p>
					<p class="info-text">Denied Today: ${data.data.cur_day_denied}</p>
					<p class="info-text">Pending Today: ${data.data.cur_day_pending}</p>

					<p class="info-text">Current Week Approved: ${data.data.cur_week_approved}</p>
					<p class="info-text">Current Week Denied: ${data.data.cur_week_denied}</p>
					<p class="info-text">Current Week Pending: ${data.data.cur_week_pending}</p>
 
					<p class="info-text">Current Month Approved: ${data.data.cur_month_approved}</p>
					<p class="info-text">Current Month Denied: ${data.data.cur_month_denied}</p>
					<p class="info-text">Current Month Pending: ${data.data.cur_month_pending}</p>

					<p class="info-text">Previous Month Approved: ${data.data.prev_month_approved}</p>
					<p class="info-text">Previous Month Denied: ${data.data.prev_month_denied}</p>
					<p class="info-text">Previous Month Pending: ${data.data.prev_month_pending}</p>
				</div>
			</div>
		</div>
	`
}

//downlaod csv pfd etc
function generateButtons() {
	return `
		<div class="btn-group">
			<a href="#" download class="btn btn-primary dl-csv" role="button" style="margin-right: 10px;">Download as CSV</a>
			<a href="#" download class="btn btn-primary dl-pdf" role="button" disabled style="pointer-events: none;">Download as PDF</a>
			<br />
		</div>
	`;
}

function generateHeader() {
	return `
		<div class="header-block">
			<div class="header-block__container">
				<h3 class="header-block__title">Reports</h3>
			</div>
		</div>
		<br />
	`;
}

{/* <div class="accordion" id="accordionExample">
  <div class="card">
    <div class="card-header" id="headingOne">
      <h2 class="mb-0">
        <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
          Collapsible Group Item #1
        </button>
      </h2>
    </div>

    <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
      <div class="card-body">
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-header" id="headingTwo">
      <h2 class="mb-0">
        <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
          Collapsible Group Item #2
        </button>
      </h2>
    </div>
    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
      <div class="card-body">
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-header" id="headingThree">
      <h2 class="mb-0">
        <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
          Collapsible Group Item #3
        </button>
      </h2>
    </div>
    <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
      <div class="card-body">
        Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
      </div>
    </div>
  </div>
</div> */}
 
async function getData(url) {
	try {
		
		const res = await fetch(url);
		return await res.json();
		
		// !!!!!!!!!!!!!!!!!!!!!!!!
		// fetch vs. ajax - 2 main differences - might be the issue
		// $.ajax({
		//   url: url,
		//   //type:'GET',
		//   //data: 'q=' + param,
		//   dataSrc: '',
		//   dataType: 'json',
		//   success: function( json ) {
		//     return json; 
		//   }
		// });
		// !!!!!!!!!!!!!!!!!!!!!!!!
		
	} catch (err) {
		throw new Error(err);
	}
}
	
    
function showSpinner() {
	if (!$('.loader').length) {
		$('.main .reports-section .row').find('.wrapper').append('<div class="loader"></div>');
	}
}
	
function hideSpinner() {
	$('div.loader').remove();
}
})()