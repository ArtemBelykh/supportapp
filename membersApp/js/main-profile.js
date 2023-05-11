//for the datapicker
const currYear = new Date().getFullYear();

const apiUrl = './sql/';

$(document).ready(function () {
  //Select field
  $('select').formSelect();

  let windowSize = $(window).width();

  $(window).resize(() => (windowSize = $(window).width()));
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

  const userId = 2240;
  loadUserInfo(userId);
  loadPetsInfo(userId);
});

async function loadUserInfo(userId) {
  const response = await fetch(
    `${apiUrl}sql_get_contact_by_id.php?id=${userId}`,
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

async function loadPetsInfo(userId) {
  try {
    const response = await fetch(
      `${apiUrl}sql_get_contact_pets_by_id.php?id=${userId}`,
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
