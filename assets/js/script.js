const dropList = document.querySelectorAll("form select"),
fromCurrency = document.querySelector(".de select"),
toCurrency = document.querySelector(".para select"),
getButton = document.querySelector("form button");

for (let i = 0; i < dropList.length; i++) {
    for(let currency_code in converter_lista){
        // selecionando USD por padrão como moeda DE e NPR como moeda PARA
        let selected = i == 0 ? currency_code == "USD" ? "selected" : "" : currency_code == "NPR" ? "selected" : "";
        // criando uma tag de opção passando o código da moeda como texto e valor
        let optionTag = `<option value="${currency_code}" ${selected}>${currency_code}</option>`;
        // inserindo tag de opções dentro da tag select
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }
    dropList[i].addEventListener("change", e =>{
        loadFlag(e.target); // chamando loadFlag com passagem do elemento alvo como argumento
    });
}

function loadFlag(element){
    for(let code in converter_lista){
        if(code == element.value){ // se o código da moeda da lista de países for igual ao valor da opção
            let imgTag = element.parentElement.querySelector("img"); // selecionando a tag img de uma lista suspensa específica
            // passando o código do país de um código de moeda selecionado em um URL img
            imgTag.src = `https://flagcdn.com/48x36/${converter_lista[code].toLowerCase()}.png`;
        }
    }
}

window.addEventListener("load", ()=>{
    getExchangeRate();
});

getButton.addEventListener("click", e =>{
    e.preventDefault(); //impedindo o envio do formulário
    getExchangeRate();
});

const exchangeIcon = document.querySelector("form .icon");
exchangeIcon.addEventListener("click", ()=>{
    let tempCode = fromCurrency.value; // código de moeda temporário da lista suspensa FROM
    fromCurrency.value = toCurrency.value; // passando o código da moeda TO para o código da moeda FROM
    toCurrency.value = tempCode; //passando o código de moeda temporário para o código de moeda TO
    loadFlag(fromCurrency); // chamando loadFlag passando o elemento select (fromCurrency) de FROM
    loadFlag(toCurrency); // chamando loadFlag passando o elemento select (toCurrency) de TO
    getExchangeRate(); // chamando getExchangeRate
})

function getExchangeRate(){
    const amount = document.querySelector("form input");
    const exchangeRateTxt = document.querySelector("form .exchange-rate");
    let amountVal = amount.value;
    // se o usuário não inserir nenhum valor ou inserir 0, colocaremos 1 valor por padrão no campo de entrada
    if(amountVal == "" || amountVal == "0"){
        amount.value = "1";
        amountVal = 1;
    }
    exchangeRateTxt.innerText = "Obtendo taxa de câmbio...";
    let url = `https://v6.exchangerate-api.com/v6/081d2ee7618140ea70be8eba/latest/${fromCurrency.value}`;
    // buscando a resposta da API e retornando-a com análise em js obj e em outro método então recebendo esse obj
    fetch(url).then(response => response.json()).then(result =>{
        let exchangeRate = result.conversion_rates[toCurrency.value]; // selecionando o usuário para a taxa de câmbio
        let totalExRate = (amountVal * exchangeRate).toFixed(2); // multiplicando o valor inserido pelo usuário pela taxa de câmbio TO selecionada
        exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExRate} ${toCurrency.value}`;
    }).catch(() =>{ // se o usuário estiver offline ou qualquer outro erro ocorreu durante a busca de dados, a função catch será executada
        exchangeRateTxt.innerText = "Algo de Errado";
    });
}