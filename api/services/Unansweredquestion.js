var schema = new Schema({
    conversationid: {
        type: Schema.Types.ObjectId,
    },
    user: {
        type: String,
    },
    old_question: {
        type: String,
    },
    new_question: {
        type: String,
    },
    ip_address: {
        type: String,
    },
    conversation_id:{
        type:Number
    },
    session_id:{
        type:Number
    },
    handle: {
        type:Number
    },
    handleview:{
        type:Number
    },
    interaction_index:{
        type:Number
    },
	cache_handle:
	{
		type:Number
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
function extend(target) {
    var sources = [].slice.call(arguments, 1);
    sources.forEach(function (source) {
        for (var prop in source) {
            target[prop] = source[prop];
        }
    });
    return target;
}
module.exports = mongoose.model('Unansweredquestion', schema,'Unansweredquestion');
var CryptoJS = require("crypto-js");
var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {
    getunans: function (data, callback) {
        var updateobj = { like:1 };
        /*
        Unansweredquestion.find(
            { 
                user:data.user,
				handleview:0
                // handle:0
            }
        ).sort({handle: -1}).exec(function (err, updatefound) {
            if (err) {
                callback(err, null);
            } 
            else {
                //console.log(updatefound,"inside update");
                if (updatefound) {
                    callback(null, updatefound);
                }
            }
        });*/
		var ciphertext= data.data;
        //var a = ciphertext.toString().replace(" ", "+");
        //var b=a.replace(" ", "+");
        var bytes = CryptoJS.AES.decrypt((ciphertext),env2.FRONTEND_ENC_KEY);
        // console.log(ciphertext);
        // console.log(bytes);
        var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
		Unansweredquestion.aggregate([ 
			{ "$match": {
					user:decryptedData.user,
					handleview:0
				} 
			},
			
			
			{
				"$group":{"_id":"$old_question",session_id:{$first:"$session_id"},conversationid:{$first:"$conversationid"},old_question:{$first:"$old_question"},new_question:{$first:"$new_question"},handle:{$first:"$handle"},interaction_index:{$first:"$interaction_index"},handleview:{$first:"$handleview"},conversation_id:{$first:"$conversation_id"},"docid":{$first:"$$ROOT._id"}}
			},
			{$sort:{"handle":-1}},
			{"$project": {_id:0,conversationid: 1, old_question: 1,new_question:1,user:1,conversation_id:1,handle:1,session_id:1,handleview:1,interaction_index:1,docid:1}},
			
		],
		function(err, updatefound) {
			if (err) {
                callback(err, null);
            } 
            else {
                //console.log(updatefound,"inside update");
                if (updatefound) {
					//var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(updatefound), env2.FRONTEND_ENC_KEY).toString();
                    //callback(null, {data:ciphertext});
					callback(null, {data:updatefound});
                }
            }
		}); 
    },
    readunanscount: function (data, callback) {
        
        Unansweredquestion.count({
            user:data.user,
            handleview:1
        }, function(err, found)  {
            if (err) {
                callback(err, null);
            } 
            else {
                found2 = found;
                //var Journey_Data = JSON.parse(found.Journey_Data);
                callback(null,{count: found});
                
            }

        });
    },
	unansfeedbackcount:function (data, callback) {
        var ciphertext= data.data;
        //var a = ciphertext.toString().replace(" ", "+");
        //var b=a.replace(" ", "+");
        var bytes = CryptoJS.AES.decrypt((ciphertext),env2.FRONTEND_ENC_KEY);
        // console.log(ciphertext);
        // console.log(bytes);
        var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        Unansweredquestion.count({
            //user:data.user,
			user:decryptedData.user,
            handleview:0
        }, function(err, found)  {
            if (err) {
                callback(err, null);
            } 
            else {
				var Feedbackquestion = require("./Feedbackquestion");
				Feedbackquestion.count({
					user:data.user,
					handleview:0
				}, function(err2, found2)  {
					if (err) {
						callback(err2, null);
					} 
					else {
						callback(null,{ucount: found,fcount:found2});
						
					}

				});
                //var Journey_Data = JSON.parse(found.Journey_Data);
                //callback(null,{count: found});
                
            }

        });
    },
    readunans: function (data, callback) {
        
        Unansweredquestion.update(
            { 
                _id:data.id,
            },
            {
                $set:{
                    handleview:1
                }, 
            }
        ).exec(function (err, found)  {
            if (err) {
                callback(err, null);
            } 
            else {
                found2 = found;
                var uns = require("./Chathistory");
                
                var listobj ={};
                listobj['chatlist.'+data.interaction_index+'.unansview']=1;
                var updateobj ={};
                updateobj = extend({}, listobj, updateobj);
                
                uns.update({_id:data.convid},{ $set:updateobj},{ multi: false },function (unserr,unsresult) {
                    
                    callback(null,found);
                });
            }

        });
    },
	getnewquestion: function (data, callback) {
        str=data.user_input;
		//str=str.toLowerCase();
        Unansweredquestion.findOne({
			old_question:  {"$regex":"^"+data.user_input+"$",$options:"i"},
			handle:1
		}).sort({createdAt: -1}).limit(1).exec(function (err, found) {
            
            if (err) {
                //callback(err, null);
				/*callback(null,{
					query:data.user_input
				});*/
				console.log("not in unansq");
				var Feedbackquestion = require("./Feedbackquestion");
				Feedbackquestion.findOne({
					old_question:  {"$regex":"^"+data.user_input+"$",$options:"i"},
					handle:1
				}).sort({createdAt: -1}).limit(1).exec(function (err2, found2) {
					
					if (err2) {
						//callback(err2, null);
						console.log("not in unansq feed");
						callback(null,{
							query:data.user_input
						});
					} 
					else {
						
						if(found2) {
							if(found2.cache_handle)
							{
								if(found2.cache_handle==1)
									callback(null,{query:found2.new_question});
								else  if(found2.cache_handle==0 && found2.new_question !='')
									callback(null,{query:found2.new_question});
								else	
									callback(null,{query:found2.old_question});
							}
							else if(found2.new_question !='')
								callback(null,{query:found2.new_question});
							else
								callback(null,{query:found2.old_question});
							console.log("in unansq feed f ");
						}
						else {
							console.log("not in unansq feed f ");
							callback(null,{
								query:data.user_input
							});
						}
					}
				});
            } 
            else {
                
                if(found) {
					console.log(" infeed f ",found);
					if(found.cache_handle)
					{
						console.log(" infeed f ");
						if(found.cache_handle==1)
							callback(null,{query:found.new_question});
						else  if(found.cache_handle==0 && found.new_question !='')
							callback(null,{query:found.new_question});
						else	
							callback(null,{query:found.old_question});
					}
					else if(found.new_question !='')
						callback(null,{query:found.new_question});
					else
						callback(null,{query:found.old_question});
				}
                else {
					console.log("11");
					var Feedbackquestion = require("./Feedbackquestion");
					Feedbackquestion.findOne({
						old_question:  {"$regex":"^"+data.user_input+"$",$options:"i"},
						handle:1
					}).sort({createdAt: -1}).limit(1).exec(function (err2, found2) {
						
						if (err2) {
							//callback(err2, null);
							callback(null,{
								query:data.user_input
							});
						} 
						else {
							
							if(found2) {
								//console.log("12",found2);
								if(found2.cache_handle)
								{
									if(found2.cache_handle==1)
										callback(null,{query:found2.new_question});
									else  if(found2.cache_handle==0 && found2.new_question !='')
										callback(null,{query:found2.new_question});
									else	
										callback(null,{query:found2.old_question});
								}
								else if(found2.new_question !='')
									callback(null,{query:found2.new_question});
								else
									callback(null,{query:found2.old_question});
							}
							else {
								console.log("12");
								callback(null,{
									query:data.user_input
								});
							}
						}
					});
				}
                    
                    
                
            }

        });
    }
};
module.exports = _.assign(module.exports, exports, model);