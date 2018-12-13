var schema = new Schema({
    data: {
        type: Object,
    }
});

schema.plugin(deepPopulate, {
    
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);

module.exports = mongoose.model('Report', schema,'reportviolation');

var exports = _.cloneDeep(require("sails-wohlig-service")(schema));
//new RegExp(searchstring)
//{ $regex: searchstring, $options: 'i' }
var model = {
    reportviolation: function (data, callback) {
        
        Report.saveData({
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