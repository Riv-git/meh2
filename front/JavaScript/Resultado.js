

function muestraMensaje() {
  var nombre=document.getElementById("Nombre");
  alert('Gracias por pinchar ' + nombre.value);
}
/* global callback */

function formadegeolocalizacionlat() {
  navigator.geolocation.getCurrentPosition(function(position) {
    let lat = position.coords.latitude;
    console.log(lat);
  
   

    
  });
}



window.onload=async function tryadsij() {
  
  let lat1=0;
  let long1=0;
  console.log(lat1);
  
  
  
  const res = await fetch('/Resultado',{
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      latitud: lat1,
      longitud: long1
    })
   })
  const jso = await res.json();
  
  
  for (let i of Object.keys(jso.results)){
    let tiempo_actividad=(jso.trafico[i].duration.value)/60 + jso.results[i].tiempo;
    let tiempo_max=jso.tiempomax;
    let clima_array=jso.answers_array;
    let wrong_translations='muy nuboso';
    
    if (tiempo_actividad<tiempo_max){
    
    var newdiv = document.createElement('div');
    newdiv.id='cuadro'+i;
    newdiv.classList="rectangle-1 wrap title-area";
    document.getElementById('posiblesrespuestas').appendChild(newdiv);

    var title = document.createElement('h1');
    title.classList="title";
    title.innerHTML=jso.results[i].nombreActividad;
   document.getElementById('cuadro'+i).appendChild(title);

   var local = document.createElement('h1');
    local.classList="place";
    local.innerHTML="Local "+jso.results[i].nombreLocal;
   document.getElementById('cuadro'+i).appendChild(local);

   var descripcion = document.createElement('h1');
    descripcion.classList="place";
    descripcion.innerHTML="Descripcion "+jso.results[i].descripcion;
   document.getElementById('cuadro'+i).appendChild(descripcion);

   var precio = document.createElement('h1');
    precio.classList="place";
    precio.innerHTML="Precio "+jso.results[i].precio;
   document.getElementById('cuadro'+i).appendChild(precio);


   if (wrong_translations.localeCompare(clima_array[i])){
      clima_array[i]='muy nubloso';
   }

   var clima = document.createElement('h1');
    clima.classList="place";
    clima.innerHTML="clima "+clima_array[i];
   document.getElementById('cuadro'+i).appendChild(clima);

   var distancia = document.createElement('h1');
    distancia.classList="place";
    distancia.innerHTML="distancia "+jso.distancia[i].distance.text;
   document.getElementById('cuadro'+i).appendChild(distancia);

   var trafico = document.createElement('h1');
   trafico.classList="place";
   trafico.innerHTML="trafico "+jso.trafico[i].duration.text;
   document.getElementById('cuadro'+i).appendChild(trafico);


    }


   } 
   
  
  
  
  
  
}








