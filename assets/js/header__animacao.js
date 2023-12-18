window.addEventListener("scroll", function () {
  var header = document.querySelector("header");
  header.classList.toggle("sticky", this.window.scrollY > 0);
});


// ========================= MUDANÇA DE HEADER IMG ================================ //

// Variáveis para armazenar o estado da imagem
var imagemPadrao = "../../img/new_logo.png";
var imagemAlterada = "../../img/new_logo_secund.png";
var imagemAtual = imagemPadrao;

// Função para trocar a imagem quando a página rolar para fora do cabeçalho
function trocarImagemAposHeader() {
  var minhaImagem = document.getElementById("imagem1");
  var header = document.getElementById("header");

  // Obtém a altura do cabeçalho
  var headerHeight = header.clientHeight;

  // Obtém a posição vertical atual da página
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  // Define a altura em que você deseja que a imagem seja trocada
  var alturaDesejada = headerHeight + 100; // Trocar a imagem 100 pixels após o cabeçalho

  // Verifica se a posição atual ultrapassou a altura desejada
  if (scrollTop > alturaDesejada) {
    // Se a imagem atual for a imagem padrão, altera para a imagem alterada
    if (imagemAtual === imagemPadrao) {
      minhaImagem.src = imagemAlterada;
      imagemAtual = imagemAlterada;
    }
  } else {
    // Se a imagem atual for a imagem alterada, volta para a imagem padrão
    if (imagemAtual === imagemAlterada) {
      minhaImagem.src = imagemPadrao;
      imagemAtual = imagemPadrao;
    }
  }
}
// Adicione um evento de rolagem (scroll) para chamar a função quando a página rolar
window.addEventListener("scroll", trocarImagemAposHeader);


// =============== DARKMODE BUTTON =================== //

// ============== BODY ================== //

document.addEventListener('DOMContentLoaded', function() {
  const check = document.getElementById('check');

  // Função para alterar tema
  function toggleDarkMode() {
    document.body.classList.toggle('dark', check.checked);
  }
  
  check.addEventListener('change', toggleDarkMode);
  toggleDarkMode();
});
