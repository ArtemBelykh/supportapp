function getUrlParams(url = location.search){
    var regex = /[/?&]([^=#]+)=([^&#]*)/g, params = {}, match;
    while(match = regex.exec(url)) {
        params[match[1]] = match[2];
    }
    return params;
}
var param = getUrlParams()

//Request to mapping-simple/form.php
fetch('http://138.68.225.156/mapping-simple/form.php?formID='+param.id)
    .then(r => r.json())
    .then(res => {
        //Iterating through the array that came to us from the request
        res.forEach(dData => {
            $('.select1 select').append(`<option value="${dData.id}">${dData.text}</option>`)
        })
    })

fetch('http://138.68.225.156/mapping-simple/forms.php')
    .then(r => r.json())
    .then(data => {
        data.forEach(res => {
            if (res.id === param.id) {
                $('.get_title').append(res.title)
            }
        })
    })

//1 selector
//Only when select is selected, the "up" button will work
    $('.btn-down').on('click', (event) => {
        event.preventDefault()
        const val_select = $('.select1 select :selected').text()
        const val1_select = $('.select1 select :selected').val()
        localStorage.setItem('val_id', val1_select)
        //Checking if the value in input[readonly]is empty
        if ($('.questions_add').val() !== '') {
            $('.select1 select :selected').append(val_select)
        }else {
            $('.questions_add').val(val_select)
            $('.select1 select :selected').hide()
        }
    })

//A button that processes the reverse sequence, that is, adds a value from input to select
$('.btn-up').on('click', (event) => {
    event.preventDefault()


    if ($('.questions_add').val() !== '') {

        $('.select1 select :selected').show()
        $('.questions_add').val('')

    }else {
        return false
    }
})

// 2 selector


    $('.btn-down-2').on('click', (event) => {
        event.preventDefault()
        const val_select = $('.select2 select :selected').text()
        const val1_select = $('.select2 select :selected').val()
        localStorage.setItem('val_id2', val1_select)

        //Checking if the value in input[readonly]is empty
        if ($('.ask_add').val() !== '') {
            $('.select2 select :selected').append(val_select)
        }else {
            $('.ask_add').val(val_select)
            $('.select2 select :selected').hide()
        }
    })

$('.btn-up-2').on('click', (event) => {
    event.preventDefault()

    if ($('.ask_add').val() !== '') {
        $('.select2 select :selected').show()
        $('.ask_add').val('')

    }else {
        return false
    }
})

$('.add_go').on('click', (event) => {
    event.preventDefault()
    const obj = {
        question: {
            text_question: $('.questions_add').val(),
            id_question: localStorage.getItem('val_id')
        },
        answer: {
            text_answer: $('.ask_add').val(),
            id_answer: localStorage.getItem('val_id2')
        }
    }

    if ($('.ask_add').val() === '' || $('.questions_add').val() === '') {
        alert('Заполните данные')
    }else {
        $('.select3 select').append(`<option value="1" if_id="${obj.question.id_question}" op_id="${obj.answer.id_answer}">${obj.question.text_question} --- ${obj.answer.text_answer}</option>`)

        $('.ask_add').val('')
        $('.questions_add').val('')
    }
})

$('.save_go').on('click', (event) => {
    event.preventDefault()

    var val = $.map($('.select3 select option'), (opt) => {
        const obj = {
            if_id: opt.attributes.if_id.value,
            op_id: opt.attributes.op_id.value
        }
        return obj
    })
    console.log(val)
})

$('.clear_go').on('click', (event) => {
    event.preventDefault()

    $('.ask_add').val('')
    $('.questions_add').val('')

    $('.select1 select option').show()
    $('.select2 select option').show()
    $('.select3 select option').remove()
})