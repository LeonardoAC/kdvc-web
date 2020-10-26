/*
Leonardo A Carrilho
2020, September
*/

function inputShowHideLogin(){
  // Show or hide e-mail field on login screen
  let txtId         = document.getElementById('txtId');
  let txtPass       = document.getElementById('txtPass');
  let txtEml        = document.getElementById('txtEml');
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
  }else{
    btnSend.value = "Entrar";
    btnForgot.value = "Esqueci a senha";
  }

}

function mudaFonte(num){
  switch (num) {
    case 1:
        // altera o estilo da font no body
        //document.body.style["background-color"] = "yellow";
        document.body.style["font-family"] = "josefinsans";
      break;

      case 2:
        // altera o estilo da font no body
        document.body.style["font-family"] = "leaguegothic";
      break;

      case 3:
        // altera o estilo da font no body
        document.body.style["font-family"] = "roboto";
      break;
  }
}


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
