const express = require('express');
var bonjour = require('bonjour')()

let app = express();

let i = 100;
setInterval(() => {
	i--;
}, 4000)

app.get('/getReadings', (sol, res, next) => {

	let serial = "123456ABCD";

	res.json({
		level: i
	});
});

app.get('/getSerial', (sol, res, next) => {

	let serial = "123456ABCD";

	res.json({
		serial: serial
	});
});
 
// advertise an HTTP server on port 3000 
//bonjour.publish({ name: 'webserver', type: 'http', port: 3000 })
 
// browse for all http services 
bonjour.find({ type: 'http' }, function (service) {
  console.log('Found an HTTP server:', service)
})

var mdns = require('mdns');
 
// advertise a http server on port 4321 
var ad = mdns.createAdvertisement(mdns.tcp('http'), 4321);
ad.start();

var ads = mdns.createAdvertisement(mdns.tcp('http'), 4323);
ads.start();

app.listen(3000, () => console.log('servidor ejecutandose'));
