<?php

  // $apiKey = '91cfc462cf5dd8f75ec5cae21d5167a5'; 
  
  require(dirname(__FILE__).'/../config/config_jotform.php');        
  // echo $api_key;

  // get form id
  //$formID = 82258553329160;
   $formID = isset($_GET["formID"]) ? $_GET['formID'] : 82258553329160;
?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Support Pets</title>
    <link
      href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet"
    />
    <link rel="stylesheet" href="https://cdn.datatables.net/1.10.20/css/jquery.dataTables.min.css" />
    <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>
    <link rel="stylesheet" href="./css/materialize.min.css" />
    <link rel="stylesheet" href="./css/main.css" />
    
  </head>

  <body>
    <div class="container-fluid main-wrapper">
      <div class="row center">
        <div class="col">
          <div class="btns-block">
            <a class="waves-effect waves-light btn-small btns-block__btn-save">save</a>
            <a class="waves-effect waves-light btn-small btns-block__btn-reset">reset</a>
            <a href="forms.html" class="waves-effect waves-light btn-small btns-block__btn-return">return</a>
          </div>
          <div class="columns">
            <div class="left">
              <div class="jotform-fields">
                <p class="jotform-fields__title">JOTFORM FIELDS</p>
                  <ul class="jotform-fields__list">
                    <li class="jotform-fields__item">
                      Does being with your pet make feel happy ?
                      
                    </li>
                    <li class="jotform-fields__item">
                      Does being with your pet make feel happy ?
                    </li>
                    <li class="jotform-fields__item">
                      Does being with your pet make feel happy ?
                    
                    </li>
                  </ul>
              </div>
              <div class="matched-fields">
                <p class="matched-fields__title">MATCHED</p>
                
                  <ul class="matched-fields__list">
                    <!-- <li class="matched-fields__item">
                    </li>
                    <li class="matched-fields__item">
                    </li>
                    <li class="matched-fields__item">
                    </li> -->
                  </ul>
                
              </div>
            </div>
            <div class="right">
              <div class="ontraport-fields">
                <p class="ontraport-fields__title">ONTRAPORT FIELDS</p>
                  <ul class="ontraport-fields__list collapsible">
                    <li class="ontraport-fields__item">
                      <div class="collapsible-header">
                        <i class="material-icons">expand_more</i>
                        Contact Information
                      </div>
                    </li>
                  </ul>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>

    <script src="js/min-jquery.js"></script>
    <script src="js/materialize.min.js"></script>
    
    <script src="js/lodash.min.js"></script>
    <script src="js/jquery.mask.min.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
    <script src="js/match.js"></script>
    <script>
        const formID = <?php echo $formID; ?>;
        console.log('formID', formID );
    </script>
    <script src="js/main.js"></script>

  </body>
</html>  


