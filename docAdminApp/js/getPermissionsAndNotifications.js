let scriptPermissions = document.createElement('script');
let scriptNotifications = document.createElement('script');
let scriptTickets = document.createElement('script'); 

let permissions = {};

const apiUrl = './sql/'

// script.async = false;
// script.defer = false;

scriptPermissions.src = "js/nav/nav.js";
scriptNotifications.src = "js/getNotifications.js";
scriptTickets.src = "js/getTickets.js";

// fetch(`http://104.248.191.131/staffAdminApp/sql/sql_get_perm_zone_by_employee_id.php?id=4`)
fetch(`${apiUrl}sql_get_perm_zone_by_employee_id.php?id=${userId}`)
  .then(r => r.json())
  .then(data => {
    permissions = data;
    document.body.appendChild(scriptPermissions);
    document.body.appendChild(scriptNotifications);
    document.body.appendChild(scriptTickets);
  })
  .catch(err => console.log(err))
