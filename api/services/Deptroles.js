var schema = new Schema({
    "dept_name": {
        type: String,
    },
	"roles":{
		type:Array
	}
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

module.exports = mongoose.model('Deptroles', schema,'deptroles');
//var chatbot_user_logs = mongoose.model('chatbot_user_logs', userlogschema,"chatbot_user_logs");
var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {
    
};
module.exports = _.assign(module.exports, exports, model);