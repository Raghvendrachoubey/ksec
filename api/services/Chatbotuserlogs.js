var schema = new Schema({
    id: {
        type: Number,
    },
	userid:{
		type:String
	},
    user: {
        type: Object,
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
	token:{
		type:String
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
module.exports = mongoose.model('Chatbotuserlogs', schema,'chatbot_user_logs');

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {
    logoutuser:function (reqobj,data, callback) {
        
        Chatbotuserlogs.findOneAndUpdate({
            userid: reqobj.session.userId,
            //user:data.user
        },{$set : {logout_date: (new Date())}}).exec(function (err, found) {
            if (err) {
                console.log("err",err);
                callback(err, null);
            } 
            else {
                if (found) {
                    reqobj.session.userId = "";
                    reqobj.session.destroy();
                    callback(null, found.logout_date);
                } else {
                    callback({
                        message: "-1"
                    }, null);
                }
            }

        });
    },
	loginstatus:function (data, callback) {
        
        Chatbotuserlogs.findOne({
            user: mongoose.Types.ObjectId(data.user),
            //user:data.user
        }).sort({createdAt: -1}).exec(function (err, found) {
            if (err) {
                //console.log("err",err);
                callback(err, null);
            } 
            else {
                if (found) {
					var jwt = require("jsonwebtoken");
					var decoded = jwt.decode(found.token);
					var decoded2 = jwt.decode(data.token);
					var res={valid:0};
					//console.log(decoded,"1st");
					//console.log(decoded2,"2nd");
					if(found.token && data.token)
					{
						if(decoded.curtime && decoded2.curtime)
						{
							//console.log(decoded.curtime,"dc");
							//console.log(decoded2.curtime,"dc");
							if(decoded.curtime==decoded2.curtime)
								res={valid:1};
							callback(null, res);
						}
						else
						{
							res={valid:1};
							callback(null, res);
						}
					}
					else
					{
						res={valid:1};
						callback(null, res);
					}
                } else {
                    callback(null,{valid:1});
                }
            }

        });
    },
};
module.exports = _.assign(module.exports, exports, model);