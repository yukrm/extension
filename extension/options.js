
window.onload = function() {
    
    document.getElementById("delete_all").onclick = function(el2) {
        chrome.runtime.sendMessage({greeting: "delete-list"
    });
    location.reload();
    }
//document.getElementById("open-btn1").onclick = function(el2) {
    chrome.storage.local.get(['url_black','url_white'], function (result){
    
    var white_lst=result.url_white;
    var black_lst=result.url_black;
    var ul = document.getElementById('white_lst');
    $(ul).empty();
    for (elem in white_lst){
        var li = document.createElement('li');
        var h = document.createElement('h4');
        var del = document.createElement('img')
        $(del).appendTo(li).attr('src', 'del.png').addClass('del').attr('id', elem);
        $(h).appendTo(li);
        $(h).text(result.url_white[elem]);
        $(li).appendTo(ul);
    }
    $(ul).appendTo('white_list');

    $('#white_lst').on("click",function(event){
        if (event.target.id!="white_lst" && event.target.id){
            var delet = event.target.id
            delete white_lst[delet]
            white_lst=white_lst.filter(n => n)
            chrome.storage.local.set({'url_white': white_lst}, function() {
            });
            location.reload();
            chrome.runtime.sendMessage({greeting: "update"});
        }
    });
    var ul = document.getElementById('black_lst');
    for (elem in black_lst){
        var li = document.createElement('li');
        var h = document.createElement('h4');
        var del = document.createElement('img')
        $(del).appendTo(li).attr('src', 'del.png').addClass('del').attr('id', elem);
        $(h).appendTo(li);
        $(h).text(result.url_black[elem]);
        $(li).appendTo(ul);
    }
    $(ul).appendTo('black_list');
    $('#black_lst').on("click",function(event){
        if (event.target.id!="black_lst" && event.target.id){
            var delet = event.target.id
            delete black_lst[delet]
            black_lst=black_lst.filter(n => n)
            chrome.storage.local.set({'url_black': black_lst}, function() {
          });
          location.reload()
          chrome.runtime.sendMessage({greeting: "update"});
        }
    });
});
}

//}
/*
.attr('src', 'del.png')
document.getElementById("delete").onclick = function(el2) {
        chrome.runtime.sendMessage({greeting: "delete-list"
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
*/