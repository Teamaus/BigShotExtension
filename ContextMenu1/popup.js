function openSymbol(value){
    
    chrome.runtime.sendMessage({openSymbol:value})  
}
function startTrade(){
    chrome.runtime.sendMessage({startTrade:true}) 
}
document.addEventListener("DOMContentLoaded",()=>{
    var btn = document.getElementById("btnStartTrade")
    var btn2 = document.getElementById("btnDemoMode")
    var btn3 = document.getElementById("btnChallangeMode")

    var symbol = document.getElementById("symbol")
    symbol.focus()
    symbol.addEventListener("keypress",(e)=>{
        if (e.key==='Enter'){
            openSymbol(symbol.value)
        }
    }
    )
    
    btn.addEventListener("click",(evt)=>startTrade())
    btn2.addEventListener("click",(evt)=> chrome.runtime.sendMessage({toggleMode:DEMO})  )
    btn3.addEventListener("click",(evt)=> chrome.runtime.sendMessage({toggleMode:CHALLANGE})  )
    
    
}
)
const CHALLANGE = "challange"
const DEMO = "demo"

let mode = CHALLANGE
function toggleMode(mode){
    
  

    chrome.runtime.sendMessage({toggleMode:mode})  

}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.mode)
            document.getElementById("btnToggleMode").innerHTML = request.mode

})

