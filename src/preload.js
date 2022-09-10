const { shell } = require('electron');
const fs = require('fs');
const path = require('path');
const { findByIds } = require("usb");
var child_process = require("child_process");
function getCommandLine() {
    switch (process.platform) { 
       case 'darwin' : return 'open';
       case 'win32' : return 'start';
       case 'win64' : return 'start';
       default : return 'xdg-open';
    }
 };
var payloadConfig = require("../../app.asar.unpacked/src/payloadConfig.json");

// Code spaghetti, aka payload injection
function injectNXPL(dir, payload, sDrive) {
    if (sDrive == true) {
        child_process.spawn('python3', [`${path.join(__dirname, "..", "..", "/app.asar.unpacked/src/fusee-launcher/fusee-launcher.py")}`,
        `${path.join(dir, payload)}`]);
    } else {
        child_process.spawn('python3', [`${path.join(__dirname, "..", "..", "/app.asar.unpacked/src/fusee-launcher/fusee-launcher.py")}`,
        `${path.join(__dirname, "..", "..", "/app.asar.unpacked/src", dir, payload)}`]);
    }

}
var RCM_STATUS = "UNDETECTED";

// See if device is connected | TODO: Check if device is *actually* in RCM mode
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
if (payloadConfig.plStartFromDrive_1 == true) {
    fs.access(`${path.join(payloadConfig.payloadDir_1, payloadConfig.payloadFile_1)}`, (err) => {
        if (err) {
            document.getElementById("pl1").innerText = "No Payload"
        } else if (payloadConfig.payloadName_1 == null) {
            document.getElementById("pl1").innerText = payloadConfig.payloadFile_1;
        } else if (payloadConfig.payloadName_1) {
            document.getElementById("pl1").innerText = payloadConfig.payloadName_1;
        };
    })
} else {
    fs.access(`${path.join(__dirname, "..", "..", "/app.asar.unpacked/src", payloadConfig.payloadDir_1, payloadConfig.payloadFile_1)}`, (err) => {
        if (err) {
            document.getElementById("pl1").innerText = "No Payload"
        } else if (payloadConfig.payloadName_1 == null) {
            document.getElementById("pl1").innerText = payloadConfig.payloadFile_1;
        } else if (payloadConfig.payloadName_1) {
            document.getElementById("pl1").innerText = payloadConfig.payloadName_1;
        };
    })
}
if (payloadConfig.plStartFromDrive_2 == true) {
    fs.access(`${path.join(payloadConfig.payloadDir_2, payloadConfig.payloadFile_2)}`, (err) => {
        if (err) {
            document.getElementById("pl2").innerText = "No Payload"
        } else if (payloadConfig.payloadName_2 == null) {
            document.getElementById("pl2").innerText = payloadConfig.payloadFile_2;
        } else if (payloadConfig.payloadName_2) {
            document.getElementById("pl2").innerText = payloadConfig.payloadName_2;
        };
    })
} else {
    fs.access(`${path.join(__dirname, "..", "..", "/app.asar.unpacked/src", payloadConfig.payloadDir_2, payloadConfig.payloadFile_2)}`, (err) => {
        if (err) {
            document.getElementById("pl2").innerText = "No Payload"
        } else if (payloadConfig.payloadName_2 == null) {
            document.getElementById("pl2").innerText = payloadConfig.payloadFile_2;
        } else if (payloadConfig.payloadName_2) {
            document.getElementById("pl2").innerText = payloadConfig.payloadName_2;
        };
    })
}
if (payloadConfig.plStartFromDrive_3 == true) {
    fs.access(`${path.join(payloadConfig.payloadDir_3, payloadConfig.payloadFile_3)}`, (err) => {
        if (err) {
            document.getElementById("pl3").innerText = "No Payload"
        } else if (payloadConfig.payloadName_3 == null) {
            document.getElementById("pl3").innerText = payloadConfig.payloadFile_3;
        } else if (payloadConfig.payloadName_3) {
            document.getElementById("pl3").innerText = payloadConfig.payloadName_3;
        };
    })
} else {
    fs.access(`${path.join(__dirname, "..", "..", "/app.asar.unpacked/src", payloadConfig.payloadDir_3, payloadConfig.payloadFile_3)}`, (err) => {
        if (err) {
            document.getElementById("pl3").innerText = "No Payload"
        } else if (payloadConfig.payloadName_3 == null) {
            document.getElementById("pl3").innerText = payloadConfig.payloadFile_3;
        } else if (payloadConfig.payloadName_3) {
            document.getElementById("pl3").innerText = payloadConfig.payloadName_3;
        };
    })
}
if (payloadConfig.plStartFromDrive_4 == true) {
    fs.access(`${path.join(payloadConfig.payloadDir_4, payloadConfig.payloadFile_4)}`, (err) => {
        if (err) {
            document.getElementById("pl4").innerText = "No Payload"
        } else if (payloadConfig.payloadName_4 == null) {
            document.getElementById("pl4").innerText = payloadConfig.payloadFile_4;
        } else if (payloadConfig.payloadName_4) {
            document.getElementById("pl4").innerText = payloadConfig.payloadName_4;
        };
    })
} else {
    fs.access(`${path.join(__dirname, "..", "..", "/app.asar.unpacked/src", payloadConfig.payloadDir_4, payloadConfig.payloadFile_4)}`, (err) => {
        if (err) {
            document.getElementById("pl4").innerText = "No Payload"
        } else if (payloadConfig.payloadName_4 == null) {
            document.getElementById("pl4").innerText = payloadConfig.payloadFile_4;
        } else if (payloadConfig.payloadName_4) {
            document.getElementById("pl4").innerText = payloadConfig.payloadName_4;
        };
    })
}

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
            })
        } else {
            fs.access(`${path.join(__dirname, "..", "..", "/app.asar.unpacked/src", plDir, plFile)}`, (err) => {
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
        child_process.exec(getCommandLine() + ' ' + path.join(__dirname, "..", "..", "/app.asar.unpacked/src/payloadConfig.json"));
    });
});
