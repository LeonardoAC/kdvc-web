/*
Leonardo A Carrilho
2020, September
*/

function chacoalhaIluminaCampoVazio(camposVazios){
  // Check if fields are empty
  let statusMsg = document.getElementById("span-msg");
  // Turn msg display off
  statusMsg.style.display = "none";
  // validate
    // ID
    statusMsg.innerHTML = "Informe o(a) "+camposVazios[0];
    statusMsg.style.display = "block";
    document.getElementById(camposVazios[0]).focus();
    document.getElementById(camposVazios[0]).className = 'chacoalhaCampo';
    //console.log("Campos vazios: "+camposVazios);
}

function criaJson(parteDoJson){
  // Create a Json structure
  jsonToSend = '{"sessid":"", "msg":"", "data": {'+ parteDoJson +'} }';
  return jsonToSend;
}

function recuperaValorDosCamposPeloNomeDoFormRetornaJson(formName){
  // Varre todos os inputs do Form e retorna os valores
  let elements = document.getElementById(formName).elements;
  let parteDoJson = "";
  let arrCamposPreenchidosChaveValor = [];
  let arrCampoObrigatorioEstaVazio = [];

  //console.log("Qtde de campos "+elements.length);
  for (i=0; i<elements.length; i++){
    if (elements[i].type !== "button"){
      if (elements[i].required && elements[i].value == ""){
        // Achou um campo obrigatorio que está vazio
        // Armazena os campos vazios
        arrCampoObrigatorioEstaVazio.push(elements[i].id);
      } else {
        // armazena id e valor no array (chave,valor) - será o Json em breve
        arrCamposPreenchidosChaveValor.push([elements[i].id, elements[i].value]);
      }//else`
    } // if main
  } //for

  if (arrCampoObrigatorioEstaVazio.length == 0){ // Nao há campos vazios
    // monta o json a partir do array
    for (i=0; i < arrCamposPreenchidosChaveValor.length; i++){
      parteDoJson += '"'+ arrCamposPreenchidosChaveValor[i][0] +'":"'+ arrCamposPreenchidosChaveValor[i][1] +'"';
      if (i < arrCamposPreenchidosChaveValor.length-1){
        // poe a virgula no fim da string - evita colocar a ultima virgula
        parteDoJson += ",";
      }
    }// for
    //console.log("linha antes do return "+criaJson(parteDoJson));
    return criaJson(parteDoJson);
  } else {
    // Avisa ao user que há campos vazios (campos obrigatorios)
    chacoalhaIluminaCampoVazio(arrCampoObrigatorioEstaVazio);
    return "required fields are empty";
  }//else`
} // recuperaValorDosCamposPeloNomeDoFormRetornaJson

function send(method, route, page, formName, getArguments){
  // Setting up vars
  let xmlhttp = new XMLHttpRequest();
  let url = "http://kd-vc.com:8000/"+route;
  // Feedback to user
  let statusMsg = document.getElementById("span-msg");
  statusMsg.style.display = "none";

  xmlhttp.withCredentials = false;
  //if (sendData != "required fields are empty"){ //
    xmlhttp.onreadystatechange = function() {
      switch (method) {
        case "POST":
          sendData = recuperaValorDosCamposPeloNomeDoFormRetornaJson(formName);
          if (sendData == "required fields are empty"){
              break; // Abort the sending
          }
          break;
        case "GET":
          if (! getArguments){
              break; // Abort the sending
          } else {
            sendData = url + "?" + getArguments;
            break;
          }
        default:
          alert("Method note selected");
      } // switch
      if (this.readyState == 4 && this.status == 200) {
      // Reponse from server
          let jsonResponse = JSON.parse(this.responseText);
          console.log(jsonResponse); // debug
          // Store session ID
          sessionStorage.setItem("sessid", jsonResponse.sessid);
          // Message to user
          statusMsg.innerHTML = jsonResponse.msg;
          statusMsg.style.display = "block";
          if (sessionStorage["sessid"].length == 32){
            // Go to page
            window.location.href = "/" + page + ".html";
          } // if location
        } // readyState
    } // xmlhttp
    xmlhttp.open(method, url, true);
    //xmlhttp.setRequestHeader("Content-Type", "application/json");
    //xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.send(sendData);
  //} // if main
} // function send

//https://javascript.info/xmlhttprequest
