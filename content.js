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
    if (domen.replace(/[^.]/g,"").length==2){
        domen = domen.split('.')[1]+'.'+domen.split('.')[2];
    }
    url = new URL (document.location)
    console.log(domen)
    var reg= new RegExp(domen)
    var first_url = links.filter(item=>reg.exec(item))
    console.log("first_url", first_url)
    url_in_html = (first_url.length/links.length)*100
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
    
    
    //if (links.length<5 || url_in_html0>=50 || url_in_html<50 || max_similar>15){
    //    url_in_html=0;
    //}
    console.log("Родительский домен кол-во % < 50%", url_in_html)
    if (links.length>25 && max_similar>17){
        url_in_html=0;
        console.log("Количество одинаковых ссылок % > 15%", max_similar)
    }
    if (links.length<25 && max_similar>90){
        url_in_html=0;
        console.log("Количество одинаковых ссылок % > 90%", max_similar)
    }
    console.log("Протокол: ", url.protocol)
    if (url_in_html0>=30 || url_in_html<50 || url.protocol != "https:" || links.length==0){
        url_in_html=0;
    }
    console.log("Все ссылки на странице", links);
    console.log("одинаковые ссылки:", counts)
    console.log("Количество нулевых % > 30%", url_in_html0)
    console.log(url_in_html)
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



//
    function getNodeText (item) {
        value = "";
        var length = item.childNodes.length;
        for (var i = 0; i < length; i++) {
         var node = item.childNodes[i];
         if (node.nodeType != 8) {
          value += node.nodeType != 1 ? node.nodeValue : getNodeText(node);
         }
        }
        return value;
       }
       
       var words = getNodeText(document.getElementsByTagName('body')[0])
       words = words.replace (/<\/?[^>]+(>|$)/g, ""); //Удалить теги
       var wordsarr=words.split(/\s+/); //Разбить по пробельному разделителю
       wordsarr = wordsarr.filter(function(n) { return n != undefined && n != ''}); //Отфильтровать пустые элементы
       
       var count = wordsarr.length; //Найти количество слов
       
       //Разобрать массив по нужному формату и показать в окне диалога
       var result = '';
       wordsarr.forEach (
        function (item, i, arr) { result += i + ': "' + item + '"' + "\n"; }
       );
       result += 'Count=' + count;
       console.log(result)
       console.log("слов в тексте" + count)
//


}
//window.addEventListener("DOMContentLoaded", ready() );
//window.addEventListener("load", ready() );
window.onload = function(){
    ready();
}
