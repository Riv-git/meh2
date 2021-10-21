const { response } = require("express");

function muestraMensaje() {
  var nombre=document.getElementById("Nombre");
  alert('Gracias por pinchar ' + nombre.value);
}
/* global callback */



async function tryadsij() {
  const res = await fetch('/',{
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      name: document.getElementById("Nombre").value
    })
   })
  const jso = await res.json();
  document.getElementById("Nombre").value=jso.user;
  console.log(jso);
}








