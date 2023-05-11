const apiUrl = 'sql/';
let contactID;

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
  // opee/close menu
  showSpinner();
  $('.app-block__btn').on('click', handleBtnMenuClick);

  hideSpinner();
  const timezoneOffset = new Date().getTimezoneOffset();
  fetchStatistics('sql_get_reviews_stats.php', timezoneOffset).then((data) => {
    $('.statistics-block').append(generateStatisticsBlock(data));
    $('.app-block').append(generatePayrollBlock());
    getPayroll();
    $('.collapse')
         .on('show.bs.collapse', function() {
             $(this)
              .parent()
              .find('.material-icons')
              .text('remove');
             })
         .on('hidden.bs.collapse', function() {
             $(this)
                 .parent()
                 .find('.material-icons')
                 .text('add');
             });
    
    $('.payroll-block button').on('click', getPayroll);

    $('.datepicker').datepicker({ 
      dateFormat: 'mm-dd-yy',
      beforeShow: function (input) {
        $(input).css({
            "position": "relative",
            "z-index": 999999
        });
      },
      onClose: function () { 
        $('.datepicker').css({ 'z-index': 0  } ); 
      }
    });
  });
});

function handleBtnMenuClick(e) {
  $('.app-block__menu').slideToggle(300);
}

function fetchStatistics(url, parametr) {
  return fetch(`${apiUrl}${url}?tz_offset=${parametr}`, { mode: 'no-cors' })
    .then((r) => r.json())
    .then((data) => data)
    .catch((err) => console.log(err));
}

function showSpinner() {
  $('[class^="loadingio-spinner"]').css({ display: 'flex' });
}

function hideSpinner() {
  $('[class^="loadingio-spinner"]').hide();
}

function generateBtnBack() {
  return `
    <button class="btn btn-back">
      <img src="assets/icons/back.svg" alt="back" class="material-icons">Back to List
    </button>
  `;
}

function generateStatisticsBlock(data) {
  const currDay = [];
  const currWeek = [];
  const currMonth = [];
  // const prevMonth = [];
  for (let k in data) {
    if (k.startsWith('cur_day')) {
      currDay.push(data[k]);
    }
    if (k.startsWith('cur_week')) {
      currWeek.push(data[k]);
    }
    if (k.startsWith('cur_month')) {
      currMonth.push(data[k]);
    }
    // if (k.startsWith('prev_month')) {
    //   prevMonth.push(data[k]);
    // }
  }
  // `
  //   <div class="collapsible-header">ESA Questionnaire</div>
  //   <div class="separator"></div>
  //   <div class="collapsible-body questionnaire">
  // 		<ul class="collapsible statistics-collapsible">
  // 		${
  //       data.length > 0
  //         ? data
  //             .map(
  //               ({ short, answer, question }) => `
  //       <li>
  //         <div class="collapsible-header">
  //           <p class="ellipsed">${short}: ${answer}</p>
  //         </div>
  //         <div class="collapsible-body"><span>${question}</span></div>
  //       </li>
  //     `
  //             )
  //             .join('')
  //         : `<li>
  //           <div class="collapsible-header">
  //             <p class="ellipsed">...</p>
  //           </div>
  //           <div class="collapsible-body"><span>...</span></div>
  //         </li>`
  //     }</div>
  //     </ul>`;
  return ` 
			<div class="panel-group statistics-collapsible" id="accordion">
				<div class="panel">
					<div class="panel-heading" data-toggle="collapse" data-parent="#accordion" data-target="#collapse1">
						<i class="material-icons">add</i>
						<span class="ellipsed">Current Day</span>
					</div>
          <div id="collapse1" class="panel-collapse collapse">
            <div class="panel-body">
              <p>Total Approved: ${currDay[0]}</p>
              <p>Total Denied: ${currDay[1]}</p>
              <p>Total Pending: ${currDay[2]}</p>
            </div>
					</div>
        </div>
        <div class="panel">
					<div class="panel-heading" data-toggle="collapse" data-parent="#accordion" data-target="#collapse2">
						<i class="material-icons">add</i>
						<span class="ellipsed">Current Week</span>
					</div>
          <div id="collapse2" class="panel-collapse collapse">
            <div class="panel-body">
              <p>Total Approved: ${currWeek[0]}</p>
              <p>Total Denied: ${currWeek[1]}</p>
              <p>Total Pending: ${currWeek[2]}</p>
            </div>
					</div>
        </div>
        <div class="panel">
					<div class="panel-heading" data-toggle="collapse" data-parent="#accordion" data-target="#collapse3">
						<i class="material-icons">add</i>
						<span class="ellipsed">Current Month</span>
					</div>
          <div id="collapse3" class="panel-collapse collapse">
            <div class="panel-body">
              <p>Total Approved: ${currMonth[0]}</p>
              <p>Total Denied: ${currMonth[1]}</p>
              <p>Total Pending: ${currMonth[2]}</p> 
            </div>
					</div>
				</div>
			</div>
	`;
}

function generatePayrollBlock() {  
  return `
    <section class="payroll-block">
      <div class="panel-group statistics-collapsible" id="accordion">
        <div class="panel">
          <div class="panel-heading" data-toggle="collapse" data-parent="#accordion" data-target="#collapsePayroll">
            <i class="material-icons">add</i>
            <span class="ellipsed panel-heading__title">Payroll (test)</span>
          </div>
          <div id="collapsePayroll" class="panel-collapse collapse">
            <div class="panel-body">
            </div>
          </div>
        </div>
      </div>
    </section>
`;
}

function getPayroll(e) {
  const timezoneOffset = encodeURIComponent(new Date().getTimezoneOffset());
  fetch(`sql/sql_get_payroll_data.php?tz=${timezoneOffset}`)
    .then(r => r.json())
    .then(data => {
      const allData = JSON.parse(data[0].result);
      console.log('allData', allData)
      const periods = {};
      const amount = {}; 
      for(let k in allData) {
        if (k.endsWith('end') || k.endsWith('start')) {
          periods[k] = allData[k];
        } else {
          amount[k] = allData[k];
        }
      }
      const periodsByParts = {};
      for(let k in periods) {
        const num = k.match(/\d/g)[0];
        if (!periodsByParts[num]) {
          periodsByParts[num] = [];
        }
        if (k.includes(num)) {
          periodsByParts[num].push({[k]: periods[k]})
        }
      }

      const amountByParts = {};
      for(let k in amount) {
        const num = k.match(/\d/g)[0];
        if (!amountByParts[num]) {
          amountByParts[num] = [];
        }
        if (k.includes(num)) {
          amountByParts[num].push({[k]: amount[k]})
        }
      }

      console.log(amountByParts);
      $('.payroll-block .panel-body .periods').remove();
      $('.payroll-block .panel-body').append('<div class="periods"></div>')
      // for(let k in periodsByParts) {
      //   const num = k.match(/\d/g)[0];
        // $('.payroll-block .panel-body .periods').append(
        //   `<div class="periods__item" data-periodId='${num}'>
        //     From: ${periodsByParts[k][1][`period_${num}_start`]}
        //     till: ${periodsByParts[k][0][`period_${num}_end`]}
        //   </div>
        //   `
        // )
      // }

      $('.payroll-block .panel-body .periods').append(
        `<div class="periods__item">
          From: <input id="payroll--from"
            class="form-control input-sm datepicker datepicker--from" 
            type="text" 
            placeholder="mm-dd-yyyy" 
            autocomplete="anyrndcrap" 
            data-date-format="mm-dd-yyyy"
            required>
          Till: <input id="payroll--till"
            class="form-control input-sm datepicker datepicker--till" 
            type="text" 
            placeholder="mm-dd-yyyy" 
            autocomplete="anyrndcrap" 
            data-date-format="mm-dd-yyyy"
            required>
            <button class="btn">Download as CSV</button>
        </div>
        `
      );

      $('.datepicker--from').datepicker({ 
        dateFormat: 'mm-dd-yy',
        beforeShow: function (input) {
          $(input).css({
              "position": "relative",
              "z-index": 999999
          });
        },
        onClose: function () { 
          $('.datepicker--from').css({ 'z-index': 0  } ); 
        },
        onSelect() {
          console.log('select');
          $('.datepicker--till').datepicker('setDate', null);
          let currentDateFrom = moment($('.datepicker--from').datepicker( "getDate" ));
          
          $('.datepicker--till').datepicker('setDate', currentDateFrom.add(1, 'M').format('MM-DD-YYYY'));
          $('.datepicker--till').datepicker('option', 'minDate', new Date(currentDateFrom.subtract(1, 'M')));

          $('.datepicker--till').datepicker('option', 'maxDate', new Date(currentDateFrom.add(1, 'M')));

        }
      });

      $('.datepicker--till').datepicker({ 
        dateFormat: 'mm-dd-yy',
        beforeShow: function (input) {
          $(input).css({
              "position": "relative",
              "z-index": 999999
          });
        },
        onClose: function () { 
          $('.datepicker--till').css({ 'z-index': 0  } ); 
        }
      });


      // for(let k in amountByParts) {
      //   const num = k.match(/\d/g)[0];
      //   $(`.payroll-block .panel-body .periods__item[data-periodid='${k}']`).append(
      //     `<div class="amount__item">
      //       Approved: ${amountByParts[k][0][`period_${num}_approved`]}<br />
      //       Denied: ${amountByParts[k][1][`period_${num}_denied`]}
      //       <button class="btn">Download as CSV</button>
      //     </div>
      //     `
      //   )
      // }


    })
    .catch((err) => {console.log(err)})

}


