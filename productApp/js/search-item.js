(() => {
  console.log('search item')
  $('.search-item-section').append(generateHeader());
  function generateHeader() {
    return `<div class="header"><h3 class="header__title">Search item</h3></div>`
  }
  $('.search-item-section').append(

    `<div class="content">
      <div class="showActive-block">
        <label>
         <input type="checkbox" id="showActive" checked>
         Show Active
       </label>
      </div>
      <table id="myTable" class="display" style="width:100%">
        <thead>
          <tr>
            <th>ID</th>          
            <th>Name</th> 
            <th>Type</th> 
            <th>Is Active</th>
            <th>Pet Type ID</th>      
            <th>Size</th>
            <th>Color</th>
          </tr>
        </thead>
      </table>
    </div>
    `);

    fetch(`./sql/sql_search_items_by_name.php`)
      .then(r => r.json())
      .then(data => {
        console.log(`data`, data)
        const activeItems = data.filter(i => i.is_active === '1');
        const inActiveItems = data.filter(i => i.is_active === '0')
        // hideSpinner();
        $('#myTable').DataTable({
          data: activeItems,
          destroy: true,
          columns: [
            { 'data': 'item_id' },
            { 'data': 'name' },
            { 'data': 'type' },
            { 'data': 'is_active' },
            { 'data': 'pet_type_id' },
            { 'data': 'size' },
            { 'data': 'color' },
          ],
          columnDefs: [
            {
                targets: -1,
                className: 'dt-body-right'
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
          fetch(`varSet.php?name=selectedItemId&val=${data.item_id}`)
            .then(r => r.json())
            .then(data => {
              // console.log('data', data)
              // console.log('permissions', permissions)
              document.location.href = `item-details.php`;
            })
            .catch(err => console.log(err))
          // document.location.href = `item-details.php`;
        });

        $('#showActive').on('change', (e) => {
          if (e.target.checked) {
            $('#myTable').DataTable().clear().rows.add(activeItems).draw();
          } else {
            $('#myTable').DataTable().clear().rows.add(inActiveItems).draw();
          }
        })

      });

})()