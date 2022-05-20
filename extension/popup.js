//var domen = window.location.hostname;
//var url = window.location.href;
window.onload = function() {
    document.getElementById("settings").onclick = function(el) {
        window.open(chrome.extension.getURL("options.html"));
    }
    document.getElementById("btn_black").onclick = function(el) {
        chrome.runtime.sendMessage({greeting: "url-in-black-list"});
    }
    document.getElementById("btn_white").onclick = function(el2) {
        chrome.runtime.sendMessage({greeting: "url-in-white-list"
    });
    }
}