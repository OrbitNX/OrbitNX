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
    setTimeout(() => {
        $('#nav').removeClass('noClick');
    }, 800);
    var buildStage = () => {
        if (orbit.buildStage() !== ("stable" || "release")) {
            return `${capitalize(orbit.buildStage())} `;
        } else {
            return ""
        }
    }
    if (orbit.buildStage() !== null) {
        document.getElementById("versionInfo").innerHTML = `<span>${buildStage() + orbit.version()}</span>`;
    }
}
$('a[href]').click(() => {
    var url = $(this).attr('href');
    $('#main').removeClass('page-load');
    $('body').persist('attribute', 'rcm_undetected');
    $('body').persist('attribute', 'rcm_detected');
    $('#main').addClass('page-unload');
    setTimeout(() => {
        window.location.href = url;
    }, 800);
});

document.body.setAttribute("theme", localStorage.getItem("orbitTheme"));
document.getElementById("logoNavImg").setAttribute("src", `./assets/iconLogo-${localStorage.getItem("orbitTheme")}.png`);
if (!localStorage.getItem("orbitTheme")) {
    localStorage.setItem("orbitTheme", "dark")
} else {
    document.body.setAttribute("theme", localStorage.getItem("orbitTheme"));
}
if (window.location.href.indexOf("settingsPage.html") > -1) {
    document.getElementById("themeSel").value = localStorage.getItem("orbitTheme");
    document.getElementById("themeSet").addEventListener("click", function () {
        localStorage.setItem("orbitTheme", document.getElementById("themeSel").value);
        document.body.setAttribute("theme", localStorage.getItem("orbitTheme"));
        document.getElementById("logoNavImg").setAttribute("src", `./assets/iconLogo-${localStorage.getItem("orbitTheme")}.png`);
    });
}