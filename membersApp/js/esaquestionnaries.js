(() => {
  const apiUrl = './sql/';

  function groupById(arr, id) {
    return arr.reduce((sum, curr) => {
      sum[curr[id]] = sum[curr[id]] || [];
      if (sum.hasOwnProperty(curr[id])) {
        sum[curr[id]].push(curr);
      }
      return sum;
    }, {});
  }

  // Spinner
  function showSpinner() {
    $('.main').append('<div class="loader"></div>');
  }

  function hideSpinner() {
    $('div.loader').hide();
  }

  showSpinner();
  getData(`${apiUrl}sql_get_quests_by_contact_id.php`)
    .then(data => {
      $('.main .esaQuestions-section .row')
        .find('.wrapper')
        .append(
          `<div class="row header-block header-block--wider">
            <div class="header-block__container">
              <h3 class="header-block__title">ESA Questionnaries</h3>
            </div>
          </div>
          <br />
          `
        );
      generateCollapseForQuestionnaries(data);
      $('.esaQuestions-section .panel').on('click', function(e) {
        const icon = $(this).find('i');
        $(this).find('.collapse').collapse('toggle');
        icon.toggleClass('--rotated');

        // $('.esaQuestions-section .panel').collapse({
        //   toggle: true,
        //   // onOpenStart(el) {
        //   //   $(el).find('i').addClass('--rotated');
        //   // },
        //   // onCloseStart(el) {
        //   //   $(el).find('i').removeClass('--rotated');
        //   // }
        // });
      })
    })
    .catch(console.error)
    .finally(() => hideSpinner())

  function generateCollapseForQuestionnaries(data) {
    const groupedData = groupById(data, 'cq_id');
    const container = $('.esaQuestions-section .row .wrapper');
    container.append(`
      <div class="wrapper">
        <div class="esaQuestions">
          <div class="collapsible-header panel-heading">
            <div class="esaQuestions__row">
              <div><span>#id</span></div>
              <div><span></span></div>
              <div><span></span></div>
              <div><span></span></div>
            </div>
          </div>
          <ul class="collapsible panel-group"></ul>`)
      container.find('.collapsible').append(`${Object.keys(groupedData)
        .map((key) => {
          return `
          <li data-id="${key}" class="panel panel-default">
            <div class="collapsible-header panel-heading">
              <div class="esaQuestions__row">
                <div>${key}</div>
                <i class="material-icons">expand_more</i>
              </div>
            </div>
            <div class="collapsible-body collapse"></div>
          </li>`;
        })
        .join('')}
      </div>`)
      

    data.forEach(el => {
      $(`li[data-id="${el.cq_id}"] .collapsible-body`).append(`<div class="questions-wrapper"><p>- ${el.question}</p><p>- ${el.answer}</p></div>`)
    })
  }

  async function getData(url) {
    try {
      const res = await fetch(url);
      return await res.json();
    } catch (err) {
      console.error(err);
    }
  }
})()