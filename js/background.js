function getCookie (cookieName){
    var defer = new jQuery.Deferred();
    chrome.cookies.get({
        'url':'http://siteadmin2.uswest.vin65.com',
        'name':cookieName
    },
    function(data){
        defer.resolve(data);
    });
    return defer.promise();
}

$CFID = 1234;
getCookie("CFID").done(function(data){
	$CFID = data.value;
});

chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.CFID == "siteadmin1"){
      sendResponse({CFID: $CFID});
    }
  });