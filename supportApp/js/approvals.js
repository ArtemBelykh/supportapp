(() => {
    const apiUrl = './sql/';
    // showSpinner();

    $('.main .approvals-section .row')
        .find('.wrapper')
        .append(
            `<div class="row header-block header-block--wider">
				<div class="header-block__container">
					<h3 class="header-block__title">Approvals</h3>
				</div>
			</div>
			<br />
			
			`
        );
    showSpinner()
    fetch(`${apiUrl}sql_get_reviews_by_contact_id.php?selectedId=${selectedId}`)
        .then(r => r.json())
        .then(data => {
            $('.main .approvals-section .row .wrapper').append(generateCollapse(data));
            console.log(selectedId)
        })
        .finally(() => hideSpinner())

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
                    console.log(el)
            function checkArray(my_arr, elem){
                for(var i=0;i<my_arr.length;i++){
                    if(my_arr[i].review_status === "pending")
                        return true;
                }
                return false;
            }
            return `
						<li class="form-block active panel panel-default">
							<div class="collapsible-header panel-heading" role="tab" id="heading${i}">
								<p class="form-block__heading approvals__heading" data-toggle="collapse" data-parent="#accordion" href="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}" style="width: 100%; display: flex">
									<span>Product Family</span>
									<span>
										${el.is_esa === '1' ? 'ESA' : 'No ESA'}
									</span>
									<span> 
										Purchase ID #
									</span>
									<span>
										${el.purchase_id}
									</span>
									<span>
										${el.is_active === 1 ? '<span class="is_active">Is Active</span>' : '<span class="no_active">No Active</span>'}
									</span>
									<span>
										${checkArray(el.reviews, 'pending') === true ? `<span class="is_pending">Pending</span>` : `<span class="no_pending">Pending</span>`}
									</span>
								</p>
								
								<span id="itemId"></span>
							</div>
							<div class="collapsible-body">
								<div id="collapse${i}" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading${1}">
									<div class="panel-body">
                                        <div class="table-items">
                                            <table class="table approvals_items__table_td" style="width: 100%;">
                                            <tr>
                                                <td style="width: 20%;"><b>Start Date</b></td>
                                                <td style="width: 20%;">${el.created_date}</td>
                                                
                                                <td><b>Expiration Date</b></td>
                                                <td>${el.expiry_date}</td>
                                                
                                                <td><b>Customer State</b></td>
                                                <td>${el.contact_state}</td>
                                            </tr>
                                            
                                            <tr>
                                                <td></td>
                                                <td></td>
                                                
                                                <td><b>Letter URL</b></td>
                                                <td></td>
                                                
                                                <td></td>
                                                <td></td>
                                            </tr>
                                            </table>
                                        </div>
									<div class="table-items approvals_items__table">
                                        <table class="table table-hover approvals_items__table_td" style="width: 100%;">
                                            <tr>
                                                <th>Current Status</th>
                                                <th>Status Date (EST)</th>
                                                <th>Doctor (name)</th>
                                                <th>Doctor License #</th>
                                                <th>License State</th>
                                                <th>Is Active</th>
                                                <th>Comments</th>
                                            </tr>
                                            ${el.reviews.map(data => {
                                                //console.log(data)
                                                return `
                                                    <tr>
                                                        <td>${data.review_status !== null ? data.review_status : 'No data'}</td>
                                                        <td>${data.review_date !== null ? data.review_date : 'No data'}</td>
                                                        <td>${data.doc_name}</td>
                                                        <td>${data.license_num}</td>
                                                        <td>${data.license_state}</td>
                                                        <td>${data.is_active !== null ? data.is_active : 'No data'}</td>
                                                        <td>${data.review_comment !== null && data.review_comment !== '' ? data.review_comment : 'No data'}</td>
                                                    </tr>
                                                `
                                            }).join('')}
                                        </table>
								    </div>
									<br>
									<div class="btn-group">
									    <input type="submit" value="Resend Pending">
									    <input type="submit" value="Switch Doctor">
                                    </div>
								    </div>
								</div>
							</div>
						</li>`;
        }).join('')}
				</ul>
		</div>`;
    }
})()
