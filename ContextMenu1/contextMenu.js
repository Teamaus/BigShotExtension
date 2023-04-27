function init(){
  var clearStorage = true 
  if (clearStorage){
      clearStorage = false
      chrome.storage.local.set({"watchList":[]})
  }
}
function openSymbol(symbol){
  let url = "https://bigshotchallenge.bigshot-station.com/dark/symbol?symbol="+symbol
      
  chrome.tabs.create({ url: url},(tab)=>
  {
    
    chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, updatedTab) {
        if (tabId === tab.id && changeInfo.status === "complete") {
            //chrome.tabs.executeScript(tabId, {code: "document.title = 'New Title'"});
            chrome.tabs.sendMessage(tabId,symbol)
            
            var obj = chrome.storage.local.get("watchList").then((result)=>
            {
              
                result ={...result,watchList:[...result.watchList,linkText]}
              chrome.storage.local.set(result)
              chrome.tabs.sendMessage(tabId,result)
              
            }
            )
            
        }
      });
    
  });
  // Get the current tab
 
}
chrome.commands.onCommand.addListener(function(command) {
  console.log("COMMAND",command)
});

chrome.runtime.onInstalled.addListener(function() {
    init()
  
    chrome.contextMenus.create({
        id: "bigShotOpenTab_menuItem",
      title: "פתח בביגשוט",
      contexts: ["all"],
      
      
    });
    chrome.contextMenus.create({
        id: "bigShotClearTabs_menuItem",
      title: "התחלת מסחר",
      contexts: ["all"],
      
      
    });
    
    
  });
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.openSymbol){
        openSymbol(request.openSymbol)

    }
  })
  chrome.contextMenus.onClicked.addListener(function(info, tab) {
 
    if (info.menuItemId == "bigShotOpenTab_menuItem") {
      let   a = info.linkUrl.split("/")
      let linkText = a[a.length-2]
      if (linkText == '')
        linkText = info.selectionText 
      let url = "https://bigshotchallenge.bigshot-station.com/dark/symbol?symbol="+linkText
      
      chrome.tabs.create({ url: url},(tab)=>
      {
        
        chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, updatedTab) {
            if (tabId === tab.id && changeInfo.status === "complete") {
                //chrome.tabs.executeScript(tabId, {code: "document.title = 'New Title'"});
                chrome.tabs.sendMessage(tabId,linkText)
                
                var obj = chrome.storage.local.get("watchList").then((result)=>
                {
                  
                    result ={...result,watchList:[...result.watchList,linkText]}
                  chrome.storage.local.set(result)
                  chrome.tabs.sendMessage(tabId,result)
                  
                }
                )
                
            }
          });
        
      });
      // Get the current tab
      
      
    }
    if (info.menuItemId == "bigShotClearTabs_menuItem"){
        chrome.tabs.query({currentWindow: true}, function(tabs) {
            // Loop through all tabs and close them
            for (var i = 0; i < tabs.length-1; i++) {
              chrome.tabs.remove(tabs[i].id);

            }
            chrome.tabs.update(tabs[tabs.length - 1].id, {url: "https://bigshotchallenge.bigshot-station.com/sessions/new"});
            chrome.tabs.update(tab.id, {active: true});
          });
    }
  });
  