fetch(`${apiUrl}sql_count_notes_incoming_to_employee.php`)
  .then(r => r.json())
  .then(({result: count}) => {
      console.log(count)
    const $notyIconElement = $('.menu__item[title="Notifications"] .noty-icon');
    if (count !== 0) {
      $notyIconElement.show();
      $notyIconElement.find('span').text(count);
    } else {
      $notyIconElement.hide();
    }
  })
  .catch(console.error)