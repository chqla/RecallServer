#!/bin/env node

var restify = require ('restify'),
	db = require ('./MyDb');

var my_db = new db ("127.0.0.1", 27017);
// console.log (my_db;)

function respond(req, res, next, obj) {
	  // TODO: receive record and save to database
	  req.on("data", function(data) {
	  	console.log (JSON.stringify(eval('('+data.toString()+')')));
	  	my_db.insert (JSON.stringify(eval('('+data.toString()+')')), function (err, str){
	  		res.send (str);
	  	});
	  });

	  req.on("exit", function(code){
	  	console.log ("req exit with code: " + code);
	  });

      
}


var server = restify.createServer();
server.post('/recall/v1/record', respond);

server.listen(8080, function() {
      console.log('%s listening at %s', server.name, server.url);
});

