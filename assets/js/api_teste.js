const request = (url, callback) => {
  fetch(url)
    .then(response => response.json())
    .then(data => callback(null, null, data))
    .catch(error => callback(error, null, null));
};

const displayCotacao = (id, cotacao, dia) => {
  const cotacaoFloat = parseFloat(cotacao);
  document.getElementById(id).innerHTML = `R$${cotacaoFloat.toFixed(2)} ${dia}`;
};

const callbackBitCoin = (erro, res, body) => {
  if (!erro) {
    let cotacao = body.BTCBRL.bid;
    let dia = body.BTCBRL.create_date;
    displayCotacao('bitcoin', cotacao, dia);
  }
};

const callbackDolar = (erro, res, body) => {
  if (!erro) {
    let cotacao = body.USDBRL.bid;
    let dia = body.USDBRL.create_date;
    displayCotacao('dolar', cotacao, dia);
  }
};

const callbackEuro = (erro, res, body) => {
  if (!erro) {
    let cotacao = body.EURBRL.bid;
    let dia = body.EURBRL.create_date;
    displayCotacao('euro', cotacao, dia);
  }
};

const intervalId = setInterval(() => {
  request("https://economia.awesomeapi.com.br/last/USD-BRL,EUR-BRL,BTC-BRL", callbackBitCoin);
  request("https://economia.awesomeapi.com.br/last/USD-BRL", callbackDolar);
  request("https://economia.awesomeapi.com.br/last/EUR-BRL", callbackEuro);
}, 5000);



