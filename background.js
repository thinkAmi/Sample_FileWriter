chrome.extension.onMessage.addListener(function(request, sender, sendResponse){
  var errorCallback = function(e){};

  webkitRequestFileSystem(TEMPORARY, 1024*1024, function(fileSystem){

    fileSystem.root.getFile("testfile.txt", {'create':true}, function(fileEntry){
      fileEntry.createWriter(function(fileWriter){

        //  ファイルの書き込み位置は、一番最後とする
        fileWriter.seek(fileWriter.length);

        //  出力行
        var lines = '';


        //  0バイトファイルの場合、ヘッダ行を作成する
        if (fileWriter.length == 0)
        {
          var headers = new Array(addQuote("サイトタイトル"),
                                  addQuote("URL"));
          lines = headers.join(",") + "\n";
        }


        //  データ行の作成
        var details = new Array(addQuote(request.siteTitle),
                                addQuote(request.siteUrl));
        lines += details.join(",") + "\n";

        var blob = new Blob([
          lines
          ],
          {
            type: 'text/plain'
          }
        );

        fileWriter.write(blob);


        fileWriter.onwriteend = function(e) {
          console.log('Write completed.');
        };

        fileWriter.onerror = function(e) {
          console.log('Write failed: ' + e.toString());
        };

      }, errorCallback);
    }, errorCallback);
  }, errorCallback);
});



/*
  CSVファイル用に、項目をダブルクオートで囲む
*/
function addQuote(field)
{
  return  "\"" + field + "\"";
}
