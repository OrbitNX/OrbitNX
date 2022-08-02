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
        injectNXPL(payloadConfig.payloadDir_1, payloadConfig.payloadFile_1);
    });

    document.getElementById("payload_2").innerText = payloadConfig.payloadName_2;
    document.getElementById("payload_2").addEventListener("click", function () {
        injectNXPL(payloadConfig.payloadDir_2, payloadConfig.payloadFile_2);
    });

    document.getElementById("payload_3").innerText = payloadConfig.payloadName_3;
    document.getElementById("payload_3").addEventListener("click", function () {
        injectNXPL(payloadConfig.payloadDir_3, payloadConfig.payloadFile_3);
    });

    document.getElementById("installPyReq").addEventListener("click", function () {
        installPyReq();
    });
  });
