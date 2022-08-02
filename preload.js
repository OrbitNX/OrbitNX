var spawn = require("child_process").spawn;
var payloadConfig = require("./payloadConfig.json");
function injectNXPL (dir, payload) {
    spawn('python',["./fusee-launcher/fusee-launcher.py",
`${dir}/${payload}`]);
}
function installPyReq () {
    spawn('pip',["install", "pyusb"]);
}
window.addEventListener('DOMContentLoaded', () => {
    document.getElementById("payload_1").innerText = payloadConfig.payloadName_1;
    document.getElementById("payload_1").addEventListener("click", function () {
        injectNXPL(payloadConfig.payloadDir_1, payloadConfig.payload_1);
    });

    document.getElementById("payload_2").innerText = payloadConfig.payloadName_2;
    document.getElementById("payload_2").addEventListener("click", function () {
        injectNXPL(payloadConfig.payloadDir_2, payloadConfig.payload_2);
    });
    
    document.getElementById("installPyReq").addEventListener("click", function () {
        installPyReq();
    });
  });
