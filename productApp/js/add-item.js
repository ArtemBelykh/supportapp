(() => {
  console.log('add item')
  $('.add-item-section').append(generateHeader());
  function generateHeader() {
    return `<div class="header"><h3 class="header__title">Add New Item</h3></div>`
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
                      <label for="item_type">Item Type</label>
                      <select id="item_type" class="js-example-placeholder-multiple form-control"></select>
                    </div>
                    
                    <div class="inputs-block__input-wrapper">
                      <div>
                        <label for="is_active">Is Active</label>
                        <input type="checkbox" class="item_is_active" id="is_active" style="width: 15px; height: 15px;">
                      </div>
                    </div>
                    
                    
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li class="form-block active panel panel-default list-inline">
            <div class="collapsible-header panel-heading" role="tab" id="headingTwo">
              <p class="form-block__heading" data-toggle="collapse" data-parent="#accordion" href="#collapseTwo" aria-expanded="true" aria-controls="collapseTwo">
                Contingent
              </p>
            </div>
            <div class="collapsible-body">
              <div id="collapseTwo" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingTwo">
                <div class="panel-body">
                  <div class="inputs-block">
                    <div class="inputs-block__input-wrapper">
                      <label>Size</label>
                      <select class="item_size" id="size"></select>
                    </div>
                    <div class="inputs-block__input-wrapper">
                      <label>Applied to Pet Type</label>
                      <select class="item_pet_type" id="pet_type"></select>
                    </div>
                    <div class="inputs-block__input-wrapper">
                      <label>Color</label>
                      <select class="item_color" id="colors"></select>
                    </div>
                    <div class="inputs-block__input-wrapper" style="display: flex; justify-content: space-between;">
                      <div style="margin-right:5px">
                        <label for="sizeHeight">Height </label>
                        <input type="text" class="item_height" id="sizeHeight">
                      </div>
                      <div style="margin-right:5px">
                        <label for="sizeLength">Length </label>
                        <input type="text" class="item_length" id="sizeLength">
                      </div>
                      <div style="margin-right:5px">
                        <label for="sizeWidth">Width </label>
                        <input type="text" class="item_size_width" id="sizeWidth">
                      </div>
                      <div>
                        <label for="itemWeight">Weight (lbs)</label>
                        <input type="text" class="item_weight" id="itemWeight">
                      </div>
                    </div>
                    <div class="inputs-block__input-wrapper">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </li>

          <li class="form-block active panel panel-default list-inline">
            <div class="collapsible-header panel-heading" role="tab" id="headingThree">
              <p class="form-block__heading" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="true" aria-controls="collapseThree">
                Accounting
              </p>
            </div>
            <div class="collapsible-body">
              <div id="collapseThree" class="panel-collapse collapse" role="tabpanel" aria-labelledby="headingThree">
                <div class="panel-body">
                  <div class="inputs-block">
                    <div class="inputs-block__input-wrapper">
                      <label for="quantityLeft">Quantity Left</label>
                      <input id="quantityLeft" class="item_quantity_left" type="text" readonly>
                    </div>
                    <div class="inputs-block__input-wrapper">
                      <label for="averageCost">Average Cost</label>
                      <input id="averageCost" class="item_average_cost" type="text" readonly>
                    </div>                    
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div class="col-xs-4 col-xs-offset-4"">
            <input class="btn btn-primary form-control add_items" type="submit" value="Add Items">
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

                $(`.add_items`).on('click', (event) => {
                    event.preventDefault()

                    const data = {
                        name: $(`.item_name`).val(),
                        description: $(`.item_description`).val(),
                        item_type: $(`.js-example-placeholder-multiple`).val(),
                        is_active: $(`.item_is_active`).is(':checked') ? '1' : '0',
                        size: $(`.item_size`).val(),
                        pet_type: $(`.item_pet_type`).val(),
                        color: $(`.item_color`).val(),
                        height: $(`.item_height`).val(),
                        length: $(`.item_length`).val(),
                        size_width: $(`.item_size_width`).val(),
                        weight: $(`.item_weight`).val(),

                        quantity_left: $(`.item_quantity_left`).val(),
                        average_cost: $(`.item_average_cost`).val()
                    }

                    console.log(data)
                })

            })
            .catch(console.error)
      })
      .catch(err => console.log(err))


})()


