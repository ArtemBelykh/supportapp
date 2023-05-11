console.log(2)
//for the datapicker
var currYear = new Date().getFullYear();

var apiUrl = 'http://104.248.191.131/members/sql/';

$(document).ready(function () {
  // if there are unread messages
  $('[data-section="messagebot-section"]').append(generateNotyIcon());
  const notyIcon = $('.noty-icon');
  // select states
  // populateStates();
  //Select field
  $('select').formSelect();
  //Tooltips
  $('.tooltipped').tooltip();
  $('.nav-tooltipped').tooltip();

  $('.form-block').find('input.select-dropdown').attr('disabled', true);

  // $('.carousel').carousel();

  $('input[type=tel]').mask('(999) 999-9999');

  let windowSize = $(window).width();

  $(window).resize(() => (windowSize = $(window).width()));
  if (windowSize < 1100) {
    notyIcon.css({ top: '8px', left: '30px' });
    $('.menu-link.switch i').addClass('--smallMenu');
  }
  if (windowSize > 1100) {
    $('.openLeftMenu').toggleClass('rotate');
    // $('.left-menu-logo').toggleClass('large-logo');
    $('.left-menu').addClass('showLeftMenu');
    $('.main-wrapper').addClass('pushContent');
    $('.menu-link__heading').addClass('heading-show');

    $('.menu-link.switch i').removeClass('--smallMenu');

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
      // Change position notify icon
      notyIcon.css({ top: '5px', left: '40px' });
      $('.menu-link.switch').next('i').removeClass('--smallMenu');
      $('.menu-link.switch i').removeClass('--smallMenu');
      // $('.menu-link.switch')
      //   .next('i')
      //   .css({ left: 'unset', 'font-size': '2rem' });
    } else {
      $('.left-menu').removeClass('showLeftMenu');
      $('.main-wrapper').removeClass('pushContent');
      $('.menu-link__heading').removeClass('heading-show');
      //Adding tooltips
      $('.nav-tooltipped').tooltip();
      // Change position notify icon
      notyIcon.css({ top: '8px', left: '30px' });
      $('.menu-link.switch i').addClass('--smallMenu');
      $('.menu-link.switch').next('i').addClass('--smallMenu');
      // $('.menu-link.switch')
      //   .next('i')
      //   .css({ left: '35px', 'font-size': '1.5rem' });
    }
  });

  // Validation
  // $('#profile-form').validate({
  //   errorPlacement: function (error, element) {
  //     if (
  //       element.hasClass('phone') ||
  //       element.hasClass('address_1') ||
  //       element.hasClass('address_2') ||
  //       element.hasClass('city') ||
  //       element.hasClass('ZIP')
  //     ) {
  //       error
  //         .css({
  //           position: 'absolute',
  //           top: '40px',
  //           color: '#F44336',
  //           'font-size': '12px',
  //         })
  //         .insertAfter(element);
  //     }
  //   },
  //   rules: {
  //     firstname: 'required',
  //     lastname: 'required',
  //     phone: {
  //       required: true,
  //       phoneUS: true,
  //     },
  //     address_1: 'required',
  //     city: {
  //       lettersonly: true,
  //       required: true,
  //     },
  //     ZIP: {
  //       digits: true,
  //       required: true,
  //       minlength: 5,
  //     },
  //   },
  // });

  // Datepiker settings (see materialize documentation)
  // $('.datepicker').datepicker({
  //   // setDefaultDate: new Date(2000,01,31),
  //   // maxDate: new Date(currYear - 5, 12, 31),
  //   // format: 'mm/dd/yyyy',
  // });

  $('.collapsible').collapsible({
    onOpenStart(el, options) {
      const refEl = $(el);
      refEl.find('.collapsible-header a').find('.material-icons').remove();
      refEl
        .find('.collapsible-header a')
        .append('<i class="material-icons">expand_less</i>');
      if (windowSize < 1100 || !$('.left-menu').hasClass('showLeftMenu')) {
        $('.menu-link.switch i').addClass('--smallMenu');
        $('.menu-link.switch').next('i').addClass('--smallMenu');
      }
    },
    onCloseStart(el) {
      const refEl = $(el);
      refEl.find('.collapsible-header a').find('.material-icons').remove();
      refEl
        .find('.collapsible-header a')
        .append('<i class="material-icons">expand_more</i>');
      // refEl.find('.collapsible-header p').addClass('ellipsed');
      if (windowSize < 1100 || !$('.left-menu').hasClass('showLeftMenu')) {
        $('.menu-link.switch i').addClass('--smallMenu');
        $('.menu-link.switch').next('i').addClass('--smallMenu');
      }
    },
  });

  //Tabs with forms

  // const switchTo = prepareSections({});

  // $('.menu-link').each(function () {
  //   $(this).click((e) => {
  //     if ($(this).data('purpose') === 'switch') {
  //       console.log('$(this', $(this));

  //       $(this).data('open', true);
  //       if ($(this).data('open') === true) {
  //         setTimeout(() => {
  //           $('.left-menu')
  //             .find(`[data-section="personaldata-section"]`)
  //             .focus();
  //         });
  //       }
  //       switchTo('personaldata-section');
  //     } else {
  //       switchTo($(this).data('section'));
  //     }
  //     // const activeTab = $('section.activeTab');
  //     // if (
  //     //   !activeTab.attr('class').includes('activecase-section') &&
  //     //   $(this).data('purpose') === 'switch'
  //     // ) {
  //     //   $(this).data('open', true);
  //     // }
  //     // if (
  //     //   !activeTab.attr('class').includes('activecase-section') &&
  //     //   $(this).data('open') === true &&
  //     //   $(this).closest('li').hasClass('active')
  //     // ) {
  //     //   e.stopPropagation();
  //     // }
  //   });
  // });

  // loadUserInfo(userId);
  // loadAddressInfo(userId);

  // // update field
  // $('.btns-block__btn-search').on('click', () => {
  //   updateBillingForm()
  //     .done((data) => {
  //       if (data !== '1') {
  //         cancelHandler();
  //       } else {
  //         $(".form-block__heading:contains('Billing Address')")
  //           .closest('.form-block')
  //           .find('.collapsible-body input')
  //           .each((i, el) => {
  //             let newVal = $(el).val();
  //             $(el).val(newVal);
  //             $(el).attr('data-old', newVal);
  //             $(el).css({
  //               'border-bottom': '1px solid #9e9e9e',
  //               'box-shadow': 'none',
  //             });
  //             $(el).focusout();
  //           });
  //       }
  //       $('.btns-block__btn-cancel').attr('disabled', true);
  //       $('.btns-block__btn-save').attr('disabled', true);
  //     })
  //     .fail(() => {
  //       $('.btns-block__btn-save').attr('disabled', true);
  //     });
  // });
  $(`#search-section`).addClass('activeTab');
  // fetch('sql/sql_customer_search.php')
  //   .then(res => res.json())
  //   .then(data => {
  //     console.log(1)
  //     $('#myTable').DataTable({
  //       data,
  //       columns: [
  //         { 'data': 'contact_id' },
  //         { 'data': 'firstname' },
  //         { 'data': 'lastname' },
  //         { 'data': 'birthday', visible: false, searchable: false },
  //         { 'data': 'email' },
  //         { 'data': 'gender', visible: false, searchable: false },
  //         { 'data': 'is_over_18', visible: false, searchable: false },
  //         { 'data': 'phone' },
  //       ],
  //     });
  //   })
  //   .catch(err => console.log(err))
})

function cancelHandler(e) {
  $(".form-block__heading:contains('Billing Address')")
    .closest('.form-block')
    .find('.collapsible-body input')
    .each((i, el) => {
      $(el).val($(el).attr('data-old'));
      $(el).css({ 'border-bottom': '1px solid #9e9e9e', 'box-shadow': 'none' });
      $(el).focusout();
    });
  $('.btns-block__btn-cancel').attr('disabled', true);
}

function populateStates() {
  let stateSelect = $('select#state_name');
  fetch('http://104.248.191.131/sql/sql_v_us_states_www_01.php', {
    method: 'GET',
    mode: 'no-cors',
  })
    .then((response) => response.json())
    .then((json) => {
      let options = json.reduce((total, item) => {
        return (
          total +
          `<option value=${item.state_code}>${item.state_name}</option>\n`
        );
      }, '');
      stateSelect.append(options);
      stateSelect.formSelect();
    })
    .catch(console.error);
}

function createElement(tag, ...classes) {
  const element = document.createElement(tag);
  if (classes) {
    for (let clazz of classes) {
      element.classList.add(clazz);
    }
  }
  return element;
}

async function loadAddressInfo(userId) {
  try {
    const response = await fetch(
      `${apiUrl}sql_get_contact_w_address_by_id.php?id=${userId}`,
      { mode: 'no-cors' }
    );
    const json = await response.json();
    /* return
   {"customer":{"contact_id":"2240","firstname":"Alex","lastname":"Sokolov","birthday":"2018-12-31","email":"alex.code.keen@gmail.com","gender":"1","is_over_18":"1"},
   "pets":[
     {"pet_id":"2368","contact_id":"2240","pet_type_id":"1","title":"Schnapps","breed":"British","weight":"12.00","op_order":"0","is_active":"1"},
      {"pet_id":"2369","contact_id":"2240","pet_type_id":"1","title":"Jeremy","breed":"Labrador","weight":"12.00","op_order":"1","is_active":"1"}
    ]}
  */
    const userAddress = json.address;
    const profileForm = $('#profile-form');

    // Update other fields
    Object.entries(userAddress).forEach(([key, value]) => {
      if (key === 'state_name') {
        profileForm
          .find(`#${key}`)
          .find(`option:contains(${value})`)
          .attr('selected', true);
        $('select#state_name').parent().find('input').val(value);
      } else {
        profileForm.find(`#${key}`).val(value);
      }
      profileForm.find(`label[for="${key}"]`).toggleClass('active');
    });

    $(".form-block__heading:contains('Billing Address')")
      .closest('.form-block')
      .find('.collapsible-body input')
      .each((i, el) => {
        // if(el.hasClass('.select-dropdown.dropdown-trigger')) {

        // } else {
        // $('.btns-block__btn-save').attr('disabled', true);
        // $('.btns-block__btn-cancel').attr('disabled', true);
        $(el).attr('data-old', $(el).val());
        $(el).on('focus', () => {
          // $('.btns-block__btn-save').removeAttr('disabled');
          $('.btns-block__btn-cancel').removeAttr('disabled');
        });
        $(el).on('focusout', () => {
          if ($(el).attr('data-old') === $(el).val()) {
            $('.btns-block__btn-save').attr('disabled', true);
          }
        });
        // }
      });
  } catch (err) {
    console.log(err);
  }
}

async function checkIfImageCorrectlyLoaded(imageId) {
  const response = await fetch(
    `http://104.248.191.131/members/sql/sql_v_get_pet_image_by_pet_id.php?pet_id=${imageId}`
  );
  const data = response.blob();
  return data;
}

function displayPetsData(pet) {
  // const json = [{ full: 'bruh bruh bruh', short: 'bruh', breed: 'bruh terier', weight: 6.9, staus: true }];
  return `<div class="carousel-item" id=${pet.pet_id}>\
            <div class="col">\
              <div class="card">\
                <div class="card-image">\
								  <div class="input-field profile-photo__pic ">
                    <div class="pic-edit">
                      <img
                        id="petPhoto-${pet.pet_id}"
                        class="hidden"
                        alt="your pet's photo"
                      />
                      <label class="edit-sign">
                        <input type="file" onchange="readURL(this);" />+
                      </label>
								    </div>
							    </div>
                </div>\
                <div class="card-content">\
                  <ul>\
                    <li class="title"><span>${pet.title}</span><i class="material-icons edit-pet-info">edit</i></li>\
                    <li class="breed"><span>${pet.breed}</span><i class="material-icons edit-pet-info">edit</i></li>\
                    <li class="weight"><span>${pet.weight}</span> lbs<i class="material-icons edit-pet-info">edit</i></li>\
                  </ul>\
                </div>\
                <div class="card-action">\
                  <a href="#">Details</a>\
                </div>\
              </div>\
            </div>\
          </div>`;
}

// function prepareSections(callbacks) {
//   let lastSection = 'search-section';
//   $('.tab-section').addClass('hidden');
//   $(`#${lastSection}`).removeClass('hidden');
//   $(`#${lastSection}`).removeClass('activeTab');
//   return (sectionID) => {
//     $(`#${lastSection}`).addClass('hidden');
//     $(`#${lastSection}`).removeClass('activeTab');
//     $(`#${sectionID}`).addClass('activeTab');
//     $(`#${sectionID}`).removeClass('hidden');
//     if (callbacks[sectionID]) callbacks[sectionID]();
//     lastSection = sectionID;
//   };
// }

// Orders Page
var orders = [
  {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    phone: '12313123',
    email: 'test@email.com',
    transStatus: 'sent',
  },
  {
    id: 2,
    transactionDate: '08-08-2020',
    transTotal: '400',
    transStatus: 'sent',
  },
  {
    id: 3,
    transactionDate: '09-08-2020',
    transTotal: '500',
    transStatus: 'in stock',
  },
  {
    id: 4,
    transactionDate: '10-08-2020',
    transTotal: '600',
    transStatus: 'in stock',
  },
];

function generateNotyIcon() {
  // get amount of unread messages
  const messagesAmount = 9;
  if (messagesAmount > 0 && messagesAmount < 10) {
    return `<div class="noty-icon">
        <span>${messagesAmount}</span>
      </div>`;
  } else if (messagesAmount >= 10) {
    return `<div class="noty-icon">
        <span>9+</span>
      </div>`;
  }
}
