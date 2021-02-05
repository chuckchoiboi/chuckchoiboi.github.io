$('#username-edit').click(() => {
    $('#username-pre').toggleClass('d-none')
    $('#username-editor').toggleClass('d-none')
})

$('#answer-trigger').click(() => {
    $('#answer-form').toggleClass('d-none')
})

$('.delete-answer-trigger').click((evt) => {
    $(evt.target).siblings('.delete-form').toggleClass('d-none');
})

const toggleForm = () => {
    $('#delete-form').toggleClass('d-none')
}