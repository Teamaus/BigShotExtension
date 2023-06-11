const bigShotUrl = "https://bigshotchallenge.bigshot-station.com/dark/symbol?symbol="
const tradingViewUrl = "https://il.tradingview.com/chart/DdugIrMT/?symbol="
let menuOptions = {
  "bigShotOpenTab_menuItem":(info,tab)=>Menu_OpenTab(info,tab),
  "bigShotClearTabs_menuItem":(info,tab)=>Menu_StartTrade(info)
}
let modes = {
                challange:"https://bigshotchallenge.bigshot-station.com/dark/symbol?symbol=",
                demo:"https://demostocks.bigshot-station.com//dark/symbol?symbol="
}
currentMode = "challange"
function getBigshotURL(){
  return modes[currentMode]
}
let initialTabs = 

[
  "https://www.beithanoar.org.il/%D7%A4%D7%A2%D7%99%D7%9C%D7%95%D7%99%D7%95%D7%AA/%D7%91%D7%A8%D7%99%D7%9B%D7%94-%D7%95%D7%9E%D7%95%D7%A2%D7%93%D7%95%D7%9F-%D7%94%D7%9B%D7%95%D7%A9%D7%A8/%D7%A9%D7%A2%D7%95%D7%AA-%D7%A4%D7%A2%D7%99%D7%9C%D7%95%D7%AA-%D7%94%D7%91%D7%A8%D7%99%D7%9B%D7%94",
  "https://www.nasdaq.com/market-activity/stocks/spy/latest-real-time-trades",
  "https://calendar.google.com/calendar/u/0/r",
  "https://finance.yahoo.com/most-active/?offset=0&count=250",
   "https://web.whatsapp.com/",
"https://marketchameleon.com/Calendar/Earnings" ,
"https://docs.google.com/spreadsheets/d/13mqqtReJnJkSpuTiCa_TSJs8-kBLsXd4SqjKZCGBIhM/edit#gid=0",
"https://finviz.com/map.ashx",
"https://bigshotchallenge.bigshot-station.com/sessions/new",
"https://bigshotchallenge.bigshot-station.com/dark/screener",
]
let initialSymbols = ["SPY"]

function changeMode(mode){
  currentMode = mode 
}




function init(){
  var clearStorage = true 
  if (clearStorage){
      clearStorage = false
      chrome.storage.local.set({"watchList":[]})
  }
}
function openTab(url,pinned){
  chrome.tabs.create({ url: url,pinned:pinned},(tab)=>
  {
    
    chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, updatedTab) {
        if (tabId === tab.id && changeInfo.status === "complete") {
            console.log("LOADED")
        }
            //chrome.tabs.executeScript(tabId, {code: "document.title = ')
  })
  })
}
function isSymbolTab(updatedTab){
    return updatedTab.url.startsWith(getBigshotURL())
        
    
    
}
function getSymbol(updatedTab){
  let retval = updatedTab.url.replace(getBigshotURL(),"")
  console.log("UpdatedTAB===>>>",updatedTab)
  return retval 
}
chrome.tabs.onUpdated.addListener((tabId,changeInfo,updatedTab)=>{
    console.log("CHANGE INFO= >>>>>",changeInfo)
    if (isSymbolTab(updatedTab)){
      let symbol = getSymbol(updatedTab)
      chrome.tabs.sendMessage(tabId,symbol)
    }
})
function activateTab(url,pinned){
  let func = (posType)=>
  chrome.tabs.query({url:url+"&"+posType},(tabs)=>{  
    if (tabs.length == 0 ){
      chrome.tabs.create({ url: url+"&"+posType,pinned:pinned})
    }
    else
      chrome.tabs.update(tabs[0].id,{active:true})
    

  
 
  }) 
  func(currentMode)
  

}

function openSymbol(symbol,pinned){
  let url = getBigshotURL()+symbol
  activateTab(url,pinned)
  
 
 
}
function Menu_OpenTab(info,tab){
//  var target = chrome.contextMenus.getTargetElement(info, tab);
      let linkText = ''
      if(info.linkUrl)
      {
        let   a = info.linkUrl.split("/")
        linkText = a[a.length-2]
      }
      if (linkText == '')
        linkText = info.selectionText 
      openSymbol(linkText,false)
      
}
function Menu_StartTrade(info){
  
  chrome.tabs.query({currentWindow: true}, function(tabs) {
    // Loop through all tabs and close them
    for (var i = 0; i < tabs.length; i++) {
      chrome.tabs.remove(tabs[i].id);

    }
    
    //chrome.tabs.update(tabs[tabs.length - 2].id, {url: "https://bigshotchallenge.bigshot-station.com/sessions/new"});
   
    initialTabs.map(url=> openTab(url,true) )
    initialSymbols.map(url=>openSymbol(url,true))
    

    

    
  
  
  
  });
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
    if (request.getMode){
        console.log("getMode")
        chrome.runtime.sendMessage({mode:currentMode})
    }
    if (request.toggleMode){
      
      changeMode(request.toggleMode)
    }
    if (request.startTrade){
      Menu_StartTrade(undefined)
    }
    if (request.ActivateTab){
        activateTab(request.ActivateTab)
    }
  })
  chrome.contextMenus.onClicked.addListener(function(info, tab) {
    menuOptions[info.menuItemId](info,tab)
  });
  
  