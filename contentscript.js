//	DOM解析
var title = document.getElementsByTagName("TITLE").item(0).firstChild.nodeValue;
//	URL取得
var url = location.href;

//	JSON形式で戻り値を指定する
chrome.extension.sendRequest({"siteTitle": title,
							  "siteUrl": url
							  });
