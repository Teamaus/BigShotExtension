console.log("CONTENT=>>>")
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      console.log("GET MESSAGE ===>>>")
      console.log(sender.tab ?
                  "from a content script:" + sender.tab.url :
                  "from the extension");
    if (request.watchList){
        var elem = document.getElementsByClassName("pull-left")        
        elem[0].innerHTML += JSON.stringify(request)
    }   
    else{
     document.title = request
    }
    }
  );
elem = document.getElementsByClassName("pull-left")
if (elem)
{
    elem[0].addEventListener("click",(evt)=>document.body.style.backgroundColor = "red")
    
    
    
}
else
{
    console.log("EMPTY=>>>>EXTENSION")
}