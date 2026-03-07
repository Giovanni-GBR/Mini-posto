let gasStyle = document.querySelector(".gas")
let gasLand = document.querySelector(".gas-land")
let bttGas = document.querySelector(".bttGas")
let bttReset = document.querySelector(".resetGas")
let numero = document.querySelector(".numero")
let money = document.querySelector(".money")
let gas = 0
let intervalo = null
let numeroDoCliente 
let gasLim = document.querySelector(".gas-lim")
let podeAbastecer = false
let quantGas = document.querySelector("span")
let quantGas2 = document.querySelector(".quantGas2")
let diferenca 
let dinheiro = 0
let resultado = document.querySelector(".resultado")
let nCombo = document.querySelector(".combo")
let combo = 0
let ganho = 0
//let carro = Math.floor(Math.ramdom() * 3)

resetGas()

function gerarNumero() {
    let numeroAleatorio = Math.floor(Math.random() * (90 - 10 + 1) + 10)
    numeroDoCliente = numeroAleatorio
}

function startGas(){
    if (!podeAbastecer) return
    if (intervalo) return
    

    intervalo = setInterval(() => {
        if (gas >= 100) {
            clearInterval(intervalo)
            intervalo = null
            return
        }
        
        gas += 1
        numero.textContent = gas + "L"
        gasLand.style.width = gas + "%"
        
        
    }, 16)
}

function stopGas(){
    clearInterval(intervalo)
    intervalo = null
    if (podeAbastecer == false) return
    verificar()
    podeAbastecer = false
    document.querySelector("li").classList.remove("ativo")
}

function resetGas(){
    if (intervalo) return

    
    podeAbastecer = false
    gas = 0
    numero.textContent = gas + "L"
    gasLand.style.width = gas + "%"
    
    

    setTimeout(() => {
        gerarNumero()
        document.querySelector("li").classList.add("ativo")
        resultado.textContent = ""
        quantGas.textContent = numeroDoCliente
        quantGas2.textContent = numeroDoCliente + "L"
        gasLim.style.left = numeroDoCliente + "%"
        podeAbastecer = true
    }, 16)
    
}

function verificar() {
    
    diferenca = Math.abs(numeroDoCliente - gas)
     if (diferenca == 0) {        
        if (combo <= 4) combo++
        ganho = 20 + combo * 2
        dinheiro += 20 + combo * 2
        resultado.textContent = "🔥 PERFEITO +" + ganho
        nCombo.textContent = combo 
    }else if (diferenca <= 2) {
        if (combo <= 4) combo++
        ganho = 10 + combo * 2
        dinheiro += 10 + combo * 2
        resultado.textContent = "⚡ QUASE +" + ganho
        nCombo.textContent = combo 
    }else{
        dinheiro -= 10
        resultado.textContent = "❌ ERRO -10"
        combo = 0
        nCombo.textContent = combo 
    }
    lojaUpgrade()
    setTimeout(resetGas, 2000)
    money.textContent = dinheiro
    console.log(diferenca)
}

function lojaUpgrade(){
    if (dinheiro >= 100) {
        document.querySelector(".loja").style.display = "flex"
    }
}



bttGas.addEventListener("mousedown", startGas)
bttGas.addEventListener("mouseup", stopGas)

bttGas.addEventListener("touchstart", startGas)
bttGas.addEventListener("touchend", stopGas)