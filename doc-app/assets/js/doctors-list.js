
$(document).ready(function() {
    var table = $('#doctors-list-table').DataTable( {
        //"processing": true,
        //"serverSide": true,
        "ajax": { 
        "url":"../sql/sql_v_doctors_www_01.php",
        "dataSrc": ""//,
        //"dataType": "json",                  
        //"contentType": "application/json; charset=utf-8"
        } ,
        "columns": [
        { "data": "id" }, 
        { "data": "fname" }, 
        { "data": "mname",    "visible": false, "searchable": false },
        { "data": "lname" },
        { "data": "IsActive", "visible": false, "searchable": false }, 
        { "data": "login" },
        { "data": "psswd",    "visible": false, "searchable": false },
        { "data": "address" },
        { "data": "city" },
        { "data": "state",    "visible": false, "searchable": false },
        { "data": "ZIP",      "visible": false, "searchable": false },
        { "data": "phoneSMS" },                
        { "data": "phoneService", "visible": false, "searchable": false  },
        { "data": "phonePublic" },
        { "data": "emailService", "visible": false, "searchable": false  },
        { "data": "emailPublic",  "visible": false, "searchable": false  },
        { "data": "NPI" }                
        ]
    } );

    $('#doctors-list-table tbody').on('click', 'tr', function () {
        var data = table.row( this ).data();
        //alert( 'You clicked on '+data[0]+'\'s row' );
        alert( 'You clicked on '+data.fname+' '+data.lname+'\'s row' );
    } );

} );