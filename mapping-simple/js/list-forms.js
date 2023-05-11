fetch('http://138.68.225.156/mapping-simple/forms.php')
.then(r => r.json())
.then(data => {
    console.log(data)
    data.forEach(res => {
        $('.table tbody').append(`
        <tr>
            <td>${res.id}</td>
            <td>${res.title}</td>
            <td><button class="btn btn-table-list"><a style="text-decoration: none; color: black;" href="/mapping-simple/?id=${res.id}"><i class="fas fa-code"></i></a></button></td>
        </tr>
    `)
    })
})