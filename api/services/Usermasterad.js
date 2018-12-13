var schema = new Schema({
    "Mobile Number": {
        type: String,
    },
    "Email Address": {
        type: String,
    },
    "LOB name": {
        type: String,
	},
    Gender: {
        type: String,
    },
    State: {
        type: String,
        default: ""
    },
    "Employee ID": {
        type: String,
    },
    "Employee Name": {
        type: String,
    },
    "LOC Code": {
        type: String,
    },
    "Function": {
        type: String,
    },
    "New Role": {
        type: String,
    },
    "Supervisor Number": {
        type: String,
    },
	"DOMAIN LOGIN ID": {
        type: String,
    },
	"LOB Code": {
        type: String,
    },
	"CC" :{
		type:String
	},
	"PCITY":{
		type:String
	},
	'Business Segment' :{
		type:String
	},
	'Division' :{
		type:String
	},
	MyTeam:{
		type:Array
	},
	domain_id: [
	{
		type:String,
		ref:'Users',
	}
	]
});

var Users = new Schema ({
	domain_id: [{
		type:String,
		ref:"Usersmaster_ad"
	}],
	user_type:{
		type:String
	},
	user_role:{
		type:String
	}
});
//module.exports = mongoose.model('Users', schema,'Users');
var userlogschema = new Schema({
    id: {
        type: Number,
        required: true,
    },
    user: {
        type: String,
        required: true,
    },
    login_date: {
        type: Date,
    },
    logout_date: {
        type: Date,
    },
    ip_address: {
        type: String,
    },
	
});

schema.plugin(deepPopulate, {
    /*populate: {
        'Users': {
            select: 'user_type user_role'
        }
    }*/
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);
//userlogschema.plugin(uniqueValidator);
//userlogschema.plugin(timestamps);
//userlogschema = require('userlogschema');

var PythonShell = require('python-shell');
var pythonpath = "http://104.46.103.162:8001/script/";
//var pythonpath = "http://localhost:8096/script/";
module.exports = mongoose.model('Usermasterad', schema,'usersmaster_ad');
//var chatbot_user_logs = mongoose.model('chatbot_user_logs', userlogschema,"chatbot_user_logs");
var CryptoJS = require("crypto-js");
var exports = _.cloneDeep(require("sails-wohlig-service")(schema));

		
var CryptoJSAesJson = {
	stringify: function (cipherParams) {
		var j = {ct: cipherParams.ciphertext.toString(CryptoJS.enc.Base64)};
		if (cipherParams.iv) j.iv = cipherParams.iv.toString();
		if (cipherParams.salt) j.s = cipherParams.salt.toString();
		return JSON.stringify(j);
	},
	parse: function (jsonStr) {
		var j = JSON.parse(jsonStr);
		var cipherParams = CryptoJS.lib.CipherParams.create({ciphertext: CryptoJS.enc.Base64.parse(j.ct)});
		if (j.iv) cipherParams.iv = CryptoJS.enc.Hex.parse(j.iv)
		if (j.s) cipherParams.salt = CryptoJS.enc.Hex.parse(j.s)
		return cipherParams;
	}
};
//console.log(username);

var model = {
    loginuser: function (reqobj,ccdata, callback) {
		var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
		//username=Base64.decode(ccdata.uuid);
		if(!ccdata.uuid || ccdata.uuid == '') {
			callback({
				message: "-1"
			}, null);
		}
		else {
			var data = {};
			data.uid="";
			var uuid=CryptoJS.AES.decrypt((ccdata.uuid),env2.UID_KEY).toString(CryptoJS.enc.Utf8);
			data.uid =uuid;
			/*var data={};
			//console.log("data", data);
			var memcache = require('memcache');
			port=env2.MEMCACHE_PORT;
			host=env2.MEMCACHE_HOST;
			//console.log("data", env2);
			var client = new memcache.Client(port, host);
			client.port = port;
			client.host = host;
			client.on('connect', function(){
				// no arguments - we've connected
				
			});

			client.on('close', function(){
				// no arguments - connection has been closed
			});

			client.on('timeout', function(){
				// no arguments - socket timed out
			});

			client.on('error', function(e){
				// there was an error - exception is 1st argument
			});
			client.connect();
			client.get('key', function(error, result){
				data.uid=result;
				//console.log(result);
				// all of the callbacks have two arguments.
				// 'result' may contain things which aren't great, but
				// aren't really errors, like 'NOT_STORED'
				if(result) {
					Usermasterad.findOne({
						"DOMAIN LOGIN ID": {$regex:".*"+data.uid+".*",$options:"i"}
					}).deepPopulate("Users.user_type").limit(1).exec(function (err, found) {
						if (err) {
							callback(err, null);
						} 
						else {
							if (found) {
								var ip = require('ip');
								var jwt = require("jsonwebtoken");
								found = found.toObject();
								found.curtime=Date.now();
								var token = jwt.sign(found, "ExPo", {
									expiresIn: '8h'
								});
								found.token=token;
								var ip_address = ip.address("public","ipv4");
								var userLogs = require("./Chatbotuserlogs");
								var sessiondata = userLogs({userid:data.uid,user:found._id,login_date:(new Date()),token:token,ip_address:ip_address,logout_date:new Date()});
								sessiondata.save(function (err,result) {
									if (err) {
											return err;
									}
									else {
										// found2 = {};
										
										// found2 = found;
										// found2.sessionid = result._id;
										var Loc = require("./Loc");
										var loccode=parseInt(found['LOC Code']);
										console.log(loccode);
										loccode=loccode.toString();
										if(loccode.charAt[0]=='0')
											loccode=loccode.substring(1);
										Loc.findOne({
											id: loccode,
										}).limit(1).exec(function (locerr, locfound) {
											
											if(locfound)
											{
												if(locfound['text']=='nan')
													found.branchname="NA";
												found.branchname=locfound['text'];
											}
											if(!found.branchname)
												found.branchname="NA";
											
											var users = require("./Users");
											users.findOne({
												domain_id: {$regex:".*"+data.uid+".*",$options:"i"},
											}).limit(1).exec(function (err, found2) {
												if(found2)
												{
													userLogs.count({
														user:found._id
													}, function(err11, c) {
														if(err11)
														{
															callback(err11,null);
														}
														if(c) {
															//found = found.toObject();
															var r = result.toObject();
															found.sessionid = r._id;
															found.user_type=found2.user_type;
															found.user_role=found2.user_role;
															if(found2.live_chat)
																found.live_chat=found2.live_chat;
															found.logincount = c;
															var dept = require("./Deptroles");
															dept.find({
																roles: found['New Role'],
															}).exec(function (err3, deptdata) {
																if(err3)
																{
																	callback(null, found);
																}
																if(deptdata)
																{
																	var depts="";
																	for(var i = 0 ; i <= deptdata.length-1 ; i++)
																	{
																		if(i==0)
																			depts=deptdata[i].dept_name;
																		else 
																			depts=depts+","+deptdata[i].dept_name;
																	}
																	found.department=depts;
																	callback(null, found);
																}
																else {
																	callback(null, found);
																}
															});
														}
														
														//found['user_type']=found2.user_type;
														//found['user_role']=found2.user_role;
														
													});
												}
												else
												{
													var dept = require("./Deptroles");
													dept.find({
														roles: found['New Role'],
													}).exec(function (err3, deptdata) {
														if(err3)
														{
															callback(null, found);
														}
														if(deptdata)
														{
															var depts="";
															for(var i = 0 ; i <= deptdata.length-1 ; i++)
															{
																if(i==0)
																	depts=deptdata[i].dept_name;
																else 
																	depts=depts+","+deptdata[i].dept_name;
															}
															found.department=depts;
															callback(null, found);
														}
														else
															callback(null, found);
													});
													//callback(null, found);
												}
													
											});		
										});
									}
								});
								
								
							} else {
								callback({
									message: "-1"
								}, null);
							}
						}

					});
				
				}
				else {
					callback({
						message: "-1"
					}, null);
				}*/
			Usermasterad.findOne({
				"DOMAIN LOGIN ID": {$regex:".*"+data.uid+".*",$options:"i"}
			}).limit(1).exec(function (err, found) {
				if (err) {
					callback(err, null);
				} 
				else {
					if (found) {
						var ip = require('ip');
						var jwt = require("jsonwebtoken");
						found = found.toObject();
						var abc = {"DOMAIN LOGIN ID":data.uid};
						abc.curtime=Date.now();
						found.curtime=abc.curtime;
						var token = jwt.sign(found, "ExPo", {
							expiresIn: '8h'
						});
						found.token=token;
						var ip_address = ip.address("public","ipv4");
						var userLogs = require("./Chatbotuserlogs");
						var sessiondata = userLogs({userid:data.uid,user:found._id,login_date:(new Date()),token:token,ip_address:ip_address,logout_date:new Date()});
						sessiondata.save(function (err,result) {
							if (err) {
									return err;
							}
							else {
								// found2 = {};
								
								// found2 = found;
								// found2.sessionid = result._id;
								reqobj.session.userId=data.uid;
								var Loc = require("./Loc");
								var loccode=parseInt(found['LOC Code']);
								//console.log(loccode);
								loccode=loccode.toString();
								if(loccode.charAt[0]=='0')
									loccode=loccode.substring(1);
								Loc.findOne({
									id: loccode,
								}).limit(1).exec(function (locerr, locfound) {
									
									if(locfound)
									{
										if(locfound['text']=='nan')
											found.branchname="NA";
										found.branchname=locfound['text'];
									}
									if(!found.branchname)
										found.branchname="NA";
									
									var users = require("./Users");
									users.findOne({
										domain_id: {$regex:".*"+data.uid+".*",$options:"i"},
									}).limit(1).exec(function (err, found2) {
										if(found2)
										{
											userLogs.count({
												userid:data.uid
											}, function(err11, c) {
												if(err11)
												{
													callback(err11,null);
												}
												else {
													//found = found.toObject();
													var r = result.toObject();
													found.sessionid = r._id;
													found.user_type=found2.user_type;
													found.user_role=found2.user_role;
													if(found2.live_chat)
														found.live_chat=found2.live_chat;
													found.logincount = c;
													var dept = require("./Deptroles");
													dept.find({
														roles: found['New Role'],
													}).exec(function (err3, deptdata) {
														if(err3)
														{
															callback(null, found);
														}
														if(deptdata)
														{
															var depts="";
															for(var i = 0 ; i <= deptdata.length-1 ; i++)
															{
																if(i==0)
																	depts=deptdata[i].dept_name;
																else 
																	depts=depts+","+deptdata[i].dept_name;
															}
															found.department=depts;
															callback(null, found);
														}
														else {
															callback(null, found);
														}
													});
												}
												
												//found['user_type']=found2.user_type;
												//found['user_role']=found2.user_role;
												
											});
										}
										else
										{
											var dept = require("./Deptroles");
											dept.find({
												roles: found['New Role'],
											}).exec(function (err3, deptdata) {
												if(err3)
												{
													callback(null, found);
												}
												if(deptdata)
												{
													var depts="";
													for(var i = 0 ; i <= deptdata.length-1 ; i++)
													{
														if(i==0)
															depts=deptdata[i].dept_name;
														else 
															depts=depts+","+deptdata[i].dept_name;
													}
													found.department=depts;
													callback(null, found);
												}
												else
													callback(null, found);
											});
											//callback(null, found);
										}
											
									});		
								});
							}
						});
						
						
					} else {
						callback({
							message: "-1"
						}, null);
					}
				}

			});
		}
    },
	getsessiondata: function (reqobj,ccdata, callback) {
		var jwt = require("jsonwebtoken");
		var decoded = jwt.decode(ccdata.data);
		if(decoded) {
			//callback(null, decoded);
			var found = {};
			found.username = decoded.username;
			found.email = decoded.email;
			
			var Chatbotuserlogs = require("./Chatbotuserlogs");
			found.FRONTEND_ENC_KEY=env2.FRONTEND_ENC_KEY;
			found.BACKEND_API_KEY=env2.BACKEND_API_KEY;
			found.B_TOKEN_KEY=env2.B_TOKEN_KEY;
			Chatbotuserlogs.findOne({
				token:ccdata.data,
				//user:data.user
			}).sort({createdAt: -1}).exec(function (err, result) {
				if (err) {
					//console.log("err",err);
					callback(err, null);
				} 
				else {
					var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(found), "58e7054c20c23efd03373efd0337").toString();
					callback(null, ciphertext);
					
				}
			});
			// Usermasterad.findOne({
			// 	"DOMAIN LOGIN ID": {$regex:".*"+decoded['DOMAIN LOGIN ID']+".*",$options:"i"}
			// }).limit(1).exec(function (err, found) {
			// 	if (err) {
			// 		callback(err, null);
			// 	} 
			// 	else {
			// 		if (found) {
						
			// 			var ip = require('ip');
			// 			var jwt = require("jsonwebtoken");
			// 			found = found.toObject();
			// 			found.curtime=Date.now();
			// 			var Chatbotuserlogs = require("./Chatbotuserlogs");
			// 			found.FRONTEND_ENC_KEY=env2.FRONTEND_ENC_KEY;
			// 			found.BACKEND_API_KEY=env2.BACKEND_API_KEY;
			// 			found.B_TOKEN_KEY=env2.B_TOKEN_KEY;
			// 			Chatbotuserlogs.findOne({
			// 				token:ccdata.data,
			// 				//user:data.user
			// 			}).sort({createdAt: -1}).exec(function (err, result) {
			// 				if (err) {
			// 					//console.log("err",err);
			// 					callback(err, null);
			// 				} 
			// 				else {
			// 					// found2 = {};
								
			// 					// found2 = found;
			// 					// found2.sessionid = result._id;
								
			// 					var Loc = require("./Loc");
			// 					var loccode=parseInt(found['LOC Code']);
			// 					//console.log(loccode);
			// 					loccode=loccode.toString();
			// 					if(loccode.charAt[0]=='0')
			// 						loccode=loccode.substring(1);
			// 					Loc.findOne({
			// 						id: loccode,
			// 					}).limit(1).exec(function (locerr, locfound) {
									
			// 						if(locfound)
			// 						{
			// 							if(locfound['text']=='nan')
			// 								found.branchname="NA";
			// 							found.branchname=locfound['text'];
			// 						}
			// 						if(!found.branchname)
			// 							found.branchname="NA";
									
			// 						var users = require("./Users");
			// 						users.findOne({
			// 							domain_id: decoded['DOMAIN LOGIN ID'],
			// 						}).limit(1).exec(function (err, found2) {
			// 							if(found2)
			// 							{
			// 								Chatbotuserlogs.count({
			// 									userid:decoded['DOMAIN LOGIN ID']
			// 								}, function(err11, c) {
			// 									if(err11)
			// 									{
			// 										callback(err11,null);
			// 									}
			// 									else {
			// 										//found = found.toObject();
			// 										var r = result.toObject();
			// 										found.sessionid = r._id;
			// 										found.user_type=found2.user_type;
			// 										found.user_role=found2.user_role;
			// 										if(found2.live_chat)
			// 											found.live_chat=found2.live_chat;
			// 										found.logincount = c;
			// 										var dept = require("./Deptroles");
			// 										dept.find({
			// 											roles: found['New Role'],
			// 										}).exec(function (err3, deptdata) {
			// 											if(err3)
			// 											{
			// 												var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(found), "58e7054c20c23efd03373efd0337").toString();
			// 												callback(null, ciphertext);
			// 											}
			// 											if(deptdata)
			// 											{
			// 												var depts="";
			// 												for(var i = 0 ; i <= deptdata.length-1 ; i++)
			// 												{
			// 													if(i==0)
			// 														depts=deptdata[i].dept_name;
			// 													else 
			// 														depts=depts+","+deptdata[i].dept_name;
			// 												}
			// 												found.department=depts;
			// 												var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(found), "58e7054c20c23efd03373efd0337").toString();
			// 												callback(null, ciphertext);
			// 											}
			// 											else {
			// 												var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(found), "58e7054c20c23efd03373efd0337").toString();
			// 												callback(null, ciphertext);
			// 											}
			// 										});
			// 									}
												
			// 									//found['user_type']=found2.user_type;
			// 									//found['user_role']=found2.user_role;
												
			// 								});
			// 							}
			// 							else
			// 							{
			// 								var dept = require("./Deptroles");
			// 								dept.find({
			// 									roles: found['New Role'],
			// 								}).exec(function (err3, deptdata) {
			// 									if(err3)
			// 									{
			// 										callback(null, found);
			// 									}
			// 									if(deptdata)
			// 									{
			// 										var depts="";
			// 										for(var i = 0 ; i <= deptdata.length-1 ; i++)
			// 										{
			// 											if(i==0)
			// 												depts=deptdata[i].dept_name;
			// 											else 
			// 												depts=depts+","+deptdata[i].dept_name;
			// 										}
			// 										found.department=depts;
			// 										var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(found), "58e7054c20c23efd03373efd0337").toString();
			// 										callback(null, ciphertext);
			// 									}
			// 									else {
			// 										var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(found), "58e7054c20c23efd03373efd0337").toString();
			// 										callback(null, ciphertext);
			// 									}
			// 								});
			// 								//callback(null, found);
			// 							}
											
			// 						});		
			// 					});
			// 				}
			// 			});
						
						
			// 		} else {
			// 			callback({
			// 				message: "-1"
			// 			}, null);
			// 		}
			// 	}

			// });
		}
		else {
			callback({},null);
		}
		
		
    },
    
};
module.exports = _.assign(module.exports, exports, model);