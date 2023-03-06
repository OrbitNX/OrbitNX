const { contextBridge, shell, app } = require('electron');
const fs = require('fs');
const path = require('path');
const { findByIds } = require("usb");
var child_process = require("child_process");
function log(input, type) {
    let color;
    let infoLog = undefined;
    let logType = "";
    if (type == "info") {
        color = "#22ffc2";
        infoLog = "font-style: italic;";
        logType = "Info: "
    } else if (type == "warn") {
        color = "#e8b300";
        logType = "WARNING: "
    } else if ((type == "err") || (type == "error") == true) {
        color = "#eb3941";
        logType = "ERROR: "
    } else {
        color = "#eeeeee";
    }
    console.log(`%cOrbit%cNX%c${logType + input}`, `font-style: italic; color: #eee8;`, `font-style: italic; color: #22ffc288; border-right: 1px solid #eee3; padding-right: 5px`, `margin-left: 5px; color: ${color}; ${infoLog}`, "");
}
function getCommandLine() {
    switch (process.platform) {
        case 'darwin': return 'open';
        case 'win32': return 'start';
        case 'win64': return 'start';
        default: return 'xdg-open';
    }
};
var payloadConfig = require("../../app.asar.unpacked/src/payloadConfig.json");

// Fusee launcher stuff
function injectNXPL(dir, payload, sDrive) {
    if (sDrive == true) {
        child_process.spawn('python3', [`${path.join(__dirname, "..", "..", "/app.asar.unpacked/src/fusee-launcher/fusee-launcher.py")}`,
        `${path.join(dir, payload)}`]);
    } else {
        child_process.spawn('python3', [`${path.join(__dirname, "..", "..", "/app.asar.unpacked/src/fusee-launcher/fusee-launcher.py")}`,
        `${path.join(__dirname, "..", "..", "/app.asar.unpacked/src", dir, payload)}`]);
    }

}
var RCM_STATUS = "NO";
var RCM_STATE = undefined;
var notifState = 0;
var rcmHasBeenConnected = false;

window.addEventListener('DOMContentLoaded', () => {
    log("Page loaded!", "info");
    // RCM Detection
    setInterval(async () => {
        const device = await findByIds(0x0955, 0x7321);
        if (device) {
            RCM_STATUS = "YES";
            RCM_STATE = findByIds(0x0955, 0x7321);
            document.body.setAttribute("rcm_detected", "");
            document.body.removeAttribute("rcm_undetected");
            if (notifState == 1) {
                notifState = 0;
                log(`Device Detected at Port ${device.portNumbers}`, "info");
                rcmHasBeenConnected = true;
            };
        } else if (!device) {
            RCM_STATUS = "NO";
            RCM_STATE = undefined;
            document.body.setAttribute("rcm_undetected", "");
            document.body.removeAttribute("rcm_detected");
            if ((notifState == 0) && (rcmHasBeenConnected == true)) {
                notifState = 1;
                log(`Device Disconnected`, "info");
            } else if (notifState == 0) {
                notifState = 1;
                log(`Device Not Detected`, "info");
            };
        };
    }, 0);

    var plDir = null;
    var plFile = null;
    var plSDrive = false;


    // Set payload names / Shit poopoo speghetti code
    if (window.location.href.indexOf("mainPage.html") > -1) {
        if (payloadConfig.StartFromDriveRoot_1 == true) {
            fs.access(`${path.join(payloadConfig.payloadDir_1, payloadConfig.payloadFile_1)}`, (err) => {
                var payloadSel = document.getElementById("pl1");
                if (err) {
                    payloadSel.innerText = "No Payload"
                } else if (payloadConfig.payloadName_1 == null) {
                    payloadSel.innerText = payloadConfig.payloadFile_1;
                } else if (payloadConfig.payloadName_1) {
                    payloadSel.innerText = payloadConfig.payloadName_1;
                };
            })
        } else {
            fs.access(`${path.join(__dirname, "..", "..", "/app.asar.unpacked/src", payloadConfig.payloadDir_1, payloadConfig.payloadFile_1)}`, (err) => {
                var payloadSel = document.getElementById("pl1");
                if (err) {
                    payloadSel.innerText = "No Payload"
                } else if (payloadConfig.payloadName_1 == null) {
                    payloadSel.innerText = payloadConfig.payloadFile_1;
                } else if (payloadConfig.payloadName_1) {
                    payloadSel.innerText = payloadConfig.payloadName_1;
                };
            })
        }
        if (payloadConfig.StartFromDriveRoot_2 == true) {
            fs.access(`${path.join(payloadConfig.payloadDir_2, payloadConfig.payloadFile_2)}`, (err) => {
                var payloadSel = document.getElementById("pl2");
                if (err) {
                    payloadSel.innerText = "No Payload"
                } else if (payloadConfig.payloadName_2 == null) {
                    payloadSel.innerText = payloadConfig.payloadFile_2;
                } else if (payloadConfig.payloadName_2) {
                    payloadSel.innerText = payloadConfig.payloadName_2;
                };
            })
        } else {
            fs.access(`${path.join(__dirname, "..", "..", "/app.asar.unpacked/src", payloadConfig.payloadDir_2, payloadConfig.payloadFile_2)}`, (err) => {
                var payloadSel = document.getElementById("pl2");
                if (err) {
                    payloadSel.innerText = "No Payload"
                } else if (payloadConfig.payloadName_2 == null) {
                    payloadSel.innerText = payloadConfig.payloadFile_2;
                } else if (payloadConfig.payloadName_2) {
                    payloadSel.innerText = payloadConfig.payloadName_2;
                };
            })
        }
        if (payloadConfig.StartFromDriveRoot_3 == true) {
            fs.access(`${path.join(payloadConfig.payloadDir_3, payloadConfig.payloadFile_3)}`, (err) => {
                var payloadSel = document.getElementById("pl3");
                if (err) {
                    payloadSel.innerText = "No Payload"
                } else if (payloadConfig.payloadName_3 == null) {
                    payloadSel.innerText = payloadConfig.payloadFile_3;
                } else if (payloadConfig.payloadName_3) {
                    payloadSel.innerText = payloadConfig.payloadName_3;
                };
            })
        } else {
            fs.access(`${path.join(__dirname, "..", "..", "/app.asar.unpacked/src", payloadConfig.payloadDir_3, payloadConfig.payloadFile_3)}`, (err) => {
                var payloadSel = document.getElementById("pl3");
                if (err) {
                    payloadSel.innerText = "No Payload"
                } else if (payloadConfig.payloadName_3 == null) {
                    payloadSel.innerText = payloadConfig.payloadFile_3;
                } else if (payloadConfig.payloadName_3) {
                    payloadSel.innerText = payloadConfig.payloadName_3;
                };
            })
        }
        if (payloadConfig.StartFromDriveRoot_4 == true) {
            fs.access(`${path.join(payloadConfig.payloadDir_4, payloadConfig.payloadFile_4)}`, (err) => {
                var payloadSel = document.getElementById("pl4");
                if (err) {
                    payloadSel.innerText = "No Payload"
                } else if (payloadConfig.payloadName_4 == null) {
                    payloadSel.innerText = payloadConfig.payloadFile_4;
                } else if (payloadConfig.payloadName_4) {
                    payloadSel.innerText = payloadConfig.payloadName_4;
                };
            })
        } else {
            fs.access(`${path.join(__dirname, "..", "..", "/app.asar.unpacked/src", payloadConfig.payloadDir_4, payloadConfig.payloadFile_4)}`, (err) => {
                var payloadSel = document.getElementById("pl4");
                if (err) {
                    payloadSel.innerText = "No Payload"
                } else if ((payloadConfig.payloadName_4 == null)) {
                    payloadSel.innerText = payloadConfig.payloadFile_4;
                } else if (payloadConfig.payloadName_4) {
                    payloadSel.innerText = payloadConfig.payloadName_4;
                };
            })
        }

        setInterval(() => {
            // Payload options
            if (document.getElementById("payload_select").value == "pl1") {
                plDir = payloadConfig.payloadDir_1;
                plFile = payloadConfig.payloadFile_1;
                plSDrive = payloadConfig.StartFromDriveRoot_1;
            } else
                if (document.getElementById("payload_select").value == "pl2") {
                    plDir = payloadConfig.payloadDir_2;
                    plFile = payloadConfig.payloadFile_2;
                    plSDrive = payloadConfig.StartFromDriveRoot_2;
                } else
                    if (document.getElementById("payload_select").value == "pl3") {
                        plDir = payloadConfig.payloadDir_3;
                        plFile = payloadConfig.payloadFile_3;
                        plSDrive = payloadConfig.StartFromDriveRoot_3;
                    } else
                        if (document.getElementById("payload_select").value == "pl4") {
                            plDir = payloadConfig.payloadDir_4;
                            plFile = payloadConfig.payloadFile_4;
                            plSDrive = payloadConfig.StartFromDriveRoot_4;
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
    };

    if ((window.location.href.indexOf("mainPage.html") > -1) || (window.location.href.indexOf("configPage.html") > -1)) {
        // Open config file location
        document.getElementById("payload_config").addEventListener("click", function () {
            child_process.exec(getCommandLine() + ' ' + path.join(__dirname, "..", "..", "/app.asar.unpacked/src/payloadConfig.json"));
        });
    };
});
contextBridge.exposeInMainWorld("orbit", {
    log: (input, type) => {
        log(input, type);
    },
    version: () => require("../package.json").version,
    buildStage: () => require("../package.json").buildStage,
    rcmStatus: () => {
        if (RCM_STATUS == "YES") {
            return `DETECTED`
        } else if (RCM_STATUS == "NO") {
            return `UNDETECTED`
        }
    },
    rcmStatusLog: () => {
        if (RCM_STATUS == "YES") {
            log(`Device Detected at Port ${RCM_STATE}`);
        } else if (RCM_STATUS == "NO") {
            log(`Device Not Detected`);
        }
    },
    theme: () => {
        log(`Current Theme: ${localStorage.getItem("orbitTheme")}`, "info");
    }
});
