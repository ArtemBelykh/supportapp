(() => {
    const apiUrl = './sql/';
    // showSpinner();

    $('.main .esaQuestions-section .row')
        .find('.wrapper')
        .append(
            `<div class="row header-block header-block--wider">
				<div class="header-block__container">
					<h3 class="header-block__title">ESA Questionnaries</h3>
				</div>
			</div>
			<br />
			
			`
        );
    showSpinner()
    fetch(`${apiUrl}sql_get_quests_by_contact_id.php`)
        .then(r => r.json())
        .then(data => {
            //console.log(data)
            try {
                $('.main .esaQuestions-section .row .wrapper').append(generateCollapse(data));
            }catch (error) {
                console.log(error)
            }
        })
        .finally(() => hideSpinner());

    // Spinner
    function showSpinner() {
        $('.main .esaQuestions-section .row')
            .find('.wrapper')
            .append('<div class="loader"></div>');
    }

    function hideSpinner() {
        $('div.loader').hide();
    }

    function generateCollapse(data) {
        return `
			<div class="row">
			<!-- Button trigger modal -->
                <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                  Create
                </button><br><br>
                
                <!-- Modal -->
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                        </button>
                      </div>
                      <div class="modal-body">
                        ...
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary">Save changes</button>
                      </div>
                    </div>
                  </div>
                </div>
            
            
				<ul class="collapsible panel-group" id="accordion" role="tablist" aria-multiselectable="true" style="list-style: none; padding: 0">
					${data.quests.map((el, i) => {
            console.log(el)
            
                    return `
                        <li class="form-block active panel panel-default">
                            <div class="collapsible-header panel-heading" role="tab" id="heading${i}">
                                <p class="form-block__heading approvals__heading" data-toggle="collapse" data-parent="#accordion" href="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}" style="width: 100%; display: flex">
                                    <span>
                                        <span>Name: ${el.quest_name}</span>
                                    </span>
                                    <span>
                                        <span>Type: ${el.quest_type}</span>
                                    </span>
                                    <span>
                                        <span>#${el.id}</span>
                                    </span>
                                    <span>
                                        <span>Date: ${el.dlm}</span>
                                    </span>
            
                                </p>
                                <span id="itemId"></span>
                            </div>
                            <div class="collapsible-body">
                                <div id="collapse${i}" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="heading${1}">
                                    <div class="panel-body">
                                        <div class="table-items">
                                             <table class="table table-hover" style="width: 100%;">
                                            <tr>
                                                <th>Question</th>
                                                <th>Answer</th>
                                            </tr>
                                            ${el.answers.map(data => {
                                                if (data.question === undefined && data.answer === undefined) {
                                                    $('.table-items tr td').remove()
                                                }else {
                                                    //console.log(data)
                                                    return `
                                                        <tr>
                                                            <td title="${data.question}">${data.short}</td>
                                                            <td>${data.answer}</td>
                                                        </tr>
                                                    `
                                                }
                                                
                                                }).join('')}
                                        </table>
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