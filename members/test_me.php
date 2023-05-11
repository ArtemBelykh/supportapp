<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>jQuery.post test</title>
  <script src="https://code.jquery.com/jquery-3.5.0.js"></script>

  <script>
    $(document).ready(function() {
      $.post("sql/sql_update_contact_phone.php",
              {
                "id":"2240",
                "phone":"+180020010040",                
              },
              function(data){                
                $( "#result" ).html( data );
              }
        );
      // $.post("sql/sql_update_pet_title.php",
      //       {
      //         "pet_id":"2368",
      //         "title":"Schnapps",                
      //       },
      //       function(data){                
      //         $( "#result" ).html( data );
      //       }
      // );        
    });
  </script>
</head>  

<body>
    <div id="result"></div>
</body>
</html>