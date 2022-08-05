const {shell} = require('electron')
const path = require('path')
const { findByIds } = require("usb");
var spawn = require("child_process").spawn;
var payloadConfig = require("../../app.asar.unpacked/src/payloadConfig.json");
function injectNXPL(dir, payload, sDrive) {
    if (sDrive == true) {
        spawn('python3', [`${path.join(__dirname, "..", "..", "/app.asar.unpacked/src/fusee-launcher/fusee-launcher.py")}`,
        `${path.join(dir, payload)}`]);
    } else {
        spawn('python3', [`${path.join(__dirname, "..", "..", "/app.asar.unpacked/src/fusee-launcher/fusee-launcher.py")}`,
        `${path.join(__dirname, dir, payload)}`]);
    }

}
var RCM_STATUS = "UNDETECTED";

window.addEventListener('DOMContentLoaded', () => {
    setInterval(async () => {
        const device = await findByIds(0x0955, 0x7321);

        if (device && (RCM_STATUS == "UNDETECTED")) {
            RCM_STATUS = "DETECTED";
            document.body.setAttribute("rcm_detected", "");
            document.body.removeAttribute("rcm_undetected");
            console.log(`Device Detected at Port ${device.portNumbers}`)
        } else if (!device && (RCM_STATUS == "DETECTED")) {
            RCM_STATUS = "UNDETECTED";
            document.body.setAttribute("rcm_undetected", "");
            document.body.removeAttribute("rcm_detected");
        };
    }, 0);

    var plDir = null;
    var plFile = null;
    var plSDrive = false;

    document.getElementById("pl1").innerText = payloadConfig.payloadName_1;
    document.getElementById("pl2").innerText = payloadConfig.payloadName_2;
    document.getElementById("pl3").innerText = payloadConfig.payloadName_3;

    setInterval(function () {
        if (document.getElementById("payload_select").value == "pl1") {
            plDir = payloadConfig.payloadDir_1;
            plFile = payloadConfig.payloadFile_1;
            plSDrive = payloadConfig.plStartFromDrive_1;
        };
        if (document.getElementById("payload_select").value == "pl2") {
            plDir = payloadConfig.payloadDir_2;
            plFile = payloadConfig.payloadFile_2;
            plSDrive = payloadConfig.plStartFromDrive_2;
        };
        if (document.getElementById("payload_select").value == "pl3") {
            plDir = payloadConfig.payloadDir_3;
            plFile = payloadConfig.payloadFile_3;
            plSDrive = payloadConfig.plStartFromDrive_3;
        };
    }, 0);

    document.getElementById("payload_inject").addEventListener("click", function () {
        injectNXPL(plDir, plFile, plSDrive);
        console.log(`${path.join(__dirname, plDir, plFile)}`);
        console.log(`${path.join(__dirname, "..", "..", "/app.asar.unpacked/src/fusee-launcher/fusee-launcher.py")}`);
    });

    document.getElementById("payload_config").addEventListener("click", function () {
        shell.showItemInFolder(`${path.join(__dirname, "..", "..", "/app.asar.unpacked/src/payloadConfig.json")}`);
    });
});
