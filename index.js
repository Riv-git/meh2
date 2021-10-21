const express = require ('express');
const app = express ();
const pool = require('./config_database.js');
app.use(express.static(__dirname + '/front'));
var path = require('path');
const bodyParser = require("body-parser");
const { send } = require('process');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const recipes_finder = require ('./filetransfer123');
var distance = require('distance-matrix-api');
var weather = require('openweather-apis');
const link = "https://api.openweathermap.org/data/2.5/weather?";
distance.key('AlphaDMAufq2jjuOxPF3pTGC4JA8fmoNzYiacAjP');
const appid='d7b7e5b12928806a189cffd3df38513d';
weather.setAPPID(appid);
weather.setLang('co');








// ./ for same level archive


app.post('/', (req,res)=>{
    let ciudad = pool.escape(req.body.ciudad);
    ciudad=ciudad.toString();
    
    

  
    

    let fecha = pool.escape(req.body.fecha );
    fecha=fecha.toString();
    let int_fecha=parseInt(fecha, 10);

    let valor_minimo = pool.escape(req.body.valor_minimo);
    valor_minimo=valor_minimo.toString();
    valor_minimo=valor_minimo.replace("'","");
    valor_minimo=valor_minimo.replace("'","");
    let int_valor_minimo=parseInt(valor_minimo, 10);    
    

    


    let valor_maximo = pool.escape(req.body.valor_maximo );
    valor_maximo=valor_maximo.toString();
    valor_maximo=valor_maximo.replace("'","");
    valor_maximo=valor_maximo.replace("'","");
    let int_valor_maximo=parseInt(valor_maximo, 10);    
    
    
    let tiempo_maximo = pool.escape(req.body.tiempo_maximo );
    tiempo_maximo=tiempo_maximo.toString();
    tiempo_maximo=tiempo_maximo.replace("'","");
    tiempo_maximo=tiempo_maximo.replace("'","");
    let int_tiempo_maximo=parseInt(tiempo_maximo, 10);  
   

    let tiempo_minimo = pool.escape(req.body.tiempo_minimo );
    tiempo_minimo=tiempo_minimo.toString();
    tiempo_minimo=tiempo_minimo.replace("'","");
    tiempo_minimo=tiempo_minimo.replace("'","");
    let int_tiempo_minimo=parseInt(tiempo_minimo, 10); 
    

    let actividad = pool.escape(req.body.actividad );
    actividad=actividad.toString();
    actividad=actividad.replace("'(", "(");
    actividad=actividad.replace(")'", ")");
    actividad=actividad.replace(/\\"/g, "'");
   
    let localizacion1= req.body.latit;
    let localizacion2= req.body.longi;
    

    
    



    
    let possibleinstruction = "SELECT a.nombreActividad, l.nombreLocal, a.descripcion, a.precio, a.tiempo, l.localizacion FROM actividad a left join local l on l.idlocal=a.idLocal left join ciudad c on c.idCiudad=l.idCiudad WHERE a.precio<="+int_valor_maximo+" and a.precio>="+ int_valor_minimo +" and a.tiempo<="+int_tiempo_maximo+" and a.tiempo>="+int_tiempo_minimo + " and a.tipoActividad="+actividad+" AND c.nombre = "+ ciudad + " ORDER BY a.precio desc" ;
    
    req.app.set('tiempo', int_tiempo_maximo)
    req.app.set('answer', possibleinstruction.toString())
    req.app.set('localizacion1', localizacion1)
    req.app.set('localizacion2', localizacion2)
    return res.redirect('/Resultado');
    

         
});
app.use('/t', recipes_finder);

app.post('/Resultado', (req,res)=>{  
    let resultadosdelarespuesta = req.app.get('answer')
    let location1= req.app.get('localizacion1')
    let location2 = req.app.get('localizacion2')
    let tiempomax = req.app.get('tiempo')
    let int_location1=parseFloat(location1, 10);
    let int_location2=parseFloat(location2, 10);
    
    var origins = [location1 + ','+ location2];
    
    console.log(origins);
    var destinations = ['0,0'];
    let distancia = ['0km'];
    let trafico = ['0.1 min'];
    
    pool.query(resultadosdelarespuesta,
        function (error, results, fields) {
       if (error) throw error;
       const location_array=[location1];
       
        let destinations2=['0,0'];
        let latitude=[];
        let longitude=[];
        let locations = ['51.5085, -0.1257', '4.910263401,71.209187'];
        for (let i of Object.keys(results)){
            destinations2[i]=results[i].localizacion;
            locations[i]=results[i].localizacion;
        }
        let answers_array=[];
        let m=-1;
        console.log(locations);

        distance.matrix(origins, destinations2, function (err, distances) {
          if (!err)
          for (let i = 0; i < locations.length; i++){
            locations[i]=locations[i].split(',');
            latitude[i]=locations[i][0];
            longitude[i]=locations[i][1];
            latitude[i]=parseFloat( latitude[i]);
            longitude[i]=parseFloat(longitude[i]);
            weather.setCoordinate(latitude[i], longitude[i]);
            weather.getDescription(function(err, desc){
                answers_array[i]=desc;
                
                
                if (i===locations.length-1){
                    distancia= distances.rows[0].elements ;
                    trafico=distances.rows[0].elements;
                    res.json({results,distancia,trafico, tiempomax, answers_array});
                }   
            });
            m++;
        }
            
        })
       
       
    });  
       console.log(req.body.latitud); 
       console.log(req.body.longitud); 
    

    
});




const port_number = process.env.port || 3000; 

app.listen(port_number, function(){
    console.log('Possible instructions/message while listening to ' + port_number+ '');
});