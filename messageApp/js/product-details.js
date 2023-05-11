(() => {
  console.log('product details')
  $('.product-details-section').append(generateHeader());
  function generateHeader() {
    return `<div class="header"><h3 class="header__title">Product Details</h3></div>`
  }

  $('.product-details-section').append(`
    <div class="content">
      <form>
        <ul 
          class="collapsible panel-group"
          id="accordion" 
          role="tablist" 
          aria-multiselectable="true"	
        >
          <li class="form-block active panel panel-default">
            <div 
              class="collapsible-header panel-heading" 
              role="tab" 
              id="headingOne"
            >
              <p 
                class="form-block__heading"
                data-toggle="collapse" 
                data-parent="#accordion" 
                href="#collapseOne" 
                aria-expanded="true" 
                aria-controls="collapseOne"
              >
                General
              </p>
              <span id="itemId"></span>
            </div>
            <div class="collapsible-body">
              <div 
                id="collapseOne" 
                class="panel-collapse collapse in" 
                role="tabpanel" 
                aria-labelledby="headingOne"
              >
                <div class="panel-body">
                  <div class="inputs-block">
                    <div class="inputs-block__input-wrapper">
                      <label for="name">Name</label>
                      <input id="name" type="text">
                    </div>
                    <div class="inputs-block__input-wrapper">
                      <label for="description">Description</label>
                      <input type="text" id="description">
                    </div> 
                    <!-- <div class="inputs-block__input-wrapper">
                      <label for="item_type">Item Type</label>
                      <select id="item_type" class="js-example-placeholder-multiple form-control"></select>
                    </div> -->
                    
                    <div class="inputs-block__input-wrapper">
                      <div>
                        <label for="is_active">Is Active</label>
                        <input type="checkbox" id="is_active" style="width: 15px; height: 15px;">
                      </div>
                      <div>
                        <label for="is_sold_once" class="disabled">Was Processed</label>
                        <input type="checkbox" id="is_sold_once" style="width: 15px; height: 15px;" disabled>
                      </div>
                      <div>
                        <label for="is_esa">Is ESA</label>
                        <input type="checkbox" id="is_esa" style="width: 15px; height: 15px;">
                      </div>
                      <div>
                        <label for="date" class="disabled">Date Created</label>
                        <input type="text" id="date" disabled>
                      </div>
                      
                    </div>
                    <div class="inputs-block__input-wrapper">
                      <div style="width: 20%">
                        <label for="itemPrice">Price</label>
                        <input type="text" id="itemPrice" readonly>
                      </div>
                    </div>
                    
                  </div>
                  <!-- <div class="btn-wrapper">
                    <button type="submit">Add Item</button>
                  </div> -->
                </div>
              </div>
            </div>
          </li>

          <li class="form-block active panel panel-default">
            <div 
              class="collapsible-header panel-heading" 
              role="tab" 
              id="headingTwo"
            >
              <p 
                class="form-block__heading"
                data-toggle="collapse" 
                data-parent="#accordion" 
                href="#collapseTwo" 
                aria-expanded="true" 
                aria-controls="collapseTwo"
              >
                Contents
              </p>
            </div>
            <div class="collapsible-body">
              <div 
                id="collapseTwo" 
                class="panel-collapse collapse in" 
                role="tabpanel" 
                aria-labelledby="headingTwo"
              >
                <div class="panel-body">
                  <table id="myTable" class="display" style="width:100%">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>                 
                        <th>Quantity</th>
                        <th></th>
                      </tr>
                    </thead>
                  </table>
                  <div class="inputs-block" style="justify-content: center;">
                    <!-- <div class="inputs-block__input-wrapper">
                      <label>Size</label>
                      <select id="size"></select>
                    </div>
                    <div class="inputs-block__input-wrapper">
                      <label>Applied to Pet Type</label>
                      <select id="pet_type"></select>
                    </div>
                    <div class="inputs-block__input-wrapper">
                      <label>Color</label>
                      <select id="colors"></select>
                    </div>
                    <div class="inputs-block__input-wrapper" style="display: flex; justify-content: space-between;">
                      
                      
                    </div> 
                    <div class="inputs-block__input-wrapper">
                    </div>
                  </div> -->
                  <div class="btn-wrapper">
                    <button type="button" data-toggle="modal" data-target="#myModal">Add Item</button>
                  </div> 
                </div>
              </div>
            </div>
          </li>

          <li class="form-block active panel panel-default">
            <div 
              class="collapsible-header panel-heading" 
              role="tab" 
              id="headingThree"
            >
              <p 
                class="form-block__heading"
                data-toggle="collapse" 
                data-parent="#accordion" 
                href="#collapseThree" 
                aria-expanded="true" 
                aria-controls="collapseThree"
              >
                Contingent
              </p>
            </div>
            <div class="collapsible-body">
              <div 
                id="collapseThree" 
                class="panel-collapse collapse-in" 
                role="tabpanel" 
                aria-labelledby="headingThree"
              >
                <div class="panel-body">
                  <div class="inputs-block">
                    <div class="inputs-block__input-wrapper" style="width: 100%; display: flex; justify-content: space-between;">
                      <div style="margin-right:5px">
                        <label for="sizeHeight">Height </label>
                        <input type="text" id="sizeHeight" readonly>
                      </div>
                      <div style="margin-right:5px">
                        <label for="sizeLength">Length </label>
                        <input type="text" id="sizeLength" readonly>
                      </div>
                      <div style="margin-right:5px">
                        <label for="sizeWidth">Width </label>
                        <input type="text" id="sizeWidth" readonly>
                      </div>
                      <div style="margin-right: 10px;">
                        <label for="itemWeight">Weight (lbs)</label>
                        <input type="text" id="itemWeight" readonly>
                      </div>
                    </div>               
                  </div>
                  <!-- <div class="btn-wrapper">
                    <button type="button" >Add Item</button>
                  </div> -->
                </div>
              </div>
            </div>
          </li>
        </ul>
      </form>
    </div>
  `);

  $('.product-details-section').append(generateModal());

  $('#myModal').on('shown.bs.modal', function (e) {
    $('#myInput').focus()
  })

  fetch(`varGet.php?name=selectedProductId`)
    .then(r => r.json())
    .then(d => {
      console.log(`d`, d)
      Promise.all([
        fetch(`./sql/sql_get_product_by_id.php`),
        fetch('./sql/sql_json_list_item_types.php'),
        fetch('./sql/sql_json_list_item_colors.php'),
        fetch('./sql/sql_json_list_item_sizes.php'),
        fetch('./sql/sql_json_list_pet_types.php')
      ])
        .then(responses => Promise.all(responses.map(r => r.json())))
        .then(([obj, itemTypeOpts, colors, sizes, petType]) => {
          console.log(`obj`, obj)
          console.log(`sizes`, sizes);
          console.log(`petType`, petType)
          for (let key in obj) {
            if (key === 'is_active' || key === 'is_sold_once' || key === 'is_esa') {
              $(`input[id="${key}"]`).prop('checked', obj[key])
            } else {
              $(`input[id="${key}"]`).val(obj[key])
            }
          }
        
          // for(let opt of itemTypeOpts) {
          //   if (opt[0] === '-') {
          //     $('#item_type').append(`<option value="0">-</option>`)
          //   } else {
          //     $('#item_type').append(`<option value="${opt.id}">${opt.name}</option>`)
          //   }
          // }

          for (let opt of colors) {
            console.log(`opt`, opt)
            if (opt[0] === '-') {
              $('#colors').append(`<option value="0">-</option>`)
            } else {
              $('#colors').append(`<option value="${opt.id}">${opt.name}</option>`)
            }
          }
          for (let opt of sizes) {
            if (opt[0] === '-') {
              $('#size').append(`<option value="0">-</option>`)
            } else {
              $('#size').append(`<option value="${opt.id}">${opt.name}</option>`)
            }
          }
          for (let opt of petType) {
            if (opt[0] === '-') {
              $('#pet_type').append(`<option value="0">-</option>`)
            } else {
              $('#pet_type').append(`<option value="${opt.id}">${opt.name}</option>`)
            }
          }

          $('#item_type').val(obj.item_type_id);
          $('#date').val(obj.dt_created.slice(0, 10));
          if (obj.color_id === 0) {
            $('#colors').val(0);
          }
          if (obj.size_id === 0) {
            $('#size').val(0);
          }
          if (obj.pet_type_id === 0) {
            $('#pet_type').val(0);
          }
          $('#quantityLeft').val(obj.quantity === null ? 0 : obj.quantity);
          $('#averageCost').val(obj.cost);
          $('#size').val(obj.size_id)

          $('#itemId').text(`ID ${obj.id}`);

          $('#sizeHeight').val(obj.height_in ? obj.height_in : '-');
          $('#sizeWidth').val(obj.width_in ? obj.width_in : '-');
          $('#sizeLength').val(obj.length_in ? obj.length_in : '-');

          $('#itemWeight').val(obj.weight_lbs ? obj.weight_lbs : '-');

          // select2
          $(".js-example-placeholder-multiple").select2({
            // tags: true,
            // allowClear: true,
            ajax: {
              url: `./sql/sql_get_items_types.php`,
              dataType: 'json',

              processResults: function (data) {
                console.log('data', data)
                data.sort((a,b) => a.name < b.name ? -1 : 0)
                return {
                  results: $.map(data, function (item) {
                    return {
                      text: item.name,
                      id: item.id
                    }
                  })
                };
              }
            },

            // createTag: function (params) {
            //   console.log('params', params)
            //   var term = $.trim(params.term);
            //   if (term === '') {
            //     return null;
            //   }
            //   return {
            //     id: term,
            //     text: term,
            //     newTag: true // add additional parameters
            //   }
            // },
          });

          // itemTypeOpts = itemTypeOpts.sort((a,b) => a.name < b.name ? -1 : 0).map(opt => {
          //   if (opt[0] === '-') {
          //     return `<option ${obj.id === opt.id ? 'selected="selected" ' : ''} value="0">-</option>`
          //   }
          //   return `<option ${obj.id === opt.id ? 'selected="selected" ' : ''} value="${opt.id}">${opt.name}</option>`
          // });

          // $(".js-example-placeholder-multiple").append(itemTypeOpts);
          

          // $(".js-example-placeholder-multiple").on('select2:select', e => {
          //   var data = e.params.data;
          //   console.log(data);
          // })
        
          $('#myTable').DataTable({
            data: obj.item_types,
            columns: [
              { data: "type_id" },
              { data: "type_name" },
              { data: "quantity" },
              { data: '' }  
            ],
            columnDefs: [ {
              targets: -1,
              data: null,
              className: 'dt-body-right',
              defaultContent: "<button style='border: 0'><i class='glyphicon glyphicon-trash sm'></i></button>"
            } ],
          })

        })

        .catch(console.error);
        
    })
    .catch(err => console.log(err))

    function generateModal() {
      return `
        <!-- Modal -->
        <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 class="modal-title" id="myModalLabel">Create New </h4>
              </div>
              <div class="modal-body">
                <div class="modal-body__input">
                  <div>
                    <label for="item_type">Select Item Type</label>
                    <select id="item_type" class="js-example-placeholder-multiple form-control"></select>
                  </div>
                  <div>
                    <label for="itemQuantity">Quantity</label>
                    <input type="number" id="itemQuantity"/>
                  </div>
                </div>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Cancel</button>
                <button type="button" class="btn btn-primary">Add</button>
              </div>
            </div>
          </div>
        </div>
      `;
    }





})()