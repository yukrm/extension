
window.onload = function() {
    document.getElementById("delete").onclick = function(el2) {
        chrome.runtime.sendMessage({greeting: "delete-list"
    });
    }

document.getElementById("open-btn1").onclick = function(el2) {
chrome.storage.local.get(['url_black','url_white'], function (result){
    var white_lst=result.url_white;
    

    var ul = document.getElementById('white_lst');
    $(ul).empty();
    for (elem in result.url_white){
        var li = document.createElement('li');
        var h = document.createElement('h4');
        var del = document.createElement('a');
        $(del).appendTo(li).attr('href', '##').text('×').addClass('close2').attr('id', elem);
        $(h).appendTo(li);
        $(h).text(result.url_white[elem]);
        $(li).appendTo(ul);
    }
   $(ul).appendTo('white_list');
   $('#openModal').on("click",function(event){
    if (event.target.id){
        var del = event.target.id
        delete white_lst[del]
        white_lst=white_lst.filter(n => n)
        chrome.storage.local.set({'url_white': white_lst}, function() {
      });
    }
});
});
}

document.getElementById("open-btn2").onclick = function(el2) {
    chrome.storage.local.get(['url_black','url_white'], function (result){
    var black_lst=result.url_black;
    var ul = document.getElementById('black_lst');
    $(ul).empty();
    for (elem in result.url_black){
        var li = document.createElement('li');
        var h = document.createElement('h4');
        var del = document.createElement('a');
        $(del).appendTo(li).attr('href', '##').text('×').addClass('close2').attr('id', elem);
        $(h).appendTo(li);
        $(h).text(result.url_black[elem]);
        $(li).appendTo(ul);
    }
   $(ul).appendTo('black_list');
   $('#openModal2').on("click",function(event){
    if (event.target.id){
        var del = event.target.id
        delete black_lst[del]
        black_lst=black_lst.filter(n => n)
        chrome.storage.local.set({'url_black': black_lst}, function() {
      });
    }
});
});
}

}