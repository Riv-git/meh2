let closeModal = document.querySelectorAll(".close")[0];
let openModal = document.querySelectorAll(".cta")[0];
let modal = document.querySelectorAll(".modal")[0];
let modalClose = document.querySelectorAll(".modal-container")[0];

openModal.addEventListener("click", function(e){
    e.preventDefault();
    modalClose.style.opacity = "1";
    modalClose.style.visibility =  "visible";
    modal.classList.toggle("modal-close");
});

closeModal.addEventListener("click", function(){
    modal.classList.toggle("modal-close");
    setTimeout(function(){
        modalClose.style.opacity = "0";
        modalClose.style.visibility = "hidden";
    },800)
});

window.addEventListener("click", function(e){
    console.log(e.target)
    if(e.target == modalClose){
        modal.classList.toggle("modal-close");
    setTimeout(function(){
            modalClose.style.opacity = "0";
            modalClose.style.visibility = "hidden";
    },900)  
    }
});

var x = document.getElementById("demo");
var y = document.getElementById("demo2");

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else { 
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  x.value = position.coords.latitude;
  y.value =  position.coords.longitude;
  
  document.getElementById("botonlocalizar").innerHTML="localizacion lista"

}



async function tryadsij() {
    var actividad = document.getElementsByClassName("Actividad");
    let i;
    let actividad_texto_instruccioon = '( "sdnl" ';
    console.log(document.getElementById("demo2").value);
    for (i = 0; i < actividad.length; i++) {
        if(actividad[i].checked == true){
  actividad_texto_instruccioon= actividad_texto_instruccioon +  ' OR  "' + actividad[i].value + '"  ' ;}
    }
    actividad_texto_instruccioon=actividad_texto_instruccioon + ")";
    actividad_texto_instruccioon=actividad_texto_instruccioon
    const res = await fetch('/',{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        ciudad: document.getElementById("ciudad").value,
        tiempo: document.getElementById("tiempo").value,
        fecha: document.getElementById("fecha").value,
        valor_minimo: document.getElementById("valorminimo").value,
        valor_maximo: document.getElementById("valormaximo").value,
        tiempo_maximo: document.getElementById("tiempo_maximo").value,
        tiempo_minimo: document.getElementById("tiempo_minimo").value,
        loca: document.getElementById("valormaximo").value,
        actividad: actividad_texto_instruccioon,
        latit: document.getElementById("demo").value,
        longi: document.getElementById("demo2").value

        
      })
      
     })
    const jso = await res.json();
    document.getElementById("texto").value=jso.user;
    console.log(jso.user);
  }