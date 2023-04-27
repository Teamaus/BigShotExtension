function openSymbol(value){
    
    chrome.runtime.sendMessage({openSymbol:value})  
}
document.addEventListener("DOMContentLoaded",()=>{
    var btn = document.getElementById("btn")
    var symbol = document.getElementById("symbol")
    symbol.focus()
    symbol.addEventListener("keypress",(e)=>{
        if (e.key==='Enter'){
            openSymbol(symbol.value)
        }
    }
    )
    btn.addEventListener("click",(evt)=>openSymbol(document.getElementById("symbol").value))

    
}
)