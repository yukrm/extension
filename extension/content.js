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
    url_in_html = first_url/links.length

    var reg2= new RegExp('#')
    var url_0 = links.filter(item=>reg2.exec(item))
    var reg3= new RegExp("javascript:")
    var url_00 = links.filter(item=>reg3.exec(item))
    url_in_html0 = (url_0.length+url_00.length)/links.length

    console.log(url_00.length, url_0.length);
    console.log(links);
    console.log(url_in_html0, url_in_html);
    if (links.length<5 || url_in_html0>0.57 || url_in_html<0.5){
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

