var schema = new Schema({
    fromdate: {
        type: Date
    },
	todate: {
		type:Date
	},
	reportstatus:{
		type:String
	}
});

schema.plugin(deepPopulate, {
    
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);

module.exports = mongoose.model('Panindiareport', schema,'panindiareport');

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
//new RegExp(searchstring)
//{ $regex: searchstring, $options: 'i' }
var model = {
    reportviolation: function (data, callback) {
        
        Panindiareport.saveData({
			data:data,
			
		},function (err3, savefound) {
			if (err3) {
				callback(err3, null);
			} 
			else {
				if (savefound) {
					
					callback(null, {done:1});
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