var xhr = new XMLHttpRequest();
xhr.onload = function() {
  console.log('chromeext_xhr')
  var blockedurl = ['*://*.example.com/*'];
  if(xhr.responseText)
  {      
    blockedurl = xhr.responseText.split('\n').map(e => `*://*.${e}/*`);
  }
  
  chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    //console.log("url: " + details.url);
    return {cancel: true};
  },
  // filters
  {
    urls: blockedurl    
  },
  // extraInfoSpec
  ["blocking"]);
  
}
xhr.open("GET", chrome.extension.getURL('blocked.txt'), true);
xhr.send();


