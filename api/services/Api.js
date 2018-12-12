var schema = new Schema({
   
});

schema.plugin(deepPopulate, {
    
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);

module.exports = mongoose.model('Api', schema,'');

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "api", "api"));
//new RegExp(searchstring)
//{ $regex: searchstring, $options: 'i' }
var adminurl = "http://exponentiadata.co.in:8097";
var CryptoJS = require("crypto-js");
var param = require('jquery-param');
var model = {
    out: function (data, callback) {
        var http = require('http');
        
        var ciphertext= data.data;
        var a = ciphertext.toString().replace(" ", "+");
        var b=a.replace(" ", "+");
        var bytes = CryptoJS.AES.decrypt((b),env2.FRONTEND_ENC_KEY);
        // console.log(ciphertext);
        // console.log(bytes);
        var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        //console.log(decryptedData);
        //console.log(decryptedData.user_id);
        var dataString = param(decryptedData);
        var post_options = {
            host: 'exponentiadata.co.in',
            //hostname:'exponentiadata.co.in',
            port: 8097,
            path: '/out/'+decryptedData.user_id+"/",
            method: 'POST',
            //data:param(decryptedData),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(param(decryptedData))
                //'Content-Length': param(decryptedData).length
            }
        };
        //console.log(post_options);
        req=http.request(post_options, function(res) { 
            res.setEncoding('utf8');
        //http.request(adminurl+'/out/'+decryptedData.user_id+"/", function(res) { 
            //console.log("Got response: " + res.statusCode);
            //console.log("res",res);
            var response1="";
            res.on("data", function(chunk)
            {
                response1 += chunk;
                //found=JSON.parse(chunk);
                //console.log(found);
                //callback(null, found);
            });
            res.on('end', function () {
                console.log(response1);
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
        req.write(dataString);
        req.end();
    },
};
module.exports = _.assign(module.exports, exports, model);