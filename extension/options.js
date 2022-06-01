
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
        $(h).appendTo(li).attr('id','url').attr('class', result.url_white[elem]);;
        $(h).text(result.url_white[elem]);
        $(li).appendTo(ul);
    }
    $(ul).appendTo('white_list');

    $('#white_lst').on("click",function(event){
        if (event.target.id!="white_lst" && event.target.id  && event.target.id!="url"){
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
        $(h).appendTo(li).attr('id','url').attr('class', result.url_black[elem]);
        $(h).text(result.url_black[elem]);
        $(li).appendTo(ul);
    }
    $(ul).appendTo('black_list');
    $('#black_lst').on("click",function(event){
        if (event.target.id!="black_lst" && event.target.id && event.target.id!="url"){
            var delet = event.target.id
            delete black_lst[delet]
            black_lst=black_lst.filter(n => n)
            chrome.storage.local.set({'url_black': black_lst}, function() {
          });
          location.reload()
          chrome.runtime.sendMessage({greeting: "update"});
        }
    });
    $('#list').on("click",function(event){
        if (event.target.id=='url'){
            var domain=event.target.className;
            scan_phish(domain)
        }
    });
});

var scan_phish = async (domain) => {
    $('#info_url').empty();
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
    var json = JSON.stringify(virustotal);
    var obj = JSON.parse(json);
    console.log(obj)

    document.getElementById('info_url').innerHTML += '<h1 id="url_inf">URL: '+domain+'</h1>' ;
    //var last_https_certificate_date = new Date(obj.data.attributes.last_https_certificate_date*1000).toLocaleDateString();
    //document.getElementById('info_url').innerHTML += '<li>last_https_certificate_date: '+last_https_certificate_date+'</li>' ;
    
    document.getElementById('info_url').innerHTML += '<li>Reputation: '+obj.data.attributes.reputation+'</li>' ;
    if (obj.data.attributes.categories['Forcepoint ThreatSeeker']){
        document.getElementById('info_url').innerHTML += '<li>Categori: '+obj.data.attributes.categories['Forcepoint ThreatSeeker']+'</li>' ;
    }
 
    document.getElementById('info_url').innerHTML += '<h1 id="url_inf"> Popularity ranks: </h1>' ;
    if (obj.data.attributes.popularity_ranks.Alexa){
        document.getElementById('info_url').innerHTML += '<li>Alexa: '+obj.data.attributes.popularity_ranks.Alexa.rank+'</li>' ;
    }
    if (obj.data.attributes.popularity_ranks.Majestic){
        document.getElementById('info_url').innerHTML += '<li>Majestic: '+obj.data.attributes.popularity_ranks.Majestic.rank+'</li>' ;
    }
    if (obj.data.attributes.popularity_ranks.Statvoo){
        document.getElementById('info_url').innerHTML += '<li>Statvoo: '+obj.data.attributes.popularity_ranks.Statvoo.rank+'</li>' ;
    }
    if (obj.data.attributes.popularity_ranks["Cisco Umbrella"]){
        document.getElementById('info_url').innerHTML += '<li>Cisco Umbrella: '+obj.data.attributes.popularity_ranks["Cisco Umbrella"].rank+'</li>' ;
    }
    if (obj.data.attributes.popularity_ranks.Quantcast){
        document.getElementById('info_url').innerHTML += '<li>Quantcast: '+obj.data.attributes.popularity_ranks.Quantcast.rank+'</li>' ;
    }

    document.getElementById('info_url').innerHTML += '<h1 id="url_inf"> Analysis stats: </h1>' ;
    document.getElementById('info_url').innerHTML += '<li>Harmless: '+obj.data.attributes.last_analysis_stats.harmless+'</li>' ;
    document.getElementById('info_url').innerHTML += '<li>Malicious: '+obj.data.attributes.last_analysis_stats.malicious+'</li>' ;
    document.getElementById('info_url').innerHTML += '<li>Suspicious: '+obj.data.attributes.last_analysis_stats.suspicious+'</li>' ;
    document.getElementById('info_url').innerHTML += '<li>Timeout: '+obj.data.attributes.last_analysis_stats.timeout+'</li>' ;
    document.getElementById('info_url').innerHTML += '<li>Undetected: '+obj.data.attributes.last_analysis_stats.undetected+'</li>' ;

    

    
    
    document.getElementById('info_url').innerHTML += '<h1 id="url_inf">https certificate:</h1>' ;
    document.getElementById('info_url').innerHTML += '<li>Valid until: '+obj.data.attributes.last_https_certificate.validity.not_after+'</li>' ;
    document.getElementById('info_url').innerHTML += '<li>Algorithm: '+ obj.data.attributes.last_https_certificate.cert_signature.signature_algorithm+'</li>' ;
    document.getElementById('info_url').innerHTML += '<li>CA: '+ obj.data.attributes.last_https_certificate.extensions.CA+'</li>' ;
    document.getElementById('info_url').innerHTML += '<li>CA Issuers: '+ obj.data.attributes.last_https_certificate.extensions.ca_information_access["CA Issuers"]+'</li>' ;
    document.getElementById('info_url').innerHTML += '<li>Version: '+ obj.data.attributes.last_https_certificate.version+'</li>' ;
    
}
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