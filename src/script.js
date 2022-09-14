window.onload = () => {
    $('#main').addClass('page-load');
    $('a').attr('draggable', 'false');
}
$('#tab').click(() => {
    var url = $(this).attr('href');
    if ($('#main').hasClass('page-load')) {
        $('#main').removeClass('page-load');
        $('#main').addClass('page-unload');
        setTimeout(() => {
            window.location.href = url;
        }, 510);
    } else {
        return;
    }
});