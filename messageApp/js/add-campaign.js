(() => {
    $('.add-item-section').append(generateHeader());
    function generateHeader() {
        return `<div class="header"><h3 class="header__title">Add New Campaign</h3></div>`
    }

    $('.add-item-section').append(`
<div class="content">
      <form action="" method="GET">
        <ul class="collapsible panel-group" id="accordion" role="tablist" aria-multiselectable="true">
          <li class="form-block active panel panel-default list-inline">
            <div class="collapsible-header panel-heading" role="tab" id="headingOne">
              <p class="form-block__heading" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                General
              </p>
            </div>
            <div class="collapsible-body">
              <div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
                <div class="panel-body">
                  <div class="inputs-block">
                    <div class="inputs-block__input-wrapper">
                      <label for="name">Name</label>
                      <input id="name" class="item_name" type="text">
                    </div>
                    <div class="inputs-block__input-wrapper">
                      <label for="description">Description</label>
                      <input type="text" class="item_description" id="description">
                    </div>
                    <div class="inputs-block__input-wrapper">
                      <label for="item_type">Segment Selection</label>
                      <select id="item_type" class="js-example-placeholder-multiple form-control"></select>
                    </div>
                    
                    <div class="inputs-block__input-wrapper">
                        <label for="item_type1">SMS / Email Portal Selection</label>
                        <select id="item_type1" class="form-control portal_select">
                            <option value="1">SMS Portal</option>
                            <option value="2">Email Portal</option>
                        </select>
                    </div>
                    
                    <div class="inputs-block__input-wrapper">
                        <label for="item_type2">Text Body</label>
                        <textarea class="form-control text_body" style="resize: none" id="item_type2" cols="10" rows="5"></textarea>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div class="col-xs-4 col-xs-offset-4">
            <input class="btn btn-primary form-control add_campaign" type="submit" value="Add campaign">
        </div>
      </form>
    </div>
  `);
    fetch(`varGet.php?name=selectedItemId`)
        .then(r => r.json())
        .then(d => {
            console.log(d)
            Promise.all([
                fetch('./sql/sql_json_list_item_types.php'),
                fetch('./sql/sql_json_list_item_colors.php'),
                fetch('./sql/sql_json_list_item_sizes.php'),
                fetch('./sql/sql_json_list_pet_types.php')
            ])
                .then(responses => Promise.all(responses.map(r => r.json())))
                .then(([itemTypeOpts, colors, sizes, petType]) => {

                    for (let opt of colors) {
                        console.log(`opt`, opt)
                        if (opt[0] === '-') {
                            $('#colors').append(`<option value="0" selected>-</option>`)
                        } else {
                            $('#colors').append(`<option value="${opt.id}">${opt.name}</option>`)
                        }
                    }
                    for (let opt of sizes) {
                        if (opt[0] === '-') {
                            $('#size').append(`<option value="0" selected>-</option>`)
                        } else {
                            $('#size').append(`<option value="${opt.id}">${opt.name}</option>`)
                        }
                    }
                    for (let opt of petType) {
                        if (opt[0] === '-') {
                            $('#pet_type').append(`<option value="0" selected>-</option>`)
                        } else {
                            $('#pet_type').append(`<option value="${opt.id}">${opt.name}</option>`)
                        }
                    }


                    // select2
                    $(".js-example-placeholder-multiple").select2({
                        tags: true,

                        createTag: function (params) {
                            console.log('params', params)
                            var term = $.trim(params.term);
                            if (term === '') {
                                return null;
                            }
                            return {
                                id: term,
                                text: term,
                                newTag: true // add additional parameters
                            }
                        },
                    });
                    itemTypeOpts = itemTypeOpts.sort((a,b) => a.name < b.name ? -1 : 0).map(opt => {
                        if (opt[0] === '-') {
                            return `<option ${itemTypeOpts.id === opt.id ? 'selected="selected" ' : ''} value="0">-</option>`
                        }

                        return `<option ${itemTypeOpts.id === opt.id ? 'selected="selected" ' : ''} value="${opt.id}">${opt.name}</option>`
                    });

                    $(".js-example-placeholder-multiple").append(itemTypeOpts);

                    $(`.add_campaign`).on('click', (event) => {
                        event.preventDefault()

                        const data = {
                            name: $(`.item_name`).val(),
                            description: $(`.item_description`).val(),
                            segments_select: $(`.js-example-placeholder-multiple`).val(),
                            portal_select: $(`.portal_select`).val(),
                            text_body: $(`.text_body`).val()
                        }

                        console.log(data)
                    })

                })
                .catch(console.error)
        })
        .catch(err => console.log(err))


})()