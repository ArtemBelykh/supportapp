//for the datapicker
const currYear = new Date().getFullYear();

$(document).ready(function() {
  //Select field
  $('select').formSelect();
  //Tooltips
  $('.tooltipped').tooltip();

  let windowSize = $(window).width();

  $(window).resize(() => (windowSize = $(window).width()));

  if (windowSize > 1100) {
    $('.openLeftMenu').toggleClass('rotate');
    $('.left-menu-logo').toggleClass('large-logo');
    $('.left-menu').addClass('showLeftMenu');
    $('.main-wrapper').addClass('pushContent');
    $('.menu-link__heading').addClass('heading-show');
    //Removing tooltips
    $('.tooltipped').tooltip('destroy');
  }
  // Left menu actions
  $('.openLeftMenu').click(function() {
    $(this).toggleClass('rotate');
    $('.left-menu-logo').toggleClass('large-logo');
    if ($('.left-menu').width() <= 60) {
      $('.left-menu').addClass('showLeftMenu');
      $('.main-wrapper').addClass('pushContent');
      $('.menu-link__heading').addClass('heading-show');
      //Removing tooltips
      $('.tooltipped').tooltip('destroy');
    } else {
      $('.left-menu').removeClass('showLeftMenu');
      $('.main-wrapper').removeClass('pushContent');
      $('.menu-link__heading').removeClass('heading-show');
      //Adding tooltips
      $('.tooltipped').tooltip();
    }
  });
  // Datepiker settings (see materialize documentation)
  $('.datepicker').datepicker({
    defaultDate: new Date(currYear - 5, 1, 31),
    // setDefaultDate: new Date(2000,01,31),
    // maxDate: new Date(currYear - 5, 12, 31),
    yearRange: [1945, currYear - 1],
    format: 'dd/mm/yyyy'
  });

  //Tabs with forms
  $('.collapsible').collapsible({
    accordion: false
  });
});

// Show picked photo of user's pet
function readURL(input) {
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function(e) {
      $('#petPhoto')
        .attr('src', e.target.result)
        .removeClass('hidden');      
    };
    reader.readAsDataURL(input.files[0]);
  }
}
