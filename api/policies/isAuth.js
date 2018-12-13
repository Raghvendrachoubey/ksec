var jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
	//res.header('Access-Control-Allow-Origin', 'http://10.10.7.220:8002');
	//res.header('pratik', 'http://10.240.21.21:8002');
	//console.log(req.get('host'),"host",req.header('Referer'),"ref");
	//console.log();
  var bearerToken;
  var bearerHeader = req.headers["authorization"];
  ///if('http://'+req.get('host')+"/")
	//if(req.header('Referer').includes(req.get('host'))) 
	{
	  if (typeof bearerHeader !== 'undefined') {
		//console.log(bearerHeader,'bearerHeader');
		var bearer = bearerHeader.split(" ");
		//console.log(bearer);
		bearerToken = bearer[1];

		// if (bearer[0] !== "Bearer") {
		//   return res.forbidden("bearer not understood");
		// }

		//console.log(bearerToken,"mytoken");
		//verify if this token was from us or not
		jwt.verify(bearerHeader, "ExPo", function (err, decoded) {
		  if (err) {
			//sails.log("verification error", err);
			if (err.name === "TokenExpiredError")
			  return res.forbidden("Session timed out, please login again");
			else
			  return res.forbidden("Error authenticating, please login again");
		  }
		  //console.log(decoded['DOMAIN LOGIN ID'],"client id");
		  //var memcache = require('memcache');
			//port=env2.MEMCACHE_PORT;
			//host=env2.MEMCACHE_HOST;
			//console.log(env2);
			/*var client = new memcache.Client(port, host);
			client.port = port;
			client.host = host;
			client.on('connect', function(){
				
			});
			client.connect(function( err, conn ){
			  if( err ) {
				 console.log( err );
			  }
			  console.log(conn);
			});
			client.get('key', function(error, result){
				uid=result;
				
				console.log(uid,"client id");
				
				if (error) return res.serverError(err);

				if (!result) return res.serverError("User not found");
				if(uid==decoded['DOMAIN LOGIN ID']) { 
					req.user = decoded;
					next();
				}
				else
					return res.serverError("User not found");
				//console.log(decoded);
				//req.user = user;
				
				
			});
			client.close();*/
			
			// console.log(req.session.userId);
			// console.log(req.session);
			if(!req.session.userId)
				return res.forbidden("User not found");
			var uid = req.session.userId;
			var decodedtext=decoded['email'];
			uid=uid.toLowerCase();
			decodedtext=decodedtext.toLowerCase();
			// console.log(uid,decodedtext);
			if(uid!=decodedtext) { 
				return res.forbidden("User not found");
			}
			
			if(uid==decodedtext) {
				req.user = decoded;
				next();
			}
			/*
		  Usermasterad.findOne({'DOMAIN LOGIN ID':decoded['DOMAIN LOGIN ID']}).exec(function callback(error, user) {
			if (error) return res.serverError(err);

			if (!user) return res.serverError("User not found");
			//console.log(decoded);
			req.user = user;
			next();
		  });*/

		});

	  } 
	  else {
		return res.forbidden("No token provided");
	  }
	}
	/*else {
		return res.forbidden("No token provided");
	}*/
};