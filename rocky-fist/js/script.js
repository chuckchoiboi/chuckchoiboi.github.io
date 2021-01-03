// sound button mute on/off

$('.sound-button').click(function(){
    $(this).toggleClass('sound-off')
    if($(this).hasClass('sound-off')){
        $(this).attr('src','img/sound-off.png')
    } else {
        $(this).attr('src','img/sound-on.png')
    }
})

$('#play-button').click(function(){
    $('#start-screen').toggleClass('d-none')
    $('#matchup-screen').toggleClass('d-none')
})

$('#matchup-button').click(function(){
    $('#matchup-screen').toggleClass('d-none')
    $('#upgrade-screen').toggleClass('d-none')
})