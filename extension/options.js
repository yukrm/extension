
window.onload = function() {
    document.getElementById("delete").onclick = function(el2) {
        chrome.runtime.sendMessage({greeting: "delete-list"
    });
    }
}
//переделать на onclick и добавить чистку старого списка
chrome.storage.local.get(['url_black','url_white'], function (result){
$(document).ready(function(){
 var ul = document.getElementById('white_lst');
 for (elem in result.url_white){
     var li = document.createElement('li');
     var h = document.createElement('h4');
     $(h).appendTo(li);
     $(h).text(result.url_white[elem]);
     $(li).appendTo(ul);
 }
$(ul).appendTo('white_list');
});
$(document).ready(function(){
    var ul = document.getElementById('black_lst');
    for (elem in result.url_black){
        var li = document.createElement('li');
        var h = document.createElement('h4');
        $(h).appendTo(li);
        $(h).text(result.url_black[elem]);
        $(li).appendTo(ul);
    }
   $(ul).appendTo('white_list');
   });
});
/*
document.getElementById("delete").onclick = function(){
    var ul = document.getElementById('white_lst');
    for (elem in result.url_white){
     var li = document.createElement('li');
     var h = document.createElement('h4');
     $(h).appendTo(li);
     $(h).text(result.url_white[elem]);
     $(li).appendTo(ul);
 }
$(ul).appendTo('white_list');

}
*/