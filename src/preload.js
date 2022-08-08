const {shell} = require('electron')
const fs = require('fs')
const path = require('path')
const { findByIds } = require("usb");
var spawn = require("child_process").spawn;
var payloadConfig = require("../../app.asar.unpacked/src/payloadConfig.json");

// Code spaghetti, aka payload injection
function injectNXPL(dir, payload, sDrive) {
    if (sDrive == true) {
        spawn('python3', [`${path.join(__dirname, "..", "..", "/app.asar.unpacked/src/fusee-launcher/fusee-launcher.py")}`,
        `${path.join(dir, payload)}`]);
    } else {
        spawn('python3', [`${path.join(__dirname, "..", "..", "/app.asar.unpacked/src/fusee-launcher/fusee-launcher.py")}`,
        `${path.join(__dirname,"..", "..", "/app.asar.unpacked", dir, payload)}`]);
    }

}
var RCM_STATUS = "UNDETECTED";

// See if device is connected | TODO: Check if device is in RCM mode
window.addEventListener('DOMContentLoaded', () => {
    setInterval(async () => {
        const device = await findByIds(0x0955, 0x7321);

        if (device) {
            RCM_STATUS = "DETECTED";
            document.body.setAttribute("rcm_detected", "");
            document.body.removeAttribute("rcm_undetected");
            console.log(`Device Detected at Port ${device.portNumbers}`)
        } else if (!device) {
            RCM_STATUS = "UNDETECTED";
            document.body.setAttribute("rcm_undetected", "");
            document.body.removeAttribute("rcm_detected");
        };
    }, 0);

    var plDir = null;
    var plFile = null;
    var plSDrive = false;

    
    // Set payload names
    document.getElementById("pl1").innerText = payloadConfig.payloadName_1;
    document.getElementById("pl2").innerText = payloadConfig.payloadName_2;
    document.getElementById("pl3").innerText = payloadConfig.payloadName_3;
    document.getElementById("pl4").innerText = payloadConfig.payloadName_4;

    setInterval(function () {
        
        // Set payload option
        if (document.getElementById("payload_select").value == "pl1") {
            plDir = payloadConfig.payloadDir_1;
            plFile = payloadConfig.payloadFile_1;
            plSDrive = payloadConfig.plStartFromDrive_1;
        } else
        if (document.getElementById("payload_select").value == "pl2") {
            plDir = payloadConfig.payloadDir_2;
            plFile = payloadConfig.payloadFile_2;
            plSDrive = payloadConfig.plStartFromDrive_2;
        } else
        if (document.getElementById("payload_select").value == "pl3") {
            plDir = payloadConfig.payloadDir_3;
            plFile = payloadConfig.payloadFile_3;
            plSDrive = payloadConfig.plStartFromDrive_3;
        } else
        if (document.getElementById("payload_select").value == "pl4") {
            plDir = payloadConfig.payloadDir_4;
            plFile = payloadConfig.payloadFile_4;
            plSDrive = payloadConfig.plStartFromDrive_4;
        };

        // Check if the payload exists
        if (plSDrive == true) {
        fs.access(`${path.join(plDir, plFile)}`, (err) => {
            if (err) {
                document.getElementById("payload_inject").setAttribute("no_payload", "");
              } else {
                document.getElementById("payload_inject").removeAttribute("no_payload");
              }
          })} else {
        fs.access(`${path.join(__dirname,"..", "..", "/app.asar.unpacked", plDir, plFile)}`, (err) => {
            if (err) {
                document.getElementById("payload_inject").setAttribute("no_payload", "");
              } else {
                document.getElementById("payload_inject").removeAttribute("no_payload");
              }
          })

          }
    }, 0);

    // Inject payload button
    document.getElementById("payload_inject").addEventListener("click", function () {
        injectNXPL(plDir, plFile, plSDrive);
    });

    // Open config file location
    document.getElementById("payload_config").addEventListener("click", function () {
        shell.showItemInFolder(`${path.join(__dirname, "..", "..", "/app.asar.unpacked/src/payloadConfig.json")}`);
    });
});
