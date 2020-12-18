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
  jsonToSend = '{"sessid":"'+ sessionStorage.getItem("sessid") +'", "msg":"", "data": {'+ parteDoJson +'} }';
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

function send(method, route, pageOk, fallbackPage, formName, getArguments){
  // Setting up vars
  let xmlhttp = new XMLHttpRequest();
  let arrSendParams = [];
  // Feedback to user
  let statusMsg = document.getElementById("span-msg");
  statusMsg.style.display = "none";

  xmlhttp.withCredentials = false;
  /*  <>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
      NAO ESQUECER DE FAZER A

      VERIFICACAO

      DOS CAMPOS VAZIOS !

  <><<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<  */
  //if (sendData != "required fields are empty"){ //
  //console.log("Antes do switch: URL= " + arrSendParams['url'] + " | data= " + arrSendParams['data']);
  if (method == "POST"){
      ////// VERIFICAR SE FORM RETORNA EMPTY - CRIAR IF AQUI
      arrSendParams['url'] = "https://kd-vc.com:8000/" + route;
      arrSendParams['data'] = recuperaValorDosCamposPeloNomeDoFormRetornaJson(formName);
      //console.log("saindo POST: URL= "+ arrSendParams['url'] + " | data= " + arrSendParams['data']);
  } else if (method == "GET"){
      arrSendParams['url']  = "https://kd-vc.com:8000/" + route + "?id=" + getArguments + "&sess=" + sessionStorage.getItem("sessid");
      arrSendParams['data'] = "";
      //console.log("saindo GET URL= " + arrSendParams['url'] + " | data= " + arrSendParams['data']);
  }else{
    console.log("Method unknown");
  }
    xmlhttp.onreadystatechange = function() {

      if (this.readyState == 4 && this.status == 200) {
      // Reponse from server
          let jsonResponse = JSON.parse(this.responseText);
          console.log(jsonResponse); // debug
          // Store session ID
          sessionStorage.setItem("sessid", jsonResponse.sessid);
          // Store the data
          sessionStorage.setItem("tudo", this.responseText);
          //var arr = JSON.stringify(jsonResponse.data);
          //sessionStorage.setItem("data", arr);
          // Message to user
          statusMsg.innerHTML = jsonResponse.msg;
          statusMsg.style.display = "block";
          if (sessionStorage["sessid"].length == 32){
            // Go to page
            window.location.href = "/" + pageOk + ".html";
          }
          else{
            // fallback page
            window.location.href = "/" + fallbackPage + ".html";
          } // if location
        } // readyState
    } // xmlhttp
    url = arrSendParams['url'];
    sendParams = arrSendParams['data'];
    //console.log("utlimo URL= " + url + " | data= " + sendParams);
    xmlhttp.open(method, url, true);
    xmlhttp.setRequestHeader("Content-Type", "application/json");
    //xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.send(sendParams);
  //} // if main
} // function send

//https://javascript.info/xmlhttprequest
