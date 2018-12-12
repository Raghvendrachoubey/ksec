var schema = new Schema({
    Journey_Name: {
        type: String,
    },
    Text: {
        type: String,
    },
    Title: {
        type: String,
    },
});

schema.plugin(deepPopulate, {
    
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);

module.exports = mongoose.model('Guidelines', schema,'guidelines');

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "guidelines", "guidelines"));
//new RegExp(searchstring)
//{ $regex: searchstring, $options: 'i' }
var model = {
    getdetail: function (data, callback) {
        
        Guidelines.find(
			{
				Journey_Name:data.Journey_Name
			}
		, { Journey_Name: 1, Text: 1, _id:1,Title:1 }).exec(function (err, found) {
            if (err) {
                callback(err, null);
            } 
            else {
                if (found) {
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