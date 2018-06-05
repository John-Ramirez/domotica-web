var request = require('request');

request(
	'http://ip172-18-0-54-bcbcl70qr90000af6d80-8123.direct.labs.play-with-docker.com:8123/recibir', 
	function (error, response, body
		) 
	{
  console.log('error:', error); 
  console.log('statusCode:', response && response.statusCode); 
  console.log('body:', body);
  var datos = JSON.parse(body);
  console.log(datos[0].temperatura);
  console.log(datos[0].fotoresistor);
  console.log(datos[0].pir);
});