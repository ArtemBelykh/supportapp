<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <link rel="stylesheet" type="text/css" href="./assets/css/styles.css">
  <link rel="shortcut icon" href="./assets/img/favicon.png">
  <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css">
  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
  <script type="text/javascript" src="./assets/js/index.js"></script>
  <title>Providers' Administration Portal</title>
</head>

<body>
  <div class="sign-in">
    <div class="heading">
      <p class="heading-label">Providers' Administration Portal</p>
      <img id="esa-logo" class="logos" src="./assets/img/ESA_logo.PNG" alt="ESA logo" />
    </div>
    <div class="form-block">
      <form action="" enctype="application/x-www-form-urlencoded" name="login-form" method="post" class="sign-in-form">
        <div class="text-fields">
          <label for="last-name">Login</label>
          <div class="input-area">
            <input id="last-name" class="sign-in-form-inputs" type="text" name="Handler's Last Name" minlength="3" data-pristine="true" required>
            <span class="warning-icons"><i class="material-icons">error</i></span>
            <span class="error-message">You need type at least 3 symbols</span>
          </div>

        </div>
        <div class="text-fields">
          <label for="verification">Password</label>
          <div class="input-area">
            <input id="verification" class="sign-in-form-inputs" type="text" name="ESA Verification" minlength="3" data-pristine="true" required>
            <span class="warning-icons"><i class="material-icons">error</i></span>
            <span class="error-message">You need type at least 3 symbols</span>
          </div>
        </div>
        <input id="verify" type="submit" value="Submit To Verify">
        <div id="validate-message" hidden>Should be at least 3 symbols</div>
      </form>
    </div>
    <footer>
      <div>
        <img id="federal-laws-logos" class="logos" src="./assets/img/Federal_Laws_logos.PNG" alr="Federal Laws logos" />
      </div>
      <span class="rights-text">© 2019 ESA Verification</span>
    </footer>
  </div>
</body>

</html>
