var schema = new Schema({
    user_id: {
        type: String,
    },
    user_name: {
        type: String,
    },
    user_function: {
        type: String,
	},
    user_role: {
        type: String,
    },
    login_date: {
        type: Date,
        
    },
    logindate: {
        type: String,
    },
    ip_address: {
        type: String,
    },
    firstlogin: {
        type: String,
    },
    employee_dmp_role: {
        type: String,
    },
    current_access: {
        type: String,
    },
    reason: {
        type: String,
    },
	logout_date: {
        type: Date,
    },
	logoutdate: {
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

//var pythonpath = "http://localhost:8096/script/";
module.exports = mongoose.model('Usersessiontrail', schema,'user_session_trail');
//var chatbot_user_logs = mongoose.model('chatbot_user_logs', userlogschema,"chatbot_user_logs");
var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {
    logoutuser: function (data, callback) {
		var jwt = require("jsonwebtoken");
		var decoded = jwt.decode(data.data);
        Usersessiontrail.findOneAndUpdate({
            user_id: decoded['Employee ID'],
            //user:data.user
        },{$set : {logout_date: (new Date()),logoutdate:moment(new Date()).format('DD-MMM-YYYY HH:mmA')}},{ sort : { "_id" : -1 } }).exec(function (err, found) {
            if (err) {
                callback(err, null);
				
            } 
            else {
                if (found) {
					//console.log(found,"logoutsess");
                    callback(null, found);
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