let script = document.createElement('script');
let permissions = {};

script.async = false;
script.defer = false;

script.src = "js/nav/nav.js";
// fetch(`http://104.248.191.131/staffAdminApp/sql/sql_get_perm_zone_by_employee_id.php?id=4`)
fetch(`http://104.248.191.131/staffAdminApp/sql/sql_get_perm_zone_by_employee_id.php?id=${userId}`)
  .then(r => r.json())
  .then(data => {
    permissions = data;
    document.body.appendChild(script);
  })
  .catch(err => console.log(err))


