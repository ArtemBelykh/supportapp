(() => {
  console.log('add product')
  $('.add-product-section').append(generateHeader());
  function generateHeader() {
    return `<div class="header"><h3 class="header__title">Add New Product</h3></div>`
  }

  $('.add-product-section').append(`
    <div class="content">
      <form>
        <ul class="collapsible panel-group" id="accordion" role="tablist" aria-multiselectable="true">
          <li class="form-block active panel panel-default list-inline">
            <div class="collapsible-header panel-heading" role="tab" id="headingOne">
              <p class="form-block__heading" data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                General
              </p>
              <span id="itemId"></span>
            </div>
            <div class="collapsible-body">
              <div id="collapseOne" class="panel-collapse collapse in" role="tabpanel" aria-labelledby="headingOne">
                <div class="panel-body">
                  <div class="inputs-block">
                    <div class="inputs-block__input-wrapper">
                      <label for="name">Name</label>
                      <input id="name" class="product_New_Name" type="text">
                    </div>
                    <div class="inputs-block__input-wrapper">
                      <label for="description">Description</label>
                      <input type="text" id="description" class="product_New_Description">
                    </div> 
                    
                    <div style="display: flex;">
                        <div class="inputs-block__input-wrapper" style="width: 100%; display: flex; margin-top: 30px;">
                          <div style="width: 100px; display: flex;">
                            <input type="checkbox" id="is_active" class="product_New_is_active" style="width: 15px; height: 15px;">
                            <label for="is_active" style="margin-left: 10px;">Is Active</label>
                          </div>
                          <div style="width: 150px; display: flex;">
                            <input type="checkbox" id="is_sold_once" style="width: 15px; height: 15px;" disabled>
                            <label for="is_sold_once" class="disabled" class="product_New_processed" style="margin-left: 10px;">Was Processed</label>
                          </div>
                          <div style="width: 150px; display: flex;">
                            <input type="checkbox" id="is_esa" style="width: 15px; height: 15px;" class="product_New_Esa">
                            <label for="is_esa" style="margin-left: 10px;">Is ESA</label>
                          </div>
    
                        </div>
                        <div class="inputs-block__input-wrapper" style="display: flex; flex-wrap: nowrap">
                          <div style="width: 70%; margin-left: 25px;">
                            <label for="itemPrice">Price</label>
                            <input type="text" id="itemPrice" class="product_New_Price">
                          </div>
                        </div>
                    </div>
                    
                  </div>
                </div>
              </div>
            </div>
          </li>
          
          <li class="form-block active panel panel-default list-inline">
            <div class="collapsible-header panel-heading" role="tab" id="headingThree">
              <p class="form-block__heading" data-toggle="collapse" data-parent="#accordion" href="#collapseThree" aria-expanded="true" aria-controls="collapseThree">
                Detachment
              </p>
            </div>
            <div class="collapsible-body">
              <div id="collapseThree" class="panel-collapse collapse-in" role="tabpanel" aria-labelledby="headingThree">
                <div class="panel-body">
                  <div class="inputs-block">
                    <div class="inputs-block__input-wrapper" style="width: 100%; display: flex; justify-content: space-between;">
                      <div style="margin-right:5px">
                        <label for="sizeHeight">Height </label>
                        <input type="text" id="sizeHeight" class="product_New_sizeHeight">
                      </div>
                      <div style="margin-right:5px">
                        <label for="sizeLength">Length </label>
                        <input type="text" id="sizeLength" class="product_New_sizeLength">
                      </div>
                      <div style="margin-right:5px">
                        <label for="sizeWidth">Width </label>
                        <input type="text" id="sizeWidth" class="product_New_sizeWidth">
                      </div>
                      <div style="margin-right: 10px;">
                        <label for="itemWeight">Weight (lbs)</label>
                        <input type="text" id="itemWeight" class="product_New_itemWeight">
                      </div>
                    </div>               
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
        <div class="col-xs-4 col-xs-offset-4"">
            <input class="btn btn-primary form-control add_products" type="submit" value="Add Product">
        </div>
      </form>
    </div>
  `);

  $('.add_products').on('click', (event) => {
      event.preventDefault()

      const data = {
          name: $('.product_New_Name').val(),
          description: $('.product_New_Description').val(),
          is_active: $('.product_New_is_active').is(':checked') ? '1' : '0',
          was_processed: $('.product_New_processed').is(':checked') ? '1' : '0',
          is_esa: $('.product_New_Esa').is(':checked') ? '1' : '0',
          price: $('.product_New_Price').val(),
          size_Height: $('.product_New_sizeHeight').val(),
          size_Length: $('.product_New_sizeLength').val(),
          size_Width: $('.product_New_sizeWidth').val(),
          item_Weight: $('.product_New_itemWeight').val()
      }
      console.log(data)
  })
})()
