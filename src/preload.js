const path = require('path')
const { findByIds } = require("usb");
var spawn = require("child_process").spawn;
var payloadConfig = require("./payloadConfig.json");
function injectNXPL(dir, payload) {
    spawn('python', [`${path.join(__dirname, "fusee-launcher/fusee-launcher.py")}`,
    `${path.join(__dirname, dir, payload)}`]);
}

window.addEventListener('DOMContentLoaded', () => {
    setInterval(async () => {
        const device = await findByIds(0x0955, 0x7321);

        if (device) {
            RCM_STATUS = "DETECTED";
            document.body.setAttribute("rcm_detected", "");
            document.body.removeAttribute("rcm_undetected");
        };
        if (!device) {
            RCM_STATUS = "UNDETECTED";
            document.body.setAttribute("rcm_undetected", "");
            document.body.removeAttribute("rcm_detected");
        };
    }, 0);

    var plDir = null;
    var plFile = null;

    document.getElementById("pl1").innerText = payloadConfig.payloadName_1;
    document.getElementById("pl2").innerText = payloadConfig.payloadName_2;
    document.getElementById("pl3").innerText = payloadConfig.payloadName_3;

    setInterval(function () {
        if (document.getElementById("payload_select").value == "pl1") {
            plDir = payloadConfig.payloadDir_1;
            plFile = payloadConfig.payloadFile_1;
        };
        if (document.getElementById("payload_select").value == "pl2") {
            plDir = payloadConfig.payloadDir_2;
            plFile = payloadConfig.payloadFile_2;
        };
        if (document.getElementById("payload_select").value == "pl3") {
            plDir = payloadConfig.payloadDir_3;
            plFile = payloadConfig.payloadFile_3;
        };
    }, 0);

    document.getElementById("payload_inject").addEventListener("click", function () {
        injectNXPL(plDir, plFile);
        console.log(`${path.join(__dirname, plDir, plFile)}`);
        console.log(`${path.join(__dirname, "fusee-launcher/fusee-launcher.py")}`);
    });
});
