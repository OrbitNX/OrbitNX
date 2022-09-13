window.onload = () => {
    $('#main').addClass('page-load');
    $('a').attr('draggable', 'false')
}
$('#tab').click(function (event) {
    var url = $(this).attr('href');
    event.preventDefault();

    if ($('#main').hasClass('page-load')) {
        $('#main').removeClass('page-load');
        $('#main').addClass('page-unload');
        setTimeout(function () {
            window.location.href = url;
        }, 510);
    } else {
        return;
    }
});