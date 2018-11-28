// Initialition of libraries
var http = require('http');
var querystring = require('querystring');
var request = require('request');
var url = require("url");
var express = require('express');
var app = express();
var httpServer = http.createServer(app);
var crypto = require('crypto');


console.log('Starting');

//Seting Endpoints(/redirect,serivice)

app.get('/test_endpoint', function(req,res){

console.log('testing success');
res.sendfile('public/index.html'); //respond html file

});

app.get('/service', function (req, res) {
	
    // parse parameters from querry sring
	
    
    
    var urlObj = url.parse(req.url, true);
	var fn = urlObj['query']['fn'];
	var ln = urlObj['query']['ln'];
	var email  = urlObj['query']['email'];
	
	
	
	
	//get access_token
	

	var AuthBody={
    grant_type: 'password',
    client_id: 'sso',
    client_secret: 'hsdgsgdhsjhdjsd',
	scope: 'api',
    username: 'my_username',
	password:'my_password'
};
	
//	var bdq=querystring.stringify(bd);
	
	
	
// Making API Request
	
	request({
  uri: "https://demo.com/oauth2/token",
  method: "POST",
  headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
      },
	  body:AuthBody
}, function(error1, resp1, body1) {
	
	
	  	
	var gat=JSON.parse(body1); //parse body in json
	var access_token=gat.access_token;
	console.log(access_token);
	
	
		var auth="Bearer "+access_token;
	


		
		
           request({
            uri: "https://demo.com/search/user?search_text="+email,
            method: "GET",
            headers: {
            'Content-Type': 'application/json',
			'Authorization': auth
            }

			
			        }, function(err2, resp2, body2) {
	               
				   var bd2= JSON.parse(body2);
				   var count=bd2.data.count; //Find Some Key Value Form Response
					 
					 
				  
				});

  
    });
	

	
});
app.listen(3000); //Listen Port Number
