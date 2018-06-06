var express = require('express');
var app = express();
var request = require('request');
var io = require('socket.io')(app.listen(8081));

app.use(express.static(__dirname + '/app'));

app.get('/', function (req,res) { 
  res.sendFile(__dirname + '/index.html');
});


var url = 'http://ip172-18-0-11-bcc4nn0qr90000c94amg-8123.direct.labs.play-with-docker.com';
var temp = 0;
var foto = 0;
var pir = 0;


function recibirDomotica(){
  request(url+':8123/recibir', function (error, response, body)
  {
    var datos = JSON.parse(body);
    temp = datos[0].temperatura;
    foto = datos[0].fotoresistor;
    pir = datos[0].pir;

    io.emit('temperatura', temp);
    io.emit('fotoresistor', foto);
    io.emit('pir', pir);
  });
}



function ejecutarQuerry(columna, valor){
  request.post(url+':8123/estado?columna='+columna+'&valor='+valor+'', { json: { } }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
              console.log(body)
            }
        }
    );
}



function escribirLcd(textoUno, textoDos){
  request.post(url+':8123/elcd?textouno='+textoUno+'&textodos='+textoDos+'', { json: { } }, function (error, response, body) {
            if (!error && response.statusCode == 200) {
              console.log(body)
            }
        }
    );
}



io.on('connection', function (socket) {


  socket.on('ventiladorOff', function (){
    ejecutarQuerry('motor','off');    
  });
  socket.on('ventiladorOn', function (){
    ejecutarQuerry('motor','on');    
  });




  socket.on('ServoUnoOff', function (){
    ejecutarQuerry('servouno','off');   
  });
  socket.on('ServoUnoOn', function (){
    ejecutarQuerry('servouno','on');    
  });




  socket.on('ServoDosOff', function (){
    ejecutarQuerry('servodos','off');    
  });
  socket.on('ServoDosOn', function (){
    ejecutarQuerry('servodos','on');    
  });




  socket.on('ledOff', function (){
    ejecutarQuerry('led','off');   
  });
  socket.on('ledOn', function (){
    ejecutarQuerry('led','on');    
  });




  socket.on('textoLcd', function (data) {
    escribirLcd(data.textoUno, data.textoDos);
  });




});

setInterval(recibirDomotica,3000);

console.log("servidor corriendo en el puerto 8081");