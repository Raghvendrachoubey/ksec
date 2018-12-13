var schema = new Schema({
    user: {
        type: String,
    },
    session_id: {
       type:Number,
    },
    conversation_id:{
        type:Number
    },
	empname:{
		type:String
	},
	empid:{
		type:String
	},
	key:{
		type:String
	},
	additional_conflict:{
		type:Object
	},
	user_input:{
		type:String
	},	
});

schema.plugin(deepPopulate, {
    
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);

module.exports = mongoose.model('Faqclicks', schema,'faqclicks');

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "faqclicks", "faqclicks"));
//new RegExp(searchstring)
//{ $regex: searchstring, $options: 'i' }
var model = {
    
};
module.exports = _.assign(module.exports, exports, model);