
$(document).ready(function () {
    $(".signup-link").click((event) => {
        $(".signup-form-block").toggleClass('hide');
        $(".login-form-block").toggleClass('hide');
    });

});