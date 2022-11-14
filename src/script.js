const capitalize = str => {
    if (typeof str === 'string') {
      return str.replace(/^\w/, c => c.toUpperCase())
    } else {
      return ''
    }
  }
window.onload = () => {
    $('#main').addClass('page-load');
    $('a').attr('draggable', 'false');
    var buildStage = () => {
        if (orbit.buildStage() !== ("stable" || "release")) {
            return `(${capitalize(orbit.buildStage())}) `;
        } else {
            return ""
        }
    }
    
    document.getElementById("logoNav").setAttribute("title", `OrbitNX ${buildStage() + orbit.version()}`);
}
$('a[href]').click(() => {
    var url = $(this).attr('href');
    if ($('#main').hasClass('page-load')) {
        $('#main').removeClass('page-load');
        $('#main').addClass('page-unload');
        setTimeout(() => {
            window.location.href = url;
        }, 800);
    } else {
        return;
    }
});

