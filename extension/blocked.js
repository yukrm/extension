var b_list = [];
var w_list = [];
var change;
chrome.storage.local.get(['url_black', 'url_white'], function (result){
    b_list = result.url_black;
    w_list = result.url_white;
});


window.onload = function() {
chrome.storage.local.get(['url_black', 'url_white'], function (result){
    b_list = result.url_black;
    w_list = result.url_white;
    });
    document.getElementById("back").onclick = function() {
        change=b_list.pop();
        if (w_list){
            w_list.push(change);
        }
        else {
            w_list=[change];
        } 
        chrome.storage.local.set({'url_white': w_list, 'url_black': b_list}, function() {
        });
        chrome.runtime.sendMessage({greeting: "update"});
        chrome.storage.local.get(['last_url'], function (result){
            //window.open(result.last_url); 
            var n = result.last_url;
            //console.log(result.last_url)
            document.location.href = n;
        });
    }
    document.getElementById("close").onclick = function() {
        window.close();
    }
}
