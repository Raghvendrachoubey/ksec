var schema = new Schema ({
	domain_id: {
		type:String,
		ref:"Usersmaster_ad"
	},
	user_type:{
		type:String
	},
	user_role:{
		type:String
	},
	live_chat:{
		type:String
	}
});
module.exports = mongoose.model('Users', schema,'users');
var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
var model = {
	
};
module.exports = _.assign(module.exports, exports, model);