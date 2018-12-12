var schema = new Schema({
    time: {
        type: String,
    },
    userId: {
        type: String,
    },
    emailId: {
        type:Number
    },
    

});

schema.plugin(deepPopulate, {
    
});
schema.plugin(uniqueValidator);
schema.plugin(timestamps);

module.exports = mongoose.model('Idletime', schema,'Idletime');

var exports = _.cloneDeep(require("sails-wohlig-service")(schema, "Idletime", "Idletime"));
//new RegExp(searchstring)
//{ $regex: searchstring, $options: 'i' }
var model = {
    gettimer: function (data, callback) {
		
        Idletime.findOne({
            
        },{
			userId:0
		}).exec(function (err, found) {
            if (err) {
                callback(err, null);
            } 
            else {
                if (found) {
                    if (err) {
                            return err;
                    }
                    else {
                     
                        callback(null, found);
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