var schema = new Schema({
    From_Date: {
        type: Date,
    },
    To_Date: {
        type: Date,
    },
    Status: {
        type:Number
    },
    Ticker_name: {
        type:String
    },
    Created_time:{
        type:Date
    },
    DocFile:{
        type:Array
    },
    TickerType:{
        type:String
    },
    Title:{
        type:String
    },
    LinkURL:{
        type:String
    },
    users:{
        type:Array
    }
});

schema.plugin(deepPopulate, {
    
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);

module.exports = mongoose.model('Postit', schema,'Postit');

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "Postit", "Postit"));
//new RegExp(searchstring)
//{ $regex: searchstring, $options: 'i' }
var CryptoJS = require("crypto-js");
var model = {
    readpostitcount: function (data, callback) {
		var ciphertext= data.data;
        //var a = ciphertext.toString().replace(" ", "+");
        //var b=a.replace(" ", "+");
        var bytes = CryptoJS.AES.decrypt((ciphertext),env2.FRONTEND_ENC_KEY);
        // console.log(ciphertext);
        // console.log(bytes);
        var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        Postit.count({
            $and:[{From_Date:{$lte:new Date()}},{To_Date:{$gte:new Date()}}],
            Status:0,
            // 'users':{$elemMatch:{email:data.user}}
            //'users.email':data.user
			'users.email':decryptedData.user
        }, function(err, found)  {
            if (err) {
                callback(err, null);
            } 
            else {
                //console.log(found);
               
                found2 = found;
                //var Journey_Data = JSON.parse(found.Journey_Data);
                callback(null,{count: found});
                
            }

        });
        
    },
    getpostit: function (data, callback) {
		var ciphertext= data.data;
        //var a = ciphertext.toString().replace(" ", "+");
        //var b=a.replace(" ", "+");
        var bytes = CryptoJS.AES.decrypt((ciphertext),env2.FRONTEND_ENC_KEY);
        // console.log(ciphertext);
        // console.log(bytes);
        var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        Postit.find({
            //$and:[{From_Date:{$lte:new Date(data.today)}},{To_Date:{$gte:new Date(data.today)}}],
			$and:[{From_Date:{$lte:new Date(decryptedData.today)}},{To_Date:{$gte:new Date(decryptedData.today)}}],
            Status:0
        },{
			Modified_By:0,Upload_By:0,users:0
		}).exec(function (err, found) {
            if (err) {
                callback(err, null);
            } 
            else {
                if (found) {
                    if (err) {
                            return err;
                    }
                    else {
                        //found2 = found;
                        Postit.count({
                            $and:[{From_Date:{$lte:new Date()}},{To_Date:{$gte:new Date()}}],
                            Status:"0",
							'users.email':decryptedData.user
                            // 'users':{$elemMatch:{email:data.user}}
                            //'users.email':decryptedData.user
                        }, function(err, found2)  {
                            if (err) {
                                callback(err, null);
                            } 
                            else {
                                
                                //found2 = found;
                                var response={data:found,count:found2} 
                                //var Journey_Data = JSON.parse(found.Journey_Data);
                                //callback(null,{count: found});
                                callback(null, response);    
                            }
                
                        });
                        
                    }
                    
                } else {
                    callback({
                        message: "-1"
                    }, null);
                }
            }

        });
        
    },
    readpostit: function (data, callback) {
		var ciphertext= data.data;
        //var a = ciphertext.toString().replace(" ", "+");
        //var b=a.replace(" ", "+");
        var bytes = CryptoJS.AES.decrypt((ciphertext),env2.FRONTEND_ENC_KEY);
        // console.log(ciphertext);
        // console.log(bytes);
        var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        Postit.update(
            { 
                _id:decryptedData.id,
            },
            {
                // $set:{
                //     livechat:livechat,
                //     unanswered:unanswered,
                //     unshandled:unshandled
                // }, 
                $push: { 
                    users:
                    {
                        email:decryptedData.user,
                        readdate:new Date(),
                    }
                } 
            }
        ).exec(function (err, found) {
            if (err) {
                callback(err, null);
            } 
            else {
                if (found) {
                    if (err) {
                            return err;
                    }
                    else {
                        found2 = found;
                        //var Journey_Data = JSON.parse(found.Journey_Data);
                        callback(null, found);
                    }
                    
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