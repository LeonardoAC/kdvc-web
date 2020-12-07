// Leonardo A Carrilho
// 2020, November 16
// Session handling

function checkSession(){
  let session = sessionStorage.getItem("sessid");
  //alert(session);
  if ( session ){
    return true;
    //alert(true);
  } else {
    return false;
    //alert(false);
  }
}

function deleteSession(){
  sessionStorage.removeItem("sessid");
  sessionStorage.clear();
  // refresh page
  //window.location.replace("/login.html");
}

if (checkSession() == false){
  // Nao possui sessao
  // Direciona para o login
  window.location.replace("/login.html");
}
