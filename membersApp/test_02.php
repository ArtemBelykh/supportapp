<!DOCTYPE html>
<html lang="en">
<head>  
    
    <title>Welcome</title>
    <meta charset="utf-8">
    <!--meta name="viewport" content="width=device-width, initial-scale=1"-->

    <link rel="stylesheet" href="https://cdn.datatables.net/1.10.20/css/jquery.dataTables.min.css" />

    <script src="https://code.jquery.com/jquery-3.3.1.js"></script>
    <script src="https://cdn.datatables.net/1.10.20/js/jquery.dataTables.min.js"></script>

    <script>
        
        $(document).ready(function() {
            $('#myTab01').DataTable( {
                //"processing": true,
                //"serverSide": true,
                "ajax": { 
                    "url":"./sql/sql_search_contacts_by_email.php?value=lermsider",
                    "dataSrc": ""//,
                    
                    //"dataType": "json",                  
                    //"contentType": "application/json; charset=utf-8"
                } ,
                //  // {"contact_id":"26894","firstname":"Susie","lastname":"Reilly","birthday":null,"email":"susie.reilly77@gmail.com","gender":"0","is_over_18":"1","phone":"+19493750710"}
                "columns": [
                    { "data": "contact_id" }, 
                    { "data": "firstname" },                     
                    { "data": "lastname" },
                    { "data": "birthday" }, 
                    { "data": "email" }, 
                    { "data": "gender" },
                    { "data": "is_over_18" },
                    { "data": "phone" }                    
                ]
            } );
        } );
    </script>

</head>
<body>
  <p>DocAdminApp welcome page</p>

  <table id="myTab01" class="display" style="width:100%">  
    <thead>
      <tr>
        <th>ID</th>
        <th>First name</th>
        <th>Last name</th>
        <th>Bitrhday</th>
        <th>Email</th>
        <th>Gender</th>
        <th>Is over 18</th>
        <th>Phone</th>        
      </tr>
    </thead>
    <tfoot>
      <tr>
        <th>ID</th>
        <th>First name</th>
        <th>Last name</th>
        <th>Bitrhday</th>
        <th>Email</th>
        <th>Gender</th>
        <th>Is over 18</th>
        <th>Phone</th>        
      </tr>
    </tfoot>
  </table>

</body>
</html>