//window.onload = function() {
//}
function ready() {
    var a = document.getElementsByTagName('a');
    var links = [];
    for(var i = 0, n = a.length; i < n; i++) {
        var href = a[i].href;
        if(href.length) {
            links.push(href);
        }
    }
    //var domen=document.location.host.split('.')[1]+'.'+document.location.host.split('.')[2];
    var domen=document.location.host;
    var reg= new RegExp(domen)
    var first_url = links.filter(item=>reg.exec(item)).length
    url_in_html = (first_url/links.length)*100
    var reg2= new RegExp('#')
    var url_0 = links.filter(item=>reg2.exec(item))
    var reg3= new RegExp("javascript:")
    var url_00 = links.filter(item=>reg3.exec(item))
    url_in_html0 = ((url_0.length+url_00.length)/links.length)*100

    const counts = {};
    links.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
    var keys = Object.keys(counts);
    var min = counts[keys[0]]; // ignoring case of empty list for conciseness
    var max = counts[keys[0]];
    var i;
    for (i = 1; i < keys.length; i++) {
        var value = counts[keys[i]];
        if (value < min) min = value;
        if (value > max) max = value;
    }
    max_similar = (max/links.length)*100;

    console.log("Все ссылки на странице", links);
    console.log("Родительский домен кол-во % < 50%", url_in_html)
    console.log("Количество нулевых % > 50%", url_in_html0)
    console.log("Количество одинаковых ссылок %", max_similar)
    if (links.length<5 || url_in_html0>=50 || url_in_html<50 || max_similar>15){
        url_in_html=0;
    }
    
    chrome.runtime.sendMessage({greeting: 
        [
        "check", 
        domen, 
        url_in_html, 
        document.location.href
        ]
    });
    chrome.storage.local.set({'last_url': document.location.href}, function() {
    });
}

window.addEventListener("DOMContentLoaded", ready(  )
);
