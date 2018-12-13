var schema = new Schema({
    Journey_Name: {
        type: String,
    },
    Journey_Data: {
        type: String,
    },
});

schema.plugin(deepPopulate, {
    
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);

module.exports = mongoose.model('Diagram', schema,'process_tree');

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "diagram", "diagram"));
//new RegExp(searchstring)
//{ $regex: searchstring, $options: 'i' }
var model = {
    getdiagram: function (data, callback) {
        Diagram.findOne({
            Journey_Name: data.Journey_Name,
        }, { Journey_Name: 1,Journey_Data:1 }).limit(1).exec(function (err, found) {
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
                        var Journey_Data = JSON.parse(found.Journey_Data);
                        callback(null, Journey_Data);
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