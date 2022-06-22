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
    chrome.tabs.query({active:true},function(tab){
        var url = new URL(tab[0].url);
        var domain = url.hostname;
        var ul = document.getElementById('url');
        $(ul).empty();
        var h4 = document.createElement('h4');
        $(h4).appendTo(ul).text(domain).addClass('cur_url');
        $(ul).appendTo('url');
        var im = document.createElement('img')
        $(im).appendTo(h4).attr('src', 'wp.png').attr('id', 'wp');
    });

    chrome.storage.local.get(['url_black','url_white'], function (result){
        var len_black=0;
        var len_white=0;
        if (result.url_black){
            len_black = result.url_black.length;
        }
        if (result.url_white){
            len_white = result.url_white.length;
        }
        len_sum=len_black+len_white;
        var sum = document.getElementById('sum');
        var blocked = document.getElementById('blocked');
        $(sum).empty;
        $(blocked).empty;
        var h44=document.createElement('h4');
        var h4=document.createElement('h4');
        $(h4).appendTo(blocked).text('Заблокировано: '+len_black).addClass('sum_block');
        $(blocked).appendTo('blocked');
        $(h44).appendTo(sum).text('Всего просканировано: '+len_sum).addClass('sum_url');
        $(sum).appendTo('sum');
    });
    
}
