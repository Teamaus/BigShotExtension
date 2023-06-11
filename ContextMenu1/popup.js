function openSymbol(value){
    
    chrome.runtime.sendMessage({openSymbol:value})  
}
function startTrade(){
    chrome.runtime.sendMessage({startTrade:true}) 
}
document.addEventListener("DOMContentLoaded",()=>{
    var btnStartTrade = document.getElementById("btnStartTrade")
    var btnDemo = document.getElementById("btnDemoMode")
    var btnChallange = document.getElementById("btnChallangeMode")

    var symbol = document.getElementById("symbol")
    symbol.focus()
    symbol.addEventListener("keypress",(e)=>{
        if (e.key==='Enter'){
            openSymbol(symbol.value)
        }
    }
    )
    
    btnStartTrade.addEventListener("click",(evt)=>startTrade())
    btnDemo.addEventListener("click",(evt)=> chrome.runtime.sendMessage({toggleMode:DEMO})  )
    btnChallange.addEventListener("click",(evt)=> chrome.runtime.sendMessage({toggleMode:CHALLANGE})  )
    toggleMode("challange")
    
}
)
const CHALLANGE = "challange"
const DEMO = "demo"

let mode = CHALLANGE

function toggleMode(mode){
          chrome.runtime.sendMessage({ toggleMode: mode });
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.mode)
            document.getElementById("mode").innerHTML = request.mode

})

