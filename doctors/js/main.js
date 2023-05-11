const apiUrl = './sql/';
let contactID;
let currReviewId;
let currPage = 1;
let currTab = 1;
let testedData = [];
let reqTimerId;
let funcTimerId;

// for Apple products date
function castDateToISOFormat(arr) {
  for (let el of arr) {
    if (el.order_time) {
      el.order_time = el.order_time.replace(/-/g, '/');
    } else if (el.review_date) {
      el.review_date = el.review_date.replace(/-/g, '/');
    }
  }
}

function isIOS() {
  return (
    navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ||
    navigator.platform.includes('Mac')
  );
}

function parseDate(date) {
  let timezoneOffset = new Date(date).getTimezoneOffset();
  let timezoneDate = new Date(
    new Date(date).getTime() - timezoneOffset * 60 * 1000
  );

  return `${(timezoneDate.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${timezoneDate
      .getDate()
      .toString()
      .padStart(2, '0')}-${timezoneDate.getFullYear()}`;
}

function sortByDate(arr) {
  const copy = arr.concat();
  return copy.sort((date1, date2) => {
    return (
      new Date(date1.order_time).getTime() -
      new Date(date2.order_time).getTime()
    );
  });
}

function is24hoursPassed(date) {
  if (new Date().getTime() - new Date(date).getTime() > 36e5 * 24) {
    return true;
  }
  return false;
}

function upperFirstLetter(str) {
  const lowerCasedStr = str.toLowerCase();
  return lowerCasedStr[0].toUpperCase() + lowerCasedStr.slice(1);
}

function populateArr(arr) {
  let copy = arr.slice();
  let obj = {};
  if (copy.length < 19) {
    if (copy[0] && Object.keys(copy[0]).length > 0) {
      obj = { ...copy[0] };
      for (let k in obj) {
        obj[k] = '';
      }
    }
    for (let i = copy.length; i < 19; i++) {
      copy[i] = obj;
    }
  }
  return copy;
}


$(document).ready(function () {
  // request to server
  function serverRepeatRequest() {
    let delay = 30000;
    if (currPage === 1) {
      funcTimerId = setTimeout(() => {
        reqTimerId = setTimeout(function request() {
          showSpinner('forRepeatReq');
          loadReviews(`sql_get_reviews_by_doc_id.php?id=${currDoctorId}`).then(
            (data) => {
              hideSpinner('forRepeatReq');
              castDateToISOFormat(data);
              const populatedData = populateArr(data);
              $('.users-table tbody tr').remove();
              sortByDate(populatedData).forEach((userData) => {
                $('.users-table tbody').append(generateTableBody(userData));


              });
              $('.app-block__review-title span').text(
                data.length >= 100 ? '100+' : data.length
              );
              // Handle Row Click
              $('.users-table tbody tr').on('click', handleRowClick);
              // Highlight table rows
              highlightTableRows();
              reqTimerId = setTimeout(request, delay);
            }, delay)
        })
      }, delay)
    }

  }

  // opee/close menu
  showSpinner();
  $('.app-block__btn').on('click', handleBtnMenuClick);
  loadReviews(`sql_get_reviews_by_doc_id.php?id=${currDoctorId}`).then(
    (data) => {
      hideSpinner();
      $('.app-block__review-title').after(generateTabs());
      $('.btn-tab1').addClass('active');
      $('.arrow.left').remove();

      serverRepeatRequest();

      // handle tabs
      // tab1
      $('.btn-tab1').on('click', () => {
        serverRepeatRequest();
        currTab = 1;

        $('.app-block__review-title h3').text('Patients available for review:');
        $('.tabs .btn').removeClass('active');
        $('.btn-tab1').addClass('active');
        $('.arrow.left').remove();
        showSpinner();
        if (currPage === 2) {
          $('.app-block__review-title').show();
          $('.tabs .tabs__col2 .btn-back').hide();
          $('.second-page').hide();
        }
        currPage = 1;
        $('.users-table').html('');
        $('.users-table').show();
        loadReviews(`sql_get_reviews_by_doc_id.php?id=${currDoctorId}`).then(
          (data) => {
            hideSpinner();
            $('.users-table').append(generateTableHead());
            $('.users-table').append('<tbody></tbody>');
            castDateToISOFormat(data);
            // console.log('data', data);
            const populatedData = populateArr(data);
            sortByDate(populatedData).forEach((userData) => {
              $('.users-table tbody').append(generateTableBody(userData));
            });
            $('.app-block__review-title span').text(
              data.length >= 100 ? '100+' : data.length
            );
            // Handle Row Click
            $('.users-table tbody tr').on('click', handleRowClick);
            // Highlight table rows
            highlightTableRows();
          }
        );

      });

      // tab2
      $('.btn-tab2').on('click', () => {
        currTab = 2;
        clearTimeout(reqTimerId);
        clearTimeout(funcTimerId);
        $('.app-block__review-title h3').text('Recent reviews:');
        $('.tabs .btn').removeClass('active');
        $('.btn-tab2').addClass('active');
        $('.arrow.left').remove();
        showSpinner();
        if (currPage === 2) {
          $('.app-block__review-title').show();
          $('.tabs .tabs__col2 .btn-back').hide();
          $('.second-page').hide();
        }
        currPage = 1;
        $('.users-table').html('');
        $('.users-table').show();
        loadReviews(
          `sql_get_last_solid_reviews_by_doc_id.php?id=${currDoctorId}`
        ).then((data) => {
          // console.log('last_solid_reviews', data);
          hideSpinner();
          $('.users-table').append(generateTableHead('special'));
          $('.users-table').append('<tbody></tbody>');
          castDateToISOFormat(data);
          // console.log('data', data);
          const populatedData = populateArr(data);
          sortByDate(populatedData).forEach((userData) => {
            $('.users-table tbody').append(generateTableBody(userData));
          });
          $('.app-block__review-title span').text(
            data.length >= 100 ? '100+' : data.length
          );
          // Handle Row Click
          $('.users-table tbody tr').on('click', handleRowClick);
          // Highlight table rows
          highlightTableRows();
        });
      });

      // tab3
      $('.btn-tab3').on('click', () => {
        currTab = 3;
        clearTimeout(reqTimerId);
        clearTimeout(funcTimerId);
        $('.app-block__review-title h3').text('Suspended reviews:');
        $('.tabs .btn').removeClass('active');
        $('.btn-tab3').addClass('active');
        $('.arrow.left').remove();
        showSpinner();
        if (currPage === 2) {
          $('.app-block__review-title').show();
          $('.tabs .tabs__col2 .btn-back').hide();
          $('.second-page').hide();
        }
        currPage = 1;
        $('.users-table').html('');
        $('.users-table').show();
        loadReviews(
          `sql_get_last_suspended_reviews_by_doc_id.php?id=${currDoctorId}`
        ).then((data) => {
          // console.log('last_suspended_reviews', data);
          const populatedData = populateArr(data);
          // console.log('populatedData', populatedData);
          hideSpinner();
          $('.users-table').append(generateTableHead('special'));
          $('.users-table').append('<tbody></tbody>');
          castDateToISOFormat(populatedData);
          // console.log('data', data);
          sortByDate(populatedData).forEach((userData) => {
            $('.users-table tbody').append(generateTableBody(userData));
          });
          $('.app-block__review-title span').text(
            data.length >= 100 ? '100+' : data.length
          );
          // Handle Row Click
          $('.users-table tbody tr').on('click', handleRowClick);
          // Highlight table rows
          highlightTableRows();
        });
      });

      $('.users-table').prepend(generateTableHead());
      castDateToISOFormat(data);
      const populatedData = populateArr(data);
      sortByDate(populatedData).forEach((userData) => {
        $('.users-table tbody').append(generateTableBody(userData));
      });
      $('.app-block__review-title span').text(
        data.length >= 100 ? '100+' : data.length
      );
      // Handle Row Click
      $('.users-table tbody tr').on('click', handleRowClick);
      // Highlight table rows
      highlightTableRows();
    }
  );

  // Validator
  $.validator.addMethod(
    'incorrectId',
    function (value, element, param) {
      return parseInt(value, 10) === currDoctorId;
    },
    'Your ID is not correct'
  );

  $('#form').validate({
    rules: {
      id: {
        required: true,
        number: true,
        incorrectId: true,
      },
    },
    messages: {
      id: {
        required: 'Please specify your ID',
      },
    },
    submitHandler: function (form, e) {
      // e.preventDefault();
      $('.modal-footer .modal-submitBtn')
        .html(`<div class="loadingio-spinner-spinner-rb9wwyg8sp--modal hidden"><div class="ldio-06wtkhb3zfoe">
      <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
      </div></div>`);
      $('.modal-footer [class$="--modal"]').css({ display: 'flex' });
      $('.modal-footer .modal-submitBtn').attr('disabled', true);
      $('.modal-footer .modal-cancelBtn').attr('disabled', true);
      updateReview()
        .then((r) => r.json())
        .then((res) => {
          // console.log('res', res);
          $('.modal-footer [class$="--modal"]').hide();
          $('.modal-footer .modal-submitBtn').html('Submit Order Status');
          $('.modal-footer .modal-submitBtn').removeAttr('disabled');
          $('.modal-footer .modal-cancelBtn').removeAttr('disabled');

          form.submit();
          // location.reload();
        })
        .catch((err) => {
          $('[class$="--modal"]').hide();
          $('.modal-footer .modal-submitBtn').html('Submit Order Status');
          $('.modal-footer .modal-submitBtn').removeAttr('disabled');
          $('.modal-footer .modal-cancelBtn').removeAttr('disabled');
          if ($('label#id-error').length === 0) {
            $(
              '<label id="id-error" class="error active" for="id" style="">Something goes wrong, please try later</label>'
            ).insertAfter('input.modal-input');
          }
          $('#id-error').show();
          if (!$('#id-error').text()) {
            $('#id-error').prepend('Something goes wrong, please try later');
          }

          console.log('err', err);
        });
    },
  });
});

function highlightTableRows() {
  $('.users-table tbody tr')
    .find('td')
    .each((i, el) => {
      if ($(el).hasClass('out-of-date')) {
        $(el)
          .parent()
          .hover(
            () => {
              $(el).css({
                color: '#dc3545',
              });
            },
            () => {
              $(el).css({
                color: '#dc3545',
              });
            }
          );
      } else {
        $(el)
          .parent()
          .hover(
            () => {
              $(el).css({
                color: '#000',
              });
            },
            () => {
              $(el).css({
                color: '#fff',
              });
            }
          );
      }
    });
}

function updateReview() {
  let data = {};
  data.comment = $('#textarea').val();
  if ($('select').val() === 'typos') {
    data.reason = 'typos';
  } else if ($('select').val() === 'pending') {
    data.reason = 'pending';
  } else if ($('select').val() === 'approved') {
    data.reason = 'approved';
  } else if ($('select').val() === 'denied') {

    data.reason = 'denied';
  }
  const status = $('select').val();
  if ($('select').val() === 'pending') {
  }





  data = {
    data: {
      ...data,
      status,
      op_contact_id: contactID,
      review_id: currReviewId,
      // hasCalled: $('.hasCalled').is(':checked'),
      hasESAReviewed: $('.hasESAReviewed').is(':checked'),
    },
  };
  //console.log('data:', data.data);
  return fetch(`${apiUrl}sql_update_review.php`, {
    body: JSON.stringify(data),
    method: 'POST',
    mode: 'no-cors',
  });
  // .then((r) => {

  //   return r.json();
  // })
  // .then((d) => console.log('fetch res', d))
  // .catch((err) => err);
}

function handleBtnMenuClick(e) {
  $('.app-block__menu').slideToggle(300);
}

function loadReviews(url) {
  return fetch(`${apiUrl}${url}`, {
    mode: 'no-cors',
  })
    .then((r) => r.json())
    .then((data) => data);
}

function fetchData(url, id) {
  return fetch(`${apiUrl}${url}${id}`, { mode: 'no-cors' })
    .then((r) => r.json())
    .then((data) => data);
}

function handleRowClick(e) {
  clearTimeout(reqTimerId);
  clearTimeout(funcTimerId)
  if (!e.currentTarget.dataset.id) return;
  contactID = $(e.currentTarget).data('id');
  const orderDate = $(e.currentTarget).data('order');
  currReviewId = $(e.currentTarget).data('review-id');
  currPage = 2;
  $('.users-table').hide();
  // $('.tabs .btn').removeClass('active');
  showSpinner();
  Promise.all([
    fetchData('sql_get_contact_w_address_by_id.php?id=', contactID),
    fetchData('sql_get_contact_pets_by_id.php?id=', contactID),
    fetchData('sql_get_quest_by_contact_id.php?id=', contactID),
  ])
    .then((data) => {
      console.log('data', data);
      hideSpinner();
      $('.app-block__review-title').hide();
      $('.second-page').html('');
      // if (!$('.tabs__col2 .btn-back').length) {
      //   $('.tabs__col2').append(`${generateBtnBack()}`);
      // }
      // $('.tabs__col2 .btn-back').show();
      //tabs
      $('.arrow.left').remove();
      $(`.btn-tab${currTab}`).prepend('<i class="arrow left"></i>');

      $('.second-page').show();
      $('.app-block .second-page').append(`
          ${generateCollapsibleMenu(data, orderDate)}
          ${generateBottomSection()}
       `);
      $('.bottom-section__submit-btn').on('click', submitModalBtnHandler);
      $('.questionnaire-collapsible').collapsible({
        accordion: true,
        onOpenStart(el) {
          const refEl = $(el);
          refEl.find('.collapsible-header').find('.material-icons').remove();
          refEl.find('.collapsible-header').append('<span></span>');
        },
        onCloseStart(el) {
          const refEl = $(el);
          refEl.find('.collapsible-header').find('span').remove();
          refEl
            .find('.collapsible-header')
            .append('<i class="material-icons">add</i>');
          refEl.find('.collapsible-header p').addClass('ellipsed');
        },
        onOpenEnd(el) {
          const refEl = $(el);
          const slideDown = (element) =>
            (element.style.height = `${element.scrollHeight}px`);
          refEl.find('.collapsible-header p').removeClass('ellipsed');
        },
      });
      $('.modal').modal();
      $('.modal-content__icon-close').on('click', handleModalClose);
      $('.modal-footer .modal-cancelBtn').on('click', handleModalClose);
      // $('.modal-footer .modal-submitBtn').on('click', handleSubmitForm);
      const select = $('select#doctors');
      select.formSelect();
      $('.bottom-section .select-wrapper li span').css({ color: '#bbb' });
      $('.bottom-section .select-dropdown').css({ color: '#bbb' });
      select.change(function () {
        if ($(this).val() === 'denied') {
          $('.bottom-section .select-wrapper').filter(':eq(0)').nextUntil('.materialize-textarea').remove();
          const additionalSelectTemplate = `
            <select id="doctors-denied" class="bottom-section__doctors ">
              <option value="criteria" selected>Does Not Meet Criteria</option>
              <option value="other">Other</option>				
            </select>
          `;
          $('#textarea').val('Does Not Meet Criteria');
          if (!$('#doctors-denied').length) {
            $(additionalSelectTemplate).insertAfter(select.closest('.select-wrapper'));
          }

          const selectIfDenied = $('select#doctors-denied');
          selectIfDenied.formSelect();

          selectIfDenied.change(function () {
            if (
              $(this).val() === 'other' &&
              $('.hasESAReviewed').prop('checked') === true

            ) {
              console.log(1)
              const mainSelect = $('.bottom-section select#doctors').parent();
              const spans = $(mainSelect).find('span');

              for (let el of spans) {
                $(el).css({ color: '#bbb' });
              }
              mainSelect.find('input.select-dropdown').css({ color: '#bbb' });
              $('.bottom-section__submit-btn').attr('disabled', true);
              $('.bottom-section__submit-btn img').removeClass('filtered');

              setTimeout(() => {
                $('#textarea').focus();
              }, 200);
              $('#textarea').on('input', textareaHandler);
              $('#textarea').val('');
            }
            if ($(this).val() === 'other' && $('.hasESAReviewed').prop('checked') === false) {
              console.log(2)
              setTimeout(() => {
                $('#textarea').focus();
              }, 200);
              $('#textarea').on('input', textareaHandler);
              $('#textarea').val('');
            }
            if ($(this).val() === 'criteria') {
              console.log(3)
              $('#textarea').blur();
              $('#textarea').removeClass('materialize-textarea--error');
              $('#textarea').val('Does Not Meet Criteria');
              $('#textarea').off('input', textareaHandler);
              if ($('p.err span').length) {
                $('p.err span').remove();
              }
            }
          })
        } else if ($(this).val() === 'pending') {
          $('.bottom-section .select-wrapper').filter(':eq(0)').nextUntil('.materialize-textarea').remove();
          const additionalSelectTemplate = `
          <select id="doctors-pending" class="bottom-section__doctors ">
            <option value="typos" selected>Typo or misspellings</option>
            <option value="request">Request for more information</option>
            <option value="symptoms">Why ESA? What symptoms pet relieves?</option>
            <option value="other">Other</option>				
          </select>
        `;
          $('#textarea').val('Typo or misspellings');
          if (!$('#doctors-pending').length) {
            $(additionalSelectTemplate).insertAfter(select.closest('.select-wrapper'));
          }

          const selectIfPending = $('select#doctors-pending');
          selectIfPending.formSelect();

          selectIfPending.change(function () {
            if (
              $(this).val() === 'other' &&
              $('.hasESAReviewed').prop('checked') === true

            ) {
              const mainSelect = $('.bottom-section select#doctors').parent();
              const spans = $(mainSelect).find('span');

              for (let el of spans) {
                $(el).css({ color: '#bbb' });
              }
              mainSelect.find('input.select-dropdown').css({ color: '#bbb' });
              $('.bottom-section__submit-btn').attr('disabled', true);
              $('.bottom-section__submit-btn img').removeClass('filtered');

              setTimeout(() => {
                $('#textarea').focus();
              }, 200);
              $('#textarea').on('input', textareaHandler);
              $('#textarea').val('');
            }
            if ($(this).val() === 'other' && $('.hasESAReviewed').prop('checked') === false) {
              setTimeout(() => {
                $('#textarea').focus();
              }, 200);
              $('#textarea').on('input', textareaHandler);
              $('#textarea').val('');
            }
            if ($(this).val() === 'typos') {
              $('#textarea').blur();
              $('#textarea').removeClass('materialize-textarea--error');
              $('#textarea').val('Typo or misspellings');
              $('#textarea').off('input', textareaHandler);
              if ($('p.err span').length) {
                $('p.err span').remove();
              }
            }

            if ($(this).val() === 'request') {
              $('#textarea').blur();
              $('#textarea').removeClass('materialize-textarea--error');
              $('#textarea').val('Request for more information');
              $('#textarea').off('input', textareaHandler);
              if ($('p.err span').length) {
                $('p.err span').remove();
              }
            }

            if ($(this).val() === 'symptoms') {
              $('#textarea').blur();
              $('#textarea').removeClass('materialize-textarea--error');
              $('#textarea').val('Why ESA? What symptoms pet relieves?');
              $('#textarea').off('input', textareaHandler);
              if ($('p.err span').length) {
                $('p.err span').remove();
              }
            }
          })
        } else {
          $('.bottom-section .select-wrapper').filter(':eq(0)').nextUntil('.materialize-textarea').remove();
          const selectIfDenied = $('select#doctors-denied');
          selectIfDenied.formSelect('destroy');
          selectIfDenied.remove();
          $('#textarea').val('');
          $('#textarea').removeClass('materialize-textarea--error');
          $('p.err span').remove();
        }
        // $('#textarea').removeClass('hidden');
        // if ($('select').val() === 'typos') {

        // } else
        // if (
        //   $(select).val() === 'denied' &&
        //   $('input[type="checkbox"].hasESAReviewed').prop('checked')
        //   // &&
        //   // !$('input[type="checkbox"].hasCalled').prop('checked')
        // ) {
        //   $('.bottom-section__submit-btn').attr('disabled', true);
        //   $('.bottom-section__submit-btn img').removeClass('filtered');
        //   $('.bottom-section .select-dropdown').css({ color: '#bbb' });
        // } else if (
        //   $(select).val() === 'denied' &&
        //   !$('input[type="checkbox"].hasESAReviewed').prop('checked')
        //   // &&
        //   // !$('input[type="checkbox"].hasCalled').prop('checked')
        // ) {
        //   $('.bottom-section__submit-btn').attr('disabled', true);
        //   $('.bottom-section__submit-btn img').removeClass('filtered');
        // }
        // // else if ($('input[type="checkbox"].hasCalled').prop('checked')) {
        // //   $('.bottom-section__submit-btn').attr('disabled', true);
        // //   $('.bottom-section__submit-btn img').removeClass('filtered');
        // //   $('.bottom-section .select-dropdown').css({ color: '#bbb' });
        // // }
        // else {
        // $('.bottom-section .select-dropdown').css({ color: '#555' });
        // $('.bottom-section__submit-btn').removeAttr('disabled');
        // $('.bottom-section__submit-btn img').addClass('filtered');
        // $('#textarea').addClass('hidden');
        // }
        if ($('input[type="checkbox"].hasESAReviewed').prop('checked')) {
          $('.bottom-section select#doctors').parent().find('input.select-dropdown').css({ color: '#555' });
          $('.bottom-section__submit-btn').removeAttr('disabled');
          $('.bottom-section__submit-btn img').addClass('filtered');
        }
      });
      $('input[type="checkbox"].hasESAReviewed').on(
        'change',
        checkboxHasESAReviewedHandler
      );
      // p
      $('.btn-back').on('click', handleBtnBackClick);
      let i = 1;
      while (i <= 18) {
        whichIconPaste('active', i);
        i++;
      }
    })
    .catch((err) => hideSpinner())
    .finally(() => {
      //     $('.app-block__review-title').hide();
      //     $('.app-block .second-page').append(`
      // 	${generateBtnBack()}
      // 	${generateCollapsibleMenu()}
      // `);
      //     $('.collapsible').collapsible();
      //     const elem = $('.collapsible.expandable');
      //     const instance = M.Collapsible.init(elem, {
      //       accordion: false,
      //     });
      //     $('.second-page .btn-back').on('click', handleBtnBackClick);
    });
}

function handleModalClose(e) {
  $('.modal').modal('close');
}

// function handleSubmitForm(e) {
//   e.preventDefault();
//   const data = {};
//   console.log('submit');
// }

function showSpinner(forRepeatReq) {
  if (forRepeatReq) {
    if (!$('.app-block__review-title [class^="loadingio-spinner"]').length) {
      $('[class^="loadingio-spinner"]').clone().appendTo($('.app-block__review-title'));
    }
    $('.app-block__review-title [class^="loadingio-spinner"]').addClass('--servReq');
  } else {
    $('.container > [class^="loadingio-spinner"]').css({
      display: 'flex',
    })
  }
}

function hideSpinner(forRepeatReq) {
  if (forRepeatReq) {
    $('.app-block__review-title [class^="loadingio-spinner"]').removeClass('--servReq').hide();
  } else {
    $('.container > [class^="loadingio-spinner"]').removeClass('--servReq').hide();
  }
}

function generateBtnBack() {
  return `
    <button class="btn btn-back">
      <img src="assets/icons/back.svg" alt="back" class="material-icons">Back to List
    </button>
  `;
}

function generatePartOfMenuForPatient(customerInfo, addressInfo, orderDate) {
  if (!customerInfo.phone) {
    customerInfo.phone = '';
  }
  return `
    <div class="collapsible-header">Patient Info</div>
    <div class="separator"></div>
    <div class="collapsible-body">
      <p><span>Name</span>: ${customerInfo.firstname} ${customerInfo.lastname
    }</p>
      <p><span>Gender</span>: ${customerInfo.gender === '1' ? 'male' : 'female'
    }</p>
      <p class="tel"><span>Phone</span>: ${customerInfo.phone.slice(
      2,
      5
    )}-${customerInfo.phone.slice(5, 8)}-${customerInfo.phone.slice(8)}</p>
      <p><span>Email</span>: ${customerInfo.email}</p>
      <p><span>City</span>: ${addressInfo.city ? addressInfo.city : ''}</p>
      <p><span>State</span>: ${addressInfo.state_name}</p>
      
      <p><span>Order date</span>: ${parseDate(orderDate)}</p>
      <p>
        <label>
          <input class="filled-in" type="checkbox" disabled checked=${customerInfo.is_over_18 === '1' ? true : false
    }/>
          <span>I confirm I am 18 or older</span>
        </label>
      </p>
    </div>`;
}

function generatePartOfMenuForPetInfo(petsInfoArr) {
  return `
    <div class="collapsible-header">Pet info</div>
    <div class="separator"></div>
    <div class="collapsible-body pet-info">
    ${petsInfoArr
      .map(
        (el, i) =>
          `<h6>Pet #${i + 1}:</h6>
                <p><span>Type</span>: ${el.pet_type_id === '1' ? 'DOG' : 'CAT'
          }</p>
                <p><span>Breed</span>: ${el.breed ? el.breed : 'null'}</p>
                <p><span>Name</span>: ${el.title ? el.title.replace(/\"/, '') : 'null'
          }</p>
                <p class="pet1-weight"><span>Weight</span>: ${Math.round(
            el.weight
          )} lbs.</p>
                `
      )
      .join('')}
    </div>`;
}

function generatePartOfMenuForQuestionairee(data) {
  console.log('data', data)
  return `
    <div class="collapsible-header">ESA Questionnaire</div>
    <div class="separator"></div>
    <div class="collapsible-body questionnaire">
      <ul class="collapsible questionnaire-collapsible">${data.length > 0
      ? data
        .map(
          ({ short, answer, question }, i) => `
          ${i === data.length - 1 ?
              `<li>
            <div class="collapsible-header" style="display: flex;">
              <p class="">Please describe the reasons why you need an Emotional Support Animal and what specific symptoms you are hoping to alleviate by having your ESA pet with you?</p>
            </div>
            <div class="collapsible-body" style="display: block;"><span>${answer}</span></div>
          </li>` :
              `<li>
            <div class="collapsible-header">
              <p class="ellipsed">${short}: ${answer}</p>
            </div>
            <div class="collapsible-body"><span>${question}</span></div>
          </li>`}
          
        `
        )
        .join('')
      : `<li>
            <div class="collapsible-header">
              <p class="ellipsed">...</p>
            </div>
            <div class="collapsible-body"><span>...</span></div>
          </li>`
    }</div>
      </ul>`;
}

function generateCollapsibleMenu(data, orderDate) {
  const [
    { customer = {}, address = {} },
    { _, pets },
    questionnaireInfo,
  ] = data;

  return `
  <ul class="collapsible expandable">
    <li class="active">
      ${generatePartOfMenuForPatient(customer, address, orderDate)}
    </li>
    <li class="active">
      ${generatePartOfMenuForPetInfo(pets)}
    </li>
    <li class="active">
      ${generatePartOfMenuForQuestionairee(questionnaireInfo)}
    </li>
  </ul>`;
}


function whichIconPaste(clazz, num) {
  $(`.collapsible.questionnaire-collapsible li:nth-child(${num})`).hasClass(
    clazz
  )
    ? $(
      `.collapsible.questionnaire-collapsible li:nth-child(${num}) .collapsible-header`
    ).append('<span></span>')
    : $(
      `.collapsible.questionnaire-collapsible li:nth-child(${num}) .collapsible-header`
    ).append('<i class="material-icons">add</i>');
}

function handleBtnBackClick(e) {
  currPage = 1;
  $(`.tabs .btn-tab${currTab}`).addClass('active');
  $('div.second-page').hide();
  showSpinner();
  $('.btn-back').hide();
  $('.app-block__review-title').show();
  $('.users-table').show();
  hideSpinner();
}

function generateBottomSection() {
  if (currTab === 2) {
    return `
    <div class="bottom-section">
      ${generateInfoForReviews(
      `sql_get_last_solid_reviews_by_doc_id.php?id=${currDoctorId}`,
      contactID
    )}
    </div>
	`;
  } else if (currTab === 1) {
        return `
    <div class="bottom-section">
    
				<label for="doctors">Doctor's Approval</label>
				
				<script>
				function x(status_val,status_title,is_select) {
				  const con = confirm('Attention! «Denied» option cancel any future interactions with this customer - «Pending» is advised to be used instead. \\nDo you want to continue with «Denied»?')
				    if (con === false) {
				        
				        $('.new_esa').append('<option value="' + status_val + '" '+ is_select +'>' + status_title + '</option>')
				    }
				}
                </script>
				
				<select id="doctors" onchange="$(this).val() === 'denied' ? x('approved','Approved', 'selected') : ''" class="bottom-section__doctors new_esa">
					<option value="approved" selected>Approved</option>
					<option value="pending">Pending</option>
                    <option value="denied">Denied</option>
				</select>
							
        <textarea id="textarea" class="materialize-textarea" placeholder="Add notes here..."></textarea>
        <p class="err"></p>
        <div class="bottom-section__bottom">         
					<p>
						<label>
							<input class="filled-in hasESAReviewed" type="checkbox" name="hasESAReviewed"/>
							<span>ESA application was reviewed</span>
						</label>
					</p>
					<button disabled type="button" class="btn bottom-section__submit-btn">
							<img src='assets/icons/check-disabled.svg' alt="check" class="material-icons">Submit Application
          </button>
				</div>
    </div>
	`;
  } else if (currTab === 3) {
    return `
    <div class="bottom-section">
      ${generateInfoForReviews(
      `sql_get_last_suspended_reviews_by_doc_id.php?id=${currDoctorId}`,
      contactID
    )}
				<label for="doctors">Doctor's Approval</label>
				<select id="doctors" class="bottom-section__doctors">
					<option value="approved" selected>Approved</option>
          <option value="denied">Denied</option>
          <option value="pending">Pending</option>
          <!-- <option value="typos">Typos or Request for More Info</option> -->				
				</select>				
        <textarea id="textarea" class="materialize-textarea" placeholder="Add notes here..."></textarea>
        <p class="err"></p>
        <div class="bottom-section__bottom">         
					<p>
						<label>
							<input class="filled-in hasESAReviewed" type="checkbox" name="hasESAReviewed"/>
							<span>ESA application was reviewed</span>
						</label>
					</p>
					<button disabled type="button" class="btn bottom-section__submit-btn">
							<img src='assets/icons/check-disabled.svg' alt="check" class="material-icons">Submit Application
          </button>
				</div>
    </div>
	`;
  }
}


function generateInfoForReviews(url, userId) {
  loadReviews(url)
    .then((d) => {
      const userData = d.find((el) => +el.op_contact_id === userId);
      const parsedData = JSON.parse(userData.data);
      const reviewDate = userData.review_date;
      if (parsedData.data.comment) {
        $('.bottom-section').prepend(
          `<div class="infoForReviews">
              <p class="--middle">${currTab === 3 ? 'Suspension Info:' : 'Reviewed Info:'
          }</p>
              <p>Reason: ${parsedData.data.reason || ''}</p>
              <p>Comment: ${parsedData.data.comment}</p>
              <p>Date: ${reviewDate || ''}</p>
            </div>`
        );
      } else {
        $('.bottom-section').prepend(
          `<div class="infoForReviews">
              <p class="--middle">${currTab === 3 ? 'Suspension Info:' : 'Reviewed Info:'
          }</p>
              <p>Reason: ${parsedData.data.reason || ''}</p>
              <p>Date: ${reviewDate || ''}</p>
            </div>`
        );
      }
    })
    .catch((err) => console.log(err));
  return '';
}

// function checkboxHasCalledHandler(e) {
//   const spans = document.querySelectorAll(
//     '.bottom-section .select-wrapper li span'
//   );
//   if (
//     $(this).prop('checked') &&
//     $('input[type="checkbox"].hasESAReviewed').prop('checked')
//   ) {
//     for (let el of spans) {
//       $(el).css({ color: '#555' });
//     }
//     $('.bottom-section .select-dropdown').css({ color: '#555' });
//     $('.bottom-section__submit-btn').removeAttr('disabled');
//     $('.bottom-section__submit-btn img').addClass('filtered');
//   } else if (
//     $(this).prop('checked') &&
//     !$('input[type="checkbox"].hasESAReviewed').prop('checked')
//   ) {
//     for (let el of spans) {
//       $(el).css({ color: '#bbb' });
//     }
//     $('.bottom-section .select-dropdown').css({ color: '#bbb' });
//     $('.bottom-section__submit-btn').attr('disabled', true);
//     $('.bottom-section__submit-btn img').removeClass('filtered');
//   } else if (
//     !$(this).prop('checked') &&
//     $('input[type="checkbox"].hasESAReviewed').prop('checked')
//   ) {
//     for (let el of spans) {
//       if (el.textContent === 'Denied') {
//         $(el).css({ color: '#bbb' });
//       }
//     }
//     if ($('select').val() === 'denied') {
//       $('.bottom-section .select-dropdown').css({ color: '#bbb' });
//       $('.bottom-section__submit-btn').attr('disabled', true);
//       $('.bottom-section__submit-btn img').removeClass('filtered');
//     }
//   }
//   // else {
//   //   for (let el of spans) {
//   //     $(el).css({ color: '#bbb' });
//   //   }
//   //   if ($('select').val() === 'denied') {
//   //     $('.bottom-section .select-dropdown').css({ color: '#bbb' });
//   //     $('.bottom-section__submit-btn').attr('disabled', true);
//   //     $('.bottom-section__submit-btn img').removeClass('filtered');
//   //   }
//   // }
// }

function checkboxHasESAReviewedHandler(e) {
  const mainSelect = $('.bottom-section select#doctors').parent();
  const spans = $(mainSelect).find('span');
  if ($(this).prop('checked') && $('.bottom-section select#doctors').val() === 'approved') {
    for (let el of spans) {
      $(el).css({ color: '#555' });
    }
    mainSelect.find('input.select-dropdown').css({ color: '#555' });
    $('.bottom-section__submit-btn').removeAttr('disabled');
    $('.bottom-section__submit-btn img').addClass('filtered');
  } else if ($(this).prop('checked') && ($('#textarea').val() === '')) {
    for (let el of spans) {
      $(el).css({ color: '#bbb' });
    }
    mainSelect.find('input.select-dropdown').css({ color: '#bbb' });
    $('.bottom-section__submit-btn').attr('disabled', true);
    $('.bottom-section__submit-btn img').removeClass('filtered');
  } else if ($(this).prop('checked') && ($('#textarea').val() !== '')) {
    for (let el of spans) {
      $(el).css({ color: '#555' });
    }
    mainSelect.find('input.select-dropdown').css({ color: '#555' });
    $('.bottom-section__submit-btn').removeAttr('disabled');
    $('.bottom-section__submit-btn img').addClass('filtered');
  } else {
    for (let el of spans) {
      $(el).css({ color: '#bbb' });
    }
    mainSelect.find('input.select-dropdown').css({ color: '#bbb' });
    $('.bottom-section__submit-btn').attr('disabled', true);
    $('.bottom-section__submit-btn img').removeClass('filtered');
  }

  // else if (
  //   !$(this).prop('checked')
  //   // &&
  //   // !$('input[type="checkbox"].hasCalled').prop('checked')
  // ) {
  //   for (let el of spans) {
  //     $(el).css({ color: '#bbb' });
  //   }
  //   $('.bottom-section .select-dropdown').css({ color: '#bbb' });
  //   $('.bottom-section__submit-btn').attr('disabled', true);
  //   $('.bottom-section__submit-btn img').removeClass('filtered');
  // } else if (
  //   $(this).prop('checked')
  //   // &&
  //   // $('input[type="checkbox"].hasCalled').prop('checked')
  // ) {
  //   for (let el of spans) {
  //     $(el).css({ color: '#555' });
  //   }

  //   $('.bottom-section .select-dropdown').css({ color: '#555' });
  //   $('.bottom-section__submit-btn').removeAttr('disabled');
  //   $('.bottom-section__submit-btn img').addClass('filtered');
  // } else if (
  //   !$(this).prop('checked')
  //   // &&
  //   // $('input[type="checkbox"].hasCalled').prop('checked')
  // ) {
  //   for (let el of spans) {
  //     $(el).css({ color: '#bbb' });
  //   }
  //   $('.bottom-section .select-dropdown').css({ color: '#bbb' });
  //   $('.bottom-section__submit-btn').attr('disabled', true);
  //   $('.bottom-section__submit-btn img').removeClass('filtered');
  // }
}

function generateTabs() {
  return `
    <div class="tabs">
      <div class="tabs__col1">
        <button class="btn btn-tab1">
          New ESAs
        </button>
        <button class="btn btn-tab2">
          Completed ESAs
        </button>
        <button class="btn btn-tab3">
          Pending ESAs
        </button>
      </div>
    </div>
  `;
}

function generateTableHead(special) {
  return `
    <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>${special ? 'Review Date' : 'Order Date'}</th>
        <th>${special ? 'Status' : 'State'}</th>
      </tr>
    </thead>
  `;
}
function generateTableBody(data) {
    const dataId = data.op_contact_id ? `data-id=${data.op_contact_id}` : '';
    const outOfDate = is24hoursPassed(
    data.order_time ? data.order_time : data.review_date
  )
    ? currTab === 1
      ? 'out-of-date'
      : ''
    : 'date';
  console.log(data)
  if (!data.op_contact_id) {
    data.length = 0
  }

  // if (data.length === 0) {
  //   $('.status').remove()
  //   $('.status').text('')
  // }
    return `
    <tr ${dataId} data-order=${data.order_time ? data.order_time : data.review_date
    } data-review-id=${data.review_id ? data.review_id : 123}>
      <td class=${outOfDate}>${data.length !== 0 ? '<span class="status" style="color: white;width: 30px;padding: 3px;font-size: 12px;height: 30px;background: #4d94ff;">Е</span>' : '' } ${data.op_contact_id ? data.op_contact_id : ''
    }</td>
      <td class=${outOfDate}>${data.firstname
      ? upperFirstLetter(data.firstname)
      : data.firstname === ''
        ? ''
        : ''
    } ${data.lastname
      ? upperFirstLetter(data.lastname)
      : data.lastname === ''
        ? ''
        : ''
    }</td>
      <td class=${outOfDate}>${data.order_time
      ? parseDate(data.order_time)
      : data.review_date
        ? parseDate(data.review_date)
        : data.order_time === '' || data.review_date === ''
          ? ''
          : ''
    }</td>
      <td class=${outOfDate}>${data.state_code
      ? data.state_code
      : data.review_status_id === '1'
        ? 'approved'
        : data.review_status_id === '2'
          ? 'denied'
          : data.review_status_id === '3'
            ? 'pending'
            : ''
              ? data.review_status_id
              : ''
    }</td>
    </tr>`;

  }

function submitModalBtnHandler(e) {

    const textarea = $('#textarea');
    const selectIfDenied = $('select#doctors-denied');
    if (selectIfDenied.length && selectIfDenied.val() === 'other' && textarea.val() === '') {
        e.stopPropagation();
        textarea.addClass('materialize-textarea--error');
        if (!$('p.err span').length) {
            $('p.err').html('<span>Please provide your text</span>');
        }
    } else {
        $('.modal').modal('open');
        $('p.err span').remove();
        textarea.removeClass('materialize-textarea--error');
    }
}


function textareaHandler(e) {
    const element = $(this);

  if (element.val() === '') {
    $('.bottom-section__submit-btn').attr('disabled', true);
    $('.bottom-section__submit-btn img').removeClass('filtered');
    element.addClass('materialize-textarea--error');
    if (!$('p.err span').length) {
      $('p.err').html('<span>Please provide your text</span>')
      element.addClass()
    }
  } else {
    $('.bottom-section__submit-btn').attr('disabled', false);
    $('.bottom-section__submit-btn img').addClass('filtered');
    $('p.err span').remove();
    element.removeClass('materialize-textarea--error');
  }

}

////////////////////////// TESTS TESTS TESTS TESTS TESTS /////////////////////////
class MyTest {
  constructor() { }

  createElement(elem, attrs = {}) {
    const newEl = document.createElement(elem);
    if (Object.keys(attrs).length > 0) {
      for (let [k, v] of Object.entries(attrs)) {
        $(newEl).attr(k, v);
      }
    }
    return newEl;
  }

  loadLibraries() {
    const linkAttrs = {
      rel: 'stylesheet',
      href: 'https://cdnjs.cloudflare.com/ajax/libs/mocha/3.2.0/mocha.css',
    };
    const link = this.createElement('link', linkAttrs);

    document.head.append(link);

    const scriptMochaAttrs = {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/mocha/3.2.0/mocha.js',
      async: true,
    };

    const scriptMocha = this.createElement('script', scriptMochaAttrs);

    $(scriptMocha).on('load', () => {
      const scriptMochaSetup = this.createElement('script');
      scriptMochaSetup.text = "mocha.setup('bdd')";
      document.head.append(scriptMochaSetup);

      const testedScript = this.createElement('script', {
        src: 'js/tests/testedScript.js',
      });
      document.body.append(testedScript);

      const test = this.createElement('script', { src: 'js/tests/test.js' });
      document.body.append(test);

      document.body.insertAdjacentHTML('beforeend', '<div id="mocha"></div>');

      const mochaRunScript = this.createElement('script');
      mochaRunScript.text = 'mocha.run()';
      document.body.append(mochaRunScript);
    });

    document.head.append(scriptMocha);

    const scriptChaiAttrs = {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/chai/3.5.0/chai.js',
      async: true,
    };

    const scriptChai = this.createElement('script', scriptChaiAttrs);
    document.head.append(scriptChai);

    const scriptChaiSetup = this.createElement('script');
    $(scriptChai).on('load', () => {
      scriptChaiSetup.text = 'let assert = chai.assert';
    });

    document.head.append(scriptChaiSetup);
  }
}

// const test1 = new MyTest();
// test1.loadLibraries();
