//  DOM解析
var title = document.getElementsByTagName("TITLE").item(0).firstChild.nodeValue;
//  URL取得
var url = location.href;


chrome.extension.sendMessage({
    "siteTitle": title,
    "siteUrl": url
});