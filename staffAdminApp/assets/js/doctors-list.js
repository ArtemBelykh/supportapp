$(document).ready(function() {
  $('#doctors-list-table').DataTable({
      //"processing": true,
      //"serverSide": true,
      "ajax": { 
          "url":"http://104.248.191.131/sql/sql_v_doctors_www_01.php",
          "dataSrc": ""//,
          //"dataType": "json",                  
          //"contentType": "application/json; charset=utf-8"
      } ,
      "columns": [
          //{ "data": "id" }, 
          { "data": "fname" }, 
          //{ "data": "mname" },
          { "data": "lname" },
          //{ "data": "IsActive" }, 
          { "data": "login" },
          //{ "data": "psswd" },
          { "data": "address" },
          { "data": "city" },
          //{ "data": "state" },
          //{ "data": "ZIP" },
          { "data": "phoneSMS" },                
          //{ "data": "phoneService" },
          { "data": "phonePublic" },
          //{ "data": "emailService" },
          //{ "data": "emailPublic" },
          { "data": "NPI" }                
      ]
  });
});
