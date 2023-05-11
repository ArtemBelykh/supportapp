(() => {
  console.log('search product')
  $('.search-product-section').append(generateHeader());
  function generateHeader() {
    return `<div class="header"><h3 class="header__title">Search Product</h3></div>`
  }
  $('.search-product-section').append(

    `<div class="content">
      <table id="myTable" class="display" style="width:100%">
        <thead>
          <tr>
            <th>ID</th>
            <th>OP Product ID</th>           
            <th>Name</th>          
            <th>Description</th>
            <th>Is Active</th>
            <th>Price</th>          
          </tr>
        </thead>
      </table>
    </div>
    `);

    fetch(`./sql/sql_search_products_by_name.php`)
      .then(r => r.json())
      .then(data => {
        console.log(`data`, data)
        // hideSpinner();
        $('#myTable').DataTable({
          data,
          destroy: true,
          columns: [
            { 'data': 'id' },
            { 'data': 'op_product_id' },
            { 'data': 'name' },
            { 'data': 'description' },
            { 'data': 'is_active' },
            { 'data': 'price' },
          ],
          columnDefs: [
            {
                targets: -1,
                className: 'dt-body-left'
            }
          ],
          initComplete: function (oSettings, json) {
            // $('#myTable tr td:last-child').mask('(999) 999-9999');
            // // Trigger phone for apply mask
            // $('#myTable tr td:last-child').trigger('input');
          }
        });

        $('#myTable tbody').on('click', 'tr', function (e) {
          console.log('click')
          var row = this.rowIndex;
          // highlight selection 
          var $row = $('#myTable tr:eq(' + row + ')');
          $row.addClass('highlight').siblings().removeClass('highlight');
          $row[0].scrollIntoView({ behavior: 'smooth', block: 'center' }); // not in Safari
        });
  
        $('#myTable tbody').on('dblclick', 'tr', function (e) {
          var data = $('#myTable').DataTable().row(this).data();
          fetch(`varSet.php?name=selectedProductId&val=${data.id}`)
            .then(r => r.json())
            .then(data => {
              // console.log('data', data)
              // console.log('permissions', permissions)
              document.location.href = `product-details.php`;
            })
            .catch(err => console.log(err))
          // document.location.href = `item-details.php`;
        });

      })

      
})()