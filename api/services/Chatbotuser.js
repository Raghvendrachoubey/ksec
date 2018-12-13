var schema = new Schema({
    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        validate: validators.isEmail(),
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    forgotPassword: {
        type: String,
        default: ""
    },
    mobile: {
        type: String,
        default: ""
    },
    accessToken: {
        type: [String],
        index: true
    },
    accessLevel: {
        type: String,
    },
    branch: {
        type: String,
        required: true,
    },
    expirydate: {
        type: Date,
    },
    resetpasswordtoken: {
        type: String,
    }
});


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
    }
});

schema.plugin(deepPopulate, {
    /*populate: {
        'user': {
            select: 'fname _id'
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
module.exports = mongoose.model('chatbotuser', schema,'chatbotuser');
//var chatbot_user_logs = mongoose.model('chatbot_user_logs', userlogschema,"chatbot_user_logs");
var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {
    loginuser: function (reqobj,data, callback) {
       // console.log("data", data)
        var ip = require('ip');
        var jwt = require("jsonwebtoken");
        var found = {};
        found = data;
        found = found.toObject();
        
        found.curtime=Date.now();
        found.curtime=found.curtime;
        var token = jwt.sign(found, "ExPo", {
            expiresIn: '8h'
        });
        found.token=token;
        var ip_address = ip.address("public","ipv4");
        var userLogs = require("./Chatbotuserlogs");
        var sessiondata = userLogs({userid:data.email,user:username,login_date:(new Date()),token:token,ip_address:ip_address,logout_date:new Date()});
        sessiondata.save(function (err,result) {
            if (err) {
                callback(err, null);
            }
            else {
                reqobj.session.userId=data.email;
                callback(null, found);
            }
        });
        // Chatbotuser.findOne({
        //     email: data.username,
        //     password: data.password,
        // }, { fname: 1, lname: 1,email:1,accessrole:1,branch:1 }).limit(1).exec(function (err, found) {
        //     if (err) {
        //         callback(err, null);
        //     } 
        //     else {
        //         if (found) {
        //             var ip = require('ip');
        //             var ip_address = ip.address("public","ipv4");
        //             var userLogs = require("./Chatbotuserlogs");
        //             var sessiondata = userLogs({user:found._id,login_date:(new Date()),ip_address:ip_address,logout_date:new Date()});
        //             sessiondata.save(function (err,result) {
        //                 if (err) {
        //                         return err;
        //                 }
        //                 else {
        //                     // found2 = {};
                            
        //                     // found2 = found;
        //                     // found2.sessionid = result._id;
        //                     found = found.toObject();
        //                     var r = result.toObject();
        //                     found.sessionid = r._id;
                      

        //                     PythonShell.run(pythonpath+'my_script.py', { mode: 'json ',args:[data]}, function (err, results) { 
        //                         //found.set('sessionid', result._id)
                                
                                
        //                         callback(null, found);
        //                     });
        //                     //callback(null, found);
        //                 }
        //             });
                    
                    
        //         } else {
        //             callback({
        //                 message: "-1"
        //             }, null);
        //         }
        //     }

        // });
    },
    changepassword: function (data, callback) {
        Chatbotuser.findOneAndUpdate({
            _id: data.userid,
            password: data.oldpassword,
        },{ $set: { password: data.newpassword }}).exec(function (err, found) {
            if (err) {
                callback(err, null);
            } 
            else {
                if (found) {
                    callback(null, found);
                } else {
                    callback({
                        message: "-1"
                    }, null);
                }
            }

        });
    },
    searchapi:function (data, callback){
        // exec('python kotaksearch.py "'+data.search+'"', function(err, found) {
        //     console.log(err)
        //     console.log(found.toString());
        //     callback(null, JSON.parse(found));
        // });
        var post_options = {
            host: 'www.kotak.com',
            //hostname:'www.kotak.com',
            // port: 8097,
            path: '/content/kotakcl/en/search/_jcr_content/mid_par/search.filterclick.all.0.10.esc.json/'+data.search+"/",
            method: 'POST',
            //data:param(decryptedData),
            // headers: {
            //     'Content-Type': 'application/x-www-form-urlencoded',
            //     'Content-Length': Buffer.byteLength(param(decryptedData))
            //     //'Content-Length': param(decryptedData).length
            // }
        };
        var https = require('https');
        //console.log(post_options);
        req=https.get("https://www.kotak.com/content/kotakcl/en/search/_jcr_content/mid_par/search.filterclick.all.0.10.esc.json/"+data.search+"/", function(res) { 
            res.setEncoding('utf8');
        //http.request(adminurl+'/out/'+decryptedData.user_id+"/", function(res) { 
            //console.log("Got response: " + res.statusCode);
            //console.log("res",res);
            var response1="";
            res.on("data", function(chunk)
            {
                console.log(chunk);
                response1 += chunk;
                //found=JSON.parse(chunk);
                //console.log(found);
                //callback(null, found);
            });
            res.on('end', function () {
                response1=JSON.parse(response1);
                //response1=param(response1);
                // response1 = JSON.stringify((response1));
                // var ciphertext = CryptoJS.AES.encrypt((response1),env2.FRONTEND_ENC_KEY).toString();
                callback(null, response1);
                console.log('No more data in response.');
            }); 
        }).on('error', function(e){ 
            console.log("Got error: " + e.message); 
            callback({
                message: "-1"
            }, null);
        });
        // req.write(data.search);
        // req.end();
        // var spawn = require("child_process").spawn;
        // var process = spawn('python',["./script/kotaksearch.py", data.search]);
        // var textChunk;
        // process.stdout.on('data',function(chunk){

        //     textChunk = chunk.toString('utf8');// buffer to string
		// 	//console.log("data", textChunk);
        //     //json_data = JSON.parse(chunk);
        //     //console.log("tts",json_data);
        //     //console.log("chunk",chunk);
        //     //util.log(chunk);
        //     //console.log("data", chunk);
        //     // dataa={d:json_data};
        //     // console.log("data", dataa);
        //     //callback(null,textChunk );
            
        // });

        // process.on('close', function (code) {
        //     console.log("close",code);
        // });
		
        // process.stderr.on('data', function (data) {
        //     console.log('stderr: ' + data);
        // });
        // process.stdout.on('error', function( err ) {
        //     if (err.code == "EPIPE") {
        //         console.log("error",err);
                
        //     }
		// 	callback(err,null);
        // });
        // process.stdout.on('end', function(){
        // 	//var str = dataString.substring(1,dataString.length);
        //     console.log("end",textChunk.text);
        //     //callback(null,JSON.parse(textChunk) );
        // });
        // process.stdin.write();

        // process.stdin.end();
    },
    forgotpassword: function (data, callback) {
        var today = new Date();
        var tomorrow = new Date();
        tomorrow.setDate(today.getDate()+1);
        var d = new Date(tomorrow),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

        if (month.length < 2) month = '0' + month;
        if (day.length < 2) day = '0' + day;

        expiry= [year, month, day].join('-');
        expiry=new Date(expiry+"T23:59:59");
        Chatbotuser.findOneAndUpdate({
            email: data.email,
        },{ $set: { resetpasswordtoken: data.resettoken,expirydate:expiry }}).exec(function (err, found) {
            if (err) {
                callback(err, null);
            } 
            else {
                if (found) {
                    callback(null, found.email);
                } else {
                    callback({
                        message: "-1"
                    }, null);
                }
            }

        });
    },
    isvalidpasswordresetreq: function (data, callback) {
        
        Chatbotuser.findOne({
            resetpasswordtoken: data.resettoken,
            
        },{ expirydate: 1, _id:0 }).limit(1).exec(function (err, found) {
            if (err) {
                callback(err, null);
            } 
            else {
                if (found) {
                    callback(null, found);
                } else {
                    callback({
                        message: "-1"
                    }, null);
                }
            }

        });
    },
    resetpassword:function (data, callback) {
        
        Chatbotuser.findOneAndUpdate({
            resetpasswordtoken: data.resettoken,
            
        },{$set : {resetpasswordtoken: "",password:data.password}}).exec(function (err, found) {
            if (err) {
                callback(err, null);
            } 
            else {
                if (found) {
                    callback(null, found.email);
                } else {
                    callback({
                        message: "-1"
                    }, null);
                }
            }

        });
    },
    
};
module.exports = _.assign(module.exports, exports, model);