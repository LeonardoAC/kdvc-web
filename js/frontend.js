/*
Leonardo A Carrilho
2020, September
*/

function inputShowHideLogin(){
  // Show or hide e-mail field on login screen
  let txtId         = document.getElementById('id');
  let txtPass       = document.getElementById('pass');
  let txtEml        = document.getElementById('email');
  let btnForgot     = document.getElementById('btnForgot');
  let btnCadastrar  = document.getElementById('btnNew');
  let btnSend       = document.getElementById('btnSend');

  // Recebe o inverso da visibilidade atual
  txtId.hidden        = ! txtId.hidden;
  txtPass.hidden      = ! txtPass.hidden;
  txtEml.hidden       = ! txtEml.hidden;
  btnCadastrar.hidden = ! btnCadastrar.hidden;

  // Altera o valor do botao entrar/enviar
  if ( txtEml.hidden == false ){
    btnSend.value = "Enviar reset de senha";
    btnForgot.value = "Voltar";
  } else {
    btnSend.value = "Entrar";
    btnForgot.value = "Esqueci a senha";
  }

}

function showPosition(position) {
  alert("Latitude: " + position.coords.latitude +
  "<br>Longitude: " + position.coords.longitude);
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

/*

function mudaCorFundo(corHexa){
  // muda a cor do background em tempo real
  document.body.style["background-color"] = corHexa;
  for (i=0; i<=5; i++){
      document.getElementsByTagName("input")[i].style.backgroundColor = corHexa;
  } // for
}

function mudaCorFonte(corHexa){
  // muda a cor do background em tempo real
  document.body.style["color"] = corHexa;
  for (i=0; i<=5; i++){
      document.getElementsByTagName("input")[i].style.color = corHexa;
      document.getElementsByTagName("input")[i].style.borderColor = corHexa;
  } // for
}
*/

function backgroundRandomNoLogin(maxInteger){
  let imgIndex = Math.floor(Math.random() * maxInteger + 1);
  //document.body.style['background-image'] = 'url("/img/cover/'+imgIndex+'.png")';
}

function showPage(pageName){
  // Show required page
  window.location.href = "/"+ pageName +".html";
}
