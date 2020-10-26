/*
Leonardo A Carrilho
2020, September
*/

function send(){
  //alert('oi mundo');
  // Check if fields are empty
  let txtId   = document.getElementById('txtId');
  let txtPass = document.getElementById('txtPass');
  let msg     = document.getElementById("span-msg");
  // Turn msg display off
  msg.style.display = "none";
  // validate
  if (! txtId.value){
    // ID
    msg.innerHTML = "Informe seu e-mail";
    msg.style.display = "block";
    document.getElementById('txtId').className = 'chacoalhaCampo';
  }else if (! txtPass.value){
    // Password
    msg.innerHTML = "Informe a senha";
    msg.style.display = "block";
    document.getElementById('txtPass').className = 'chacoalhaCampo';
  }else{
    // Prepara o envio dos dados ------------------------------------------------------------
    // Monta json
    myArr = '{"id":"'+txtId.value+'", "pass":"'+txtPass.value+'"}';
    // Envia
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.withCredentials = false;
    var url = "http://kd-vc.com:8000/contact/login";

    xmlhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        var jsonResponse = JSON.parse(this.responseText);
        //myFunction(myArr);
        //console.log(this.responseText);
        msg.innerHTML = jsonResponse.msg;
        msg.style.display = "block";
        }
    };

    xmlhttp.open("POST", url, true);
    //xmlhttp.setRequestHeader("Content-Type", "application/json");
    //xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.send(myArr);
  }
}//send

//https://javascript.info/xmlhttprequest
