//for the datapicker


$(document).ready(function () {
  const currYear = new Date().getFullYear();
  //Select field
  $('select').formSelect();
  //Tooltips
  $('.tooltipped').tooltip();
  $('.nav-tooltipped').tooltip();

  let windowSize = $(window).width();

  $(window).resize(() => (windowSize = $(window).width()));

  if (windowSize > 1100) {
    $('.openLeftMenu').toggleClass('rotate');
    $('.left-menu-logo').toggleClass('large-logo');
    $('.left-menu').addClass('showLeftMenu');
    $('.main-wrapper').addClass('pushContent');
    $('.menu-link__heading').addClass('heading-show');
    //Removing tooltips
    $('.nav-tooltipped').tooltip('destroy');
  }
  // Left menu actions
  $('.openLeftMenu').click(function () {
    $(this).toggleClass('rotate');
    $('.left-menu-logo').toggleClass('large-logo');
    if ($('.left-menu').width() <= 60) {
      $('.left-menu').addClass('showLeftMenu');
      $('.main-wrapper').addClass('pushContent');
      $('.menu-link__heading').addClass('heading-show');
      //Removing tooltips
      $('.nav-tooltipped').tooltip('destroy');
    } else {
      $('.left-menu').removeClass('showLeftMenu');
      $('.main-wrapper').removeClass('pushContent');
      $('.menu-link__heading').removeClass('heading-show');
      //Adding tooltips
      $('.nav-tooltipped').tooltip();
    }
  });
  // Datepiker settings (see materialize documentation)
  $('.datepicker').datepicker({
    defaultDate: new Date(currYear - 5, 1, 31),
    // setDefaultDate: new Date(2000,01,31),
    // maxDate: new Date(currYear - 5, 12. 31),
    yearRange: [1945, currYear - 1],
    format: 'mm/dd/yyyy',
  });

  //Tabs with forms
  $('.collapsible').collapsible({
    accordion: false,
  });

  // $('.carousel').carousel({ noWrap: true, dist: 0, shift: 0 });

  const switchTo = prepareSections({
    ['pets-section']: () =>
        $('.carousel').carousel({ noWrap: true, dist: 0, shift: 0 }),
  });
  $('.menu-link').each(function () {
    if ($(this).data('section')) {
      $(this).click(() => switchTo($(this).data('section')));
    }
  });

  const userId = 2240;
  loadUserInfo();
  loadPetsInfo();
});

async function loadUserInfo() {
  const apiUrl = './sql/';
  const response = await fetch(
      `${apiUrl}sql_get_contact_by_id.php`,
      { mode: 'no-cors' }
  );
  const json = await response.json();
  console.log('json', json);
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
  });
}

async function loadPetsInfo() {
  const apiUrl = './sql/';
  try {
    const response = await fetch(
        `${apiUrl}sql_get_contact_pets_by_id.php`,
        { mode: 'no-cors' }
    );
    const json = await response.json();

    // const json = [{ full: 'bruh bruh bruh', short: 'bruh', breed: 'bruh terier', weight: 6.9, staus: true }];

    const populateItem = (pet) =>
        `<div class="carousel-item row"">\
        <div class="col">\
          <div class="card">\
            <div class="card-image">\
              <img src="img/cat.jpg">\
              ${
            pet.status
                ? '<span class="card-badge red"><i class="material-icons">warning</i> ESA isn\'t active</span>'
                : '<span class="card-badge green"><i class="material-icons">done</i> ESA is active</span>'
        }
              <span class="card-title">${pet.full}</span>\
            </div>\
            <div class="card-content">\
              <ul>\
                <li class="short">${pet.short}</li>\
                <li class="breed">${pet.breed}</li>\
                <li class="weight">${pet.weight}</li>\
              </ul>\
            </div>\
            <div class="card-action">\
              <a href="#">Details</a>\
            </div>\
          </div>\
        </div>\
      </div>`;

    if (json.length > 0) {
      const carousel = $('section#pets-section .carousel');
      json.forEach((pet) => {
        carousel.append(populateItem(pet));
      });
    }
    $('.carousel').carousel({ noWrap: true, dist: 0, shift: 0 });
  } catch (error) {
    console.log(error);
  }
}
$('.datepicker').datepicker();
function prepareSections(callbacks) {
  let lastSection = 'profile-section';
  $('.tab-section').addClass('hidden');
  $(`#${lastSection}`).toggleClass('hidden');

  return (sectionID) => {
    $(`#${lastSection}`).addClass('hidden');
    $(`#${sectionID}`).removeClass('hidden');
    if (callbacks[sectionID]) callbacks[sectionID]();
    lastSection = sectionID;
  };
}

// Show picked photo of user's pet
function readURL(input) {
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      $('#petPhoto').attr('src', e.target.result).removeClass('hidden');
    };
    reader.readAsDataURL(input.files[0]);
  }
}
