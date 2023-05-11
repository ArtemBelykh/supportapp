
  let scriptPermissions = document.createElement('script');
  let scriptNotifications = document.createElement('script');
  let scriptTickets = document.createElement('script');
  let scriptContactTickets = document.createElement('script');
  let scriptSetMenu = document.createElement('script');

  let permissions = {};
  
  const apiUrl = './sql/';
  
  scriptNotifications.async = false;
  scriptTickets.async = false;
  scriptContactTickets.async = false;
  scriptSetMenu.async = false;
  
  scriptPermissions.src = "js/nav/nav.js";
  scriptNotifications.src = "js/getNotifications.js";
  scriptTickets.src = "js/getTickets.js";
  scriptContactTickets.src = "js/getContactTickets.js";
  scriptSetMenu.src = 'js/setMenu.js';
  
  // fetch(`http://104.248.191.131/staffAdminApp/sql/sql_get_perm_zone_by_employee_id.php?id=4`)
  fetch(`${apiUrl}sql_get_perm_zone_by_employee_id.php?id=${userId}`)
    .then(r => r.json())
    .then(data => {
      permissions = data;
      document.body.appendChild(scriptPermissions);
    })
    .then(() => {
      document.body.appendChild(scriptNotifications);
      document.body.appendChild(scriptTickets);
      document.body.appendChild(scriptContactTickets);
      // document.body.appendChild(scriptSetMenu);
    })
    .catch(err => console.log(err))

