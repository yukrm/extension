//!!настроить проверку по api постараться нормально, чтобы не сыпало кучу запросов ++
//вроде локальнльное хранилище каждый раз перезаписывает массив данных, поэтому сделал обычные массивы, с помощью которых запоминаю старые значения, перед добавлением новых
//!!настроить проверку перехода по сторонним ссылкам с сайта ++
//настроить проверку html кода
var black_list = [];
var white_list = [];
var extens_url = ['ohfllfkkggoibcpojmefndphjmhcjhlk','extensions'] ;
//обновление списков после релога
var update_list = function () {
  chrome.storage.local.get(['url_black','url_white'], function (result){
    if (result.url_black){
      black_list = result.url_black;
    }
    if (result.url_white){
      white_list = result.url_white;
    }
  });
}
update_list ();
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.greeting == "update") {
    update_list();
    };
});
//кнопка добавить в черный список
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.greeting == "url-in-black-list") {
    bb();
    };
    
});
//кнопка добавить в белый список
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.greeting == "url-in-white-list") {
    wb();
    };
});

//кнопка запросить белый список
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.greeting == "white-list") {
    chrome.storage.local.get(['url_white'], function (result){
      alert (result.url_white);
    });
    };
});

//кнопка запросить черный список
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.greeting == "black-list") {
    chrome.storage.local.get(['url_black'], function (result){
      alert (result.url_black);
    });
    };
});


//кнопка удалить списки
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.greeting == "delete-list") {
    chrome.storage.local.clear(function() {
      black_list = [];
      white_list = [];
    });  
};
});

//взаимодействие с белой кнопкойdomain
var wb = function () {
  chrome.tabs.query({"status": "complete","currentWindow": true,"active": true}, function (tabs) {
    var tab = tabs[0];
    var url = new URL(tab.url);
    var domain = url.hostname;
    if (white_list.includes(domain)==false && black_list.includes(domain)==false){
      white_list.push(domain)
      chrome.storage.local.set({'url_white': white_list}, function() {
      });
      update_list();
      alert("Добавлен в белый список" + " " + domain);
    }
    else if (black_list.includes(domain)==true){
      white_list.push(domain)
      var index = black_list.indexOf(domain);
      black_list.splice(index, 1);
      chrome.storage.local.set({'url_black': black_list, 'url_white': white_list}, function() {
      });
      update_list();
      alert ("Добавлен в белый список");
    }
    else {
      alert ("Сайт уже был добавлен");
    }
    });
}

//взаимодействие с черной кнопкой
var bb = function () {
  chrome.tabs.query({"status": "complete","currentWindow": true,"active": true}, function (tabs) {
    var tab = tabs[0];
    var url = new URL(tab.url);
    var domain = url.hostname;
    if (black_list.includes(domain)==false && white_list.includes(domain)==false && extens_url.includes(domain)==false){
      black_list.push(domain)
      chrome.storage.local.set({'url_black': black_list}, function() {
      });
      update_list ();
      alert("Добавлен в черный список" + " " + domain);
    }
    else if (white_list.includes(domain)==true){
      black_list.push(domain)
      var index = white_list.indexOf(domain);
      white_list.splice(index, 1);
      //изменение содержимого локального хранилища Chrome
      chrome.storage.local.set({
        'url_black': black_list, 
        'url_white': white_list
      }, function() {
      });
      update_list ();
      alert ("Добавлен в черный список");
    }
    else if (domain!=extens_url){
      alert ("Сайт уже был добавлен");
    }
    });
}
//проверяем сайт на фишинг (api virustotal, ...)
var scan_phish = async (domain,mark_list, tabId, url) => {
    console.log('запрос на проверку сайта '+ domain)
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'x-apikey': '60e0e249fb1651a4d82b6fc8b6813c584202533a0533d382f50e56142101dce8'
      }
    };
    let response = await fetch("https://www.virustotal.com/api/v3/domains/"+domain, options);
    let virustotal = await response.json();
    console.log (virustotal.data.attributes.last_analysis_stats);
    console.log (virustotal);
    if (virustotal.data.attributes.last_analysis_stats.malicious>1 || virustotal.data.attributes.last_analysis_stats.suspicious>1 
      || virustotal.data.attributes.last_https_certificate==undefined){
      mark_list[0]=1;
    }
    else {
      mark_list[0]=0;
    }
    //выносим решение о статусе страницы
    if (mark_list[0] == 1) {
      if (black_list.includes(domain)==false){
        black_list.push(domain);
        chrome.storage.local.set({'url_black': black_list, 'last_url': url}, function() {
        });
        //alert("Добавлен в черный список" + " " + domain);
        chrome.tabs.update(tabId, {url: chrome.extension.getURL("blocked.html")});
      }
    }
    else {
      if (white_list.includes(domain)==false){
        white_list.push(domain)
        chrome.storage.local.set({'url_white': white_list}, function() {
        });
        //alert("Добавлен в белый список" + " " + domain);
      }
    }
}
//принимаем решение о блокировке после анализа html
chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
  tabId = tabs.id;
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.greeting[0] == "check" && black_list.includes(request.greeting[1])==false && white_list.includes(request.greeting[1])==false && request.greeting[2]==0
    ) {
        black_list.push(request.greeting[1]);
        chrome.storage.local.set({'url_black': black_list}, function() {
        });
        chrome.tabs.update(tabId, {url: chrome.extension.getURL("blocked.html")});
        console.log(" заблокировано по анализу html")
      };
  });
})


chrome.tabs.onCreated.addListener(function(tab){
  var stop = 0;
  var mark_list=[2];
    chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
      if (stop==0){
        var url = new URL(changeInfo.url);
        var domain = url.hostname;
        if (black_list.includes(domain)==true){
          chrome.storage.local.set({'last_url': url.href}, function() {});
          chrome.tabs.update(tabId, {url: chrome.extension.getURL("blocked.html")});
        }
        else if (white_list.includes(domain)==false && extens_url.includes(domain)==false){
          //setTimeout(() => {  scan_phish(domain2, mark_list, tabId, url.href); }, 2000);
          setTimeout(() => {scan_phish(domain, mark_list, tabId, url.href); }, 2000);
        }
      }
      stop = 1;
    });

  });


  /*chrome.webRequest.onBeforeRequest.addListener(
function(details){
  //return {cancel: true};
  var url = new URL(details.url);
  var domain = url.hostname;
  var mark_list=[2];
  scan_phish(domain, mark_list);
  console.log(mark_list)
  if (domain=='...'){
    return {redirectUrl: chrome.extension.getURL("blocked.html")}
  } 
}, 
{urls: ["<all_urls>"], types: ['main_frame', 'sub_frame'],}, ['blocking']);
*/