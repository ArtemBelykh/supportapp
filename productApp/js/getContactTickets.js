
  (() => {
    const apiUrl = './sql/';
  
    fetch(`${apiUrl}sql_count_tickets_by_contact_id.php?contact_id=${selectedId}`)
    .then(r => r.json())
    .then(({tickets: count}) => {
      // let res = [];
      const $notyIconElement = $('.menu__item [title="Contact Tickets"] .noty-icon');
      // if (Array.isArray(data.tickets)) {
      //   data.tickets.forEach(ticket => ticket.notes.note_bodies.forEach(el => {
      //     let id = ticket.ticket_id;
      //     el.recipients?.map(rec => {
      //       if (rec.dt_received === null && rec.to_employee_id === userId) {
      //         if (!res.find(resEl => resEl.from_employee_id === el.from_employee_id && resEl.id === id) ) {
      //           res.push({...rec, from_employee_id: el.from_employee_id, id, subject: ticket.subject});
      //         }
      //       }
      //     })
      //   }))
      //   res.sort((el1, el2) => moment(`${el1.dt_received}`, 'YYYYMMDD') - moment(`${el2.dt_received}`, 'YYYYMMDD'))
      //   console.log('res', res)
        if (count !== 0) {
          $notyIconElement.show();
          $notyIconElement.find('span').text(count);
        } else {
          $notyIconElement.hide();
        }
    })
    .catch(console.error)
  })()

  