//window.onload = function() {
    var a = document.getElementsByTagName('a');
    var links = [];

    for(var i = 0, n = a.length; i < n; i++) {
        var href = a[i].href;

        if(href.length) {
            links.push(href);
        }
    }
    console.log(links)
    //var domen=document.location.host.split('.')[1]+'.'+document.location.host.split('.')[2];
    var domen=document.location.host;
    var reg= new RegExp(domen)
    var first_url = links.filter(item=>reg.exec(item)).length
    //console.log(links.filter(item=>reg.exec(item)).length)
    //console.log(links.length)
    url_in_html = first_url/links.length
    if (links.length<5){
        url_in_html=0;
    }
    console.log(url_in_html)
    //console.log(domen)
    //console.log(links)
    chrome.runtime.sendMessage({greeting: ["check", domen, url_in_html, document.location.href]});
//}