fetch(`http://104.248.191.131/layout/server/bt-server/bt_server_token.php`)
    .then(r => r.json())
    .then((data) => {
        console.log(data)
    })
