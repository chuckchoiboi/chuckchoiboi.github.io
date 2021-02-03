$('#username-edit').click(() => {
    $('#username-pre').toggleClass('d-none')
    $('#username-editor').toggleClass('d-none')
})

$('#answer-trigger').click(() => {
    $('#answer-form').toggleClass('d-none')
})

// $('.answer-selector-checkbox').click((evt) => {
//     $('.answer-selector').not($(evt.target).parent().parent()).toggleClass('d-none')
// })