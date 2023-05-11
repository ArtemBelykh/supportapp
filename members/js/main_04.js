//for the datapicker
const currYear = new Date().getFullYear();

const apiUrl = 'http://104.248.191.131/sql/';

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
    format: 'mm/dd/yyyy'
  });

  //Tabs with forms
  $('.collapsible').collapsible({
    accordion: false
  });

  loadUserInfo();
});

async function loadUserInfo() {
  const response = await fetch(`${apiUrl}sql_get_contact_by_id.php?id=2240`, { mode: 'no-cors' });
  const json = await response.json();
  // const json = JSON.parse('[{"contact_id":"2240","firstname":"Alex","lastname":"Sokolov","birthday":"2018-12-31","email":"alex.code.keen@gmail.com","gender":"1","is_over_18":"1"}]');
  const userData = json[0];

  const profileForm = $('#profile-form');

  // Change birthday date format
  userData.birthday = new Date(userData.birthday).toLocaleDateString('en-US');

  $('#welcome-name').text(userData.firstname);

  // Update gender
  let gender = userData.gender == 1 ? 'male' : 'female';
  profileForm.find(`input[name="gender"][id="${gender}"`).attr('checked', true);
  delete userData.gender;

  // Update other fields
  Object.entries(userData).forEach(([key, value]) => {
    profileForm.find(`#${key}`).val(value);
    profileForm.find(`label[for="${key}"]`).toggleClass('active');
  })

  // **** image upload changes (1/2) starts **** 
  // // const image = await fetch(`imageView.php?id=1`, { mode: 'no-cors' });
  const image = "sql/sql_v_get_pet_image_by_pet_id.php?pet_id=2368"
  $('#petPhoto')
     .attr('src', image )
     .removeClass('hidden');
  // **** image upload changes (1/2) ends **** 
}

// Show picked photo of user's pet
function readURL(input) {

  if (input.files && input.files[0]) {

    const reader = new FileReader();
    const file  = input.files[0];

    reader.onload = function(e) {
      $('#petPhoto')
        .attr('src', e.target.result)
        .removeClass('hidden');
    };
    
    // **** image upload changes (2/2) starts **** 
    reader.onloadend = function(e) {
      if (e.target.readyState == FileReader.DONE) { // DONE == 2
        $.post("sql/sql_ins_upd_pet_image_02.php",
              {
                "pet_id":"2368",
                "file":e.target.result,
                "name":file.name,
                "type":file.type 
              },
              function(data){
                //alert(data);
              }
        );
      }
    }
    // **** image upload changes (2/2) ends **** 

    reader.readAsDataURL(input.files[0]);     
  }
}
